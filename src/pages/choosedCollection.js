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

import Filters from "../components/recursableComponents/Drawers"
import FilterList from "@material-ui/icons/FilterList";
import Typography from "@material-ui/core/Typography";




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
  const [open, setOpenFilter] = useState(false)

  const { collection } = props.match.params

  useEffect(() => {
      const user = new User();
      const id_marca_estilo = user.user.id_marca_estilo;

      try {
        axios.get(`${BASE_URL}/collections/getSingleCollectionProducts`, {
            params: {
              id_marca_estilo,
              collection
            }
          })
          .then(data => {
            if(data.data.length > 1) {
              const filterOpt = getFilterData(data.data)
              setProducts(data.data)
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
  }, [])

  useEffect(() => {
    handleFilterProduct()
  }, [filterOpt])

  useEffect(() => {
    if(props.produtos.length > 0) {
      setProductsFiltered(props.produtos)
      setCheckFilter(true)
    } else {
      setCheckFilter(false)
    }
  }, [props.produtos])


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
      data.map(values => {
        filterOptions.categoria.push(values.data.categoria)
        filterOptions.subcategoria.push(values.data.subcategoria)
        filterOptions.estampa.push(values.data.estampa)
        filterOptions.fornecedor.push(values.data.fornecedor)
        filterOptions.estilista.push(values.data.estilista)
        filterOptions.colecao.push(values.data.colecao)
      })

    //GET ALL THE FIELDS NAMES TO BE PASSED TO THE CHILD
    Object.keys(filterOptions).map(filterItem => {
      setFields([...fields, filterItem])
    })

      return filterOptions

    } else {
      console.log("You dont have products", data)
    }
  }

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

  const openFilter = () => {
    setOpenFilter(!open);
  };


  const filteredList = (
    productsFitered ? productsFitered.map(produto => {
      return produto.map((product) => {
        return product.map((produto, index) => {
          return (
            <CardProduct
              showBadges={true} 
              key={`${produto.id}${index}`} 
              productToRender={produto.data} 
              handleClickProduct={() => handleClickProduct(produto.id)}
            />
          )
        })
      })
    }) : null
  )

  const noFilteredList = (
    <h1>for now...</h1>
  //   products.map((produtos, index) => {
  //     return (
  //      <CardProduct
  //        showBadges={true} 
  //        key={`${produtos.id}${index}`} 
  //        productToRender={produtos.data} 
  //        handleClickProduct={() => handleClickProduct(produtos.id)}
  //        />)
  //  })
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
            container
            xs={1}
            item
            sm={2}
            alignItems="center"
            justify="flex-start"
          >
            </Grid>

        <Filters
          // fields={fields}
          products={products}
        />
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
  }
}

export default connect(mapStateToProps)(wrapperComponent);
