import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import Header from "../components/recursableComponents/Header";
import Grid from "@material-ui/core/Grid";
import { IconButton } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";

import axios from "axios";
import { BASE_URL } from "../consts";

import User from "../services/User";

import CardProduct from "../components/recursableComponents/CardProduct";
import GridSize from "../components/recursableComponents/GridSize"

import debounce from "lodash.debounce";


import Filters from "../components/recursableComponents/Drawers"
import OrderItems from "../components/recursableComponents/OrderItems"

const styles = theme => ({
  whiteButton: {
    color: "white",
    sizeSmall: "100px"
  },
  select: {
    width: 160,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  title: {
    paddingTop: "25px",
    paddingBottom: "18px",
  },
    leftBarLabel: { 
    backgroundColor: "#FCB92C",
    width:5,
    // height:'100%',
    marginRight:theme.spacing(4),
    position: 'absolute',
    height: '62px',
    left: '0px'
  },
  labelWrapper: { 
    marginLeft: theme.spacing(-8),
    marginBottom: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(1.5),
    color:'white'
  },
});


function Colecao(props) {
  const { classes } = props;
  const [products, setProducts] = useState([])
  const [filterOpt, setFilterOpt] = useState([])
  const [fields, setFields] = useState([])
  const [productsFitered, setProductsFiltered] = useState([])
  const [checkFilter, setCheckFilter] = useState(false)
  const [ gridSize, setGridSize ] = useState(0)
  const [ nextPage, setNextPage ] = useState(false)
  
  useEffect(() => {
      const user = new User();
      const id_marca_estilo = user.user.id_marca_estilo;
      const collection = props.match.params.collection;

      try {
        axios.get(`${BASE_URL}/collections/getSingleCollectionProducts`, {
            params: {
              id_marca_estilo,
              collection,
              // next_page
            }
          })
          .then(resp => {
            if(resp.data.data.length > 1) {
              const filterOpt = getFilterData(resp.data.data)
              setNextPage(resp.data.next_page)
              setProducts(resp.data.data)
              setFilterOpt(filterOpt)  
            }
          });
      } catch (err) {
        console.log('Error getting data from'`${BASE_URL}/collections/getSingleCollectionProducts`, err)
        return props.enqueueSnackbar(
          "Não Encontramos produtos para esse Colecao.",
          { variant: "error" }
        );
      }
  }, []) //eslint-disable-line

  useEffect(() => {
    handleFilterProduct() //eslint-disable-line
  }, [filterOpt]) //eslint-disable-line

  useEffect(() => {
    if(props.produtos.length > 0) { //eslint-disable-line
      setProductsFiltered(props.produtos)
      setCheckFilter(true)
    } else {
      setCheckFilter(false)
    }
  }, [props.produtos]) //eslint-disable-line
  
  useEffect(() => {
    if(props.orderedItems.length > 0) {
      setProductsFiltered(props.orderedItems)
      setCheckFilter(true)
    } else {
      setCheckFilter(false)
    }
  }, [props.orderedItems])

  useEffect(() => {
    setGridSize(props.gridSize)
  }, [props.gridSize])
  
  const getFilterData = (data) => {
    const filterOptions = {
      categoria: [],
      subcategoria: [],
      estampa: [],
      fornecedor: [],
      estilista: [],
      colecao: [],
    }
    if(data) {
      data.map(values => { //eslint-disable-line
        values.data.categoria && (filterOptions.categoria.push(values.data.categoria))
        values.data.subcategoria && (filterOptions.subcategoria.push(values.data.subcategoria))
        values.data.estampa && (filterOptions.estampa.push(values.data.estampa))
        values.data.fornecedor && (filterOptions.fornecedor.push(values.data.fornecedor))
        values.data.estilista && (filterOptions.estilista.push(values.data.estilista))
        values.data.colecao && (filterOptions.colecao.push(values.data.colecao))
      }) //eslint-disable-line
    // REMOVE EMPTY VALUES
    for(let value in filterOptions) {
      if(filterOptions[value].length === 0) {
        delete filterOptions[value]
      }
    }
    // GET ALL THE FIELDS NAMES TO BE PASSED TO THE CHILD
    Object.keys(filterOptions).map(filterItem => {
      return setFields([...fields, filterItem])
    })
      return filterOptions
    } else {
      console.log("You dont have products", data)
    }
  }

  const loadProducts = () => {
      try {
        setLoading(true)
        axios.get(`${BASE_URL}/collections/getNextCollectionPage`, {
          params: {
            nextPage
          }
        })
        .then(resp => {
          setLoading(false)
          setNextPage(resp.data.next_page)
          setProducts([...products, ...resp.data.data])
        })
      }  
      catch (error) {
        setLoading(false)
        console.log("error getting next page", error)
        return error
      }
  }
  

  window.onscroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
      loadProducts()
    }
  }, 100);

  const handleClickProduct = (id) => {
    id ? props.history.push(`/produto?produto=${id}`) : props.enqueueSnackbar(
      "Não Encontramos esse produto, tente recarregar a pagina",
      { variant: "error" }
    );
  };

  const handleFilterProduct = () => {
    const { dispatch } = props
    dispatch({
      type: 'UPDATE_FILTER',
      filterOpt,
    })
  }

  const filteredList = (
    productsFitered ? productsFitered.map((produto, index) => {
      return (
        <CardProduct
          gridSize={gridSize}
          showBadges={false} 
          key={`${produto.id}${index}`} 
          productToRender={produto.data} 
          handleClickProduct={() => handleClickProduct(produto.id)}
        />
      )
    }) : null
  )

  const noFilteredList = (
    products.map((produtos, index) => {
      return (
       <CardProduct
          gridSize={gridSize}
          showBadges={false} 
          key={`${produtos.id}${index}`} 
          productToRender={produtos.data} 
          handleClickProduct={() => handleClickProduct(produtos.id)}
        />)
    })
  )

  return (
    <Fragment>
      <Header
        title="Coleção"
        leftIcon={
          <IconButton
            aria-label="upload picture"
            component="span"
            className={classes.whiteButton}
            onClick={() => props.history.goBack()}
          >
            <ArrowBack></ArrowBack>
          </IconButton>
        }
      />
      <Grid
         id="some"
         item
         container
         direction="row"
         justify="space-between"
         alignItems="flex-start"
         sm={12}
         xs={12}
        // onClick={() => handleFilterProduct(products)}
      >
        <Grid
            item
            xs={1}
            sm={2} //eslint-disable-line
            alignItems="center"
            justify="flex-start" //eslint-disable-line
          >
            <Filters
              products={products}
            />
          </Grid>
          <GridSize />
          <Grid
            item
            xs={1}
            sm={2} //eslint-disable-line
            alignItems="center"
            justify="flex-end" //eslint-disable-line
          >
            <OrderItems 
              products={products}
              // campos que eu quero que existam no filtro
              orderFields={[ "estilista", "fornecedor", "marca" ]}
            />
          </Grid>
      </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={0}
        >
        { checkFilter ? 
          filteredList
         : noFilteredList }
      </Grid>
    </Fragment>
  )
}

const wrapperComponent = withStyles(styles)(
  withSnackbar(withRouter(Colecao))
);

function mapStateToProps(state) {
  return {
    filters: state.filter,
    produtos: state.products,
    orderedItems: state.orderedItems,
    gridSize: state.gridItemsSize
  }
}

export default connect(mapStateToProps)(wrapperComponent);
