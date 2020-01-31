import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { IconButton } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Badge from "@material-ui/core/Badge";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import Header from '../components/recursableComponents/Header'

import { BASE_URL } from "../consts";
import imagesFromProducts from "../imageUrl"

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  whiteButton: {
    color: "white",
    sizeSmall: "100px"
  }
  
});

const axios = require("axios");
class Produto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      photoProduct: ""
    };
  }
  

  componentDidMount() {
    this.getProduct();
  }

  async getProduct() {
    try {
      const resp = await axios.get(`${BASE_URL}/products/selectedProduct`, {
        params: this.getAllParamsFromUrl()
      });
      const product = resp.data[0]
      const previewImage = imagesFromProducts(600, 600, product.produto, product.cor_produto)
      await this.setState({ photoProduct: previewImage })
      await this.setState({ product: product })
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  getAllParamsFromUrl() {
    const produto = this.getParamFromUrl("produto");
    return produto;
  }

  getParamFromUrl(param) {
    const urlSearch = new URLSearchParams(this.props.location.search);
    return urlSearch.get(param);
  }


  render(props) {
    const { classes } = this.props;
    const { photoProduct } = this.state
    const { 
      preco_varejo_original,
      preco_custo,
      desc_produto,
      produto,
      cor_produto,
      data_prog,
      qtde_programada,
      qtde_entregue,
      entrega_ajustada
    } = this.state.product

    return (
      <Fragment>
        <Header
          title="Programação"
          rightIcon={null}
          leftIcon={
            <IconButton               aria-label="upload picture"
            component="span"
            className={classes.whiteButton}
            onClick={() => this.props.history.goBack()}>
              <ArrowBack></ArrowBack>
            </IconButton>
          }
        />
        <Badge
          badgeContent={""}
          className={classes.badge}
        >
          <CardMedia
            className={classes.mediaCard}
            image={photoProduct}
            title="Produto"
          />
        </Badge>
        <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
          <Card className={classes.card}>
          <Typography gutterBottom variant="h2" component="h3">
                {"Programação"}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              >
              </Typography>
          <Typography gutterBottom variant="h6" component="h2">
                {desc_produto}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              >
              </Typography>
              <Typography gutterBottom variant="h6" component="h2">
                {produto}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              >
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="h3"
              >
                {cor_produto}
              </Typography>
              {/* <Typography variant="body2" color="textSecondary" component="p">{produtos.desc_cor_produto}</Typography> */}
              <Typography gutterBottom variant="h5" component="h2">
                {"Programação"}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {qtde_programada}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="h3"
              >
                {preco_varejo_original}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="h3"
              >
                {preco_custo}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="h3"
              >
                {data_prog}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="h3"
              >
                {qtde_entregue}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="h3"
              >
                {entrega_ajustada}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Fragment>
    )
  }
}

Produto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Produto);
