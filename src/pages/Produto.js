import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { IconButton, Container } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import Header from "../components/recursableComponents/Header";

import '@brainhubeu/react-carousel/lib/style.css';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import { BASE_URL } from "../consts";
import UTILS from "../imageUrl";

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(2),
    // backgroundColor:'green',
    [theme.breakpoints.down("xs")]: {
      paddingRight: theme.spacing(0),
      paddingLeft: theme.spacing(2)
    },
  },
  labelWrapper: {
    marginLeft: theme.spacing(-8),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(-4),
      marginBottom: theme.spacing(1),
    },
  },
  container: {},
  whiteButton: {
    color: "white",
    sizeSmall: "100px"
  },
  minWidth: {
    fontSize: '1em',
    marginBottom: theme.spacing(0.6),
    [theme.breakpoints.down("xs")]: {
      fontSize: '0.8em',

    },
  },
  containerSmall: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(0),
    [theme.breakpoints.down("xs")]: {
      paddingRight: theme.spacing(0),
      paddingLeft: theme.spacing(0)
    },
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing(0),
      paddingLeft: theme.spacing(0)
    }
  },
  refLabel: {
    marginLeft: theme.spacing(1.5),
    [theme.breakpoints.down("xs")]: {
      fontSize: '0.8em',

    },
  },
  mediaCard: {
    width: 400,
    height: 300,
    [theme.breakpoints.down("xs")]: {
      width: 250,
      height: 200
    },
    [theme.breakpoints.down("sm")]: {
      width: 300,
      height: 250
    }
  },
  marginLeft: {
    marginLeft: theme.spacing(15),
    marginBottom: theme.spacing(0.5),

    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(7)
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(7)
    }
  },
  lastRow: {
    marginBottom: theme.spacing(2)
  },
  leftBarLabel: {
    backgroundColor: "#FCB92C",
    width: 5,
    height: 40,
    marginRight: theme.spacing(4)
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(-2.3),
    },
  },
  border: {
      border: ' 15px solid #FFFFFF'
  }
});

const axios = require("axios");
class Produto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      photoProduct: []
    };
  }

  componentDidMount() {
    this.getProduct();
  }

  async getProduct() {
    try {
      const resp = await axios.get(`${BASE_URL}/products/getProduct`, {
        params: this.getAllParamsFromUrl()
      });
      const product = resp.data[0];
      const previewImage = UTILS.handleImage(product.nome_arquivo, 400, 400)
      await this.setState({ newPhotos: previewImage });

      await this.setState({ photoProduct: previewImage });
      await this.setState({ product: product });
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
    const { photoProduct } = this.state;
    const {
      preco_varejo_original,
      // preco_custo,
      desc_produto,
      produto,
      cor_produto,
      data_prog,
      qtde_programada,
      // qtde_entregue,
      entrega_ajustada
    } = this.state.product;

    return (
      <Fragment>
        <Header
          title="Programação"
          rightIcon={null}
          leftIcon={
            <IconButton
              aria-label="upload picture"
              component="span"
              className={classes.whiteButton}
              onClick={() => this.props.history.goBack()}
            >
              <ArrowBack></ArrowBack>
            </IconButton>
          }
        />
        <Carousel
        autoPlay={2000}
        animationSpeed={1000}
        infinite
        dots
        slidesPerPage={2}
        >
          {photoProduct.map(image => {
            return (
              <Grid item container justify="center">
              <div className={classes.border}>
                <img src={image}/>
              </div>
              </Grid>
            )
          })}
        </Carousel>

        <Container className={classes.containerSmall}>
          <Grid
            direction="column"
            container
            xs={12}
            sm={12}
            justify="center"
            alignItems="center"
          >
            <Grid className={classes.root}>
              <br></br>
              <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
                xs={12}
                sm={12}
              >
                <Grid
                  className={classes.labelWrapper}
                  container
                  item
                  justify="flex-start"
                  direction="row"
                  alignItems="center"
                >
                  <div className={classes.leftBarLabel}></div>
                  {/* <Grid item ></Grid> */}
                  <Typography variant="h5" component="p" className={classes.title}>
                    Programação
                  </Typography>
                  <Grid item></Grid>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography
                    variant="h6"
                    component="h4"
                    className={classes.minWidth}
                  >
                    {desc_produto}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} alignSelf="flex-end">
                  <Typography
                    color="textSecondary"
                    
                    component="h3"
                    className={classes.marginLeft}
                  >
                    R${preco_varejo_original}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <Typography    variant="h6"
                    component="h4"
                    
                    >
                  Ref:
                </Typography>
                <Typography
                  variant="h6"
                  component="h4"
                  color="textSecondary"
                  className={classes.refLabel}
                >
                  {produto}
                </Typography>
              </Grid>
              <br></br>

              <Grid
                container
                item
                direction="row"
                alignItems="center"
                justify="space-between"
                xs={12}
              >
                <Grid container item direction="column" xs={6}>
                  <Typography variant="h5" component="h4">
                    Programação
                  </Typography>
                  <Typography
                    color="textSecondary"
                    
                    component="subtitle2"
                  >
                    {data_prog}
                  </Typography>
                </Grid>

                <Grid container item direction="column" xs={6}>
                  <Typography variant="h5" component="h4">
                    Recebimento
                  </Typography>

                  <Typography
                    
                    component="subtitle2"
                    color="textSecondary"
                  >
                    {entrega_ajustada}
                  </Typography>
                </Grid>
              </Grid>
              <br></br>

              <Grid
                container
                item
                direction="row"
                alignItems="flex-start"
                xs={12}
              >
                <Grid
                  container
                  item
                  direction="column"
                  xs={6}
                  sm={6}
                  className={classes.lastRow}
                >
                  <Typography variant="h5" component="h4">
                    Cor
                  </Typography>
                  <Typography
                    color="textSecondary"
                    
                    component="subtitle2"
                  >
                    {cor_produto}
                  </Typography>
                </Grid>

                <Grid container item direction="column" xs={6}>
                  <Typography variant="h5" component="h4">
                    Quantidade
                  </Typography>

                  <Typography
                    
                    component="subtitle2"
                    color="textSecondary"
                  >
                    {qtde_programada} pcs
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Fragment>
    );
  }
}

Produto.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Produto);
