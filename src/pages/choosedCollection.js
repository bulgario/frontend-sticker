import React, { useState, useEffect, Fragment } from 'react';
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



  useEffect(() => {
      const user = new User();
      const id_marca_estilo = user.user.id_marca_estilo;
      const colecao = props.match.params.collection
      try {
        axios.get(`${BASE_URL}/collections/getSingleCollectionProducts`, {
            params: {
              id_marca_estilo,
              colecao
            }
          })
          .then(data => {
            if(data.data.length > 1) {
              setProducts(data.data)
            }
          });
      } catch (err) {
        console.log('Error getting data from'`${BASE_URL}/collections/getSingleCollectionProducts`, err)
        return props.enqueueSnackbar(
          "Não Encontramos produtos para esse Colecao.",
          { variant: "error" }
        );
      }
    
  }, [props])
  


  const handleClickProduct = (id) => {
    id ? props.history.push(`/produto?produto=${id}`) : props.enqueueSnackbar(
      "Não Encontramos esse produto, tente recarregar a pagina",
      { variant: "error" }
    );
  };


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
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={0}
      >
        { products.map((produtos, index) => {
           return (
            <CardProduct
              showBadges={true} 
              key={`${produtos.id}${index}`} 
              productToRender={produtos.data} 
              handleClickProduct={() => handleClickProduct(produtos.id)}
              
              />)
        }) }
      </Grid>
    </Fragment>
  )
}

const wrapperComponent = withStyles(styles)(
  withSnackbar(withRouter(Colecao))
);
export default wrapperComponent;
