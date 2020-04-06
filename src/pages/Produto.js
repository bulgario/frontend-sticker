import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { IconButton } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Divider from '@material-ui/core/Divider';

import Header from "../components/recursableComponents/Header";
import { formatPrice } from '../actions/utils'

import '@brainhubeu/react-carousel/lib/style.css';
import Carousel from '@brainhubeu/react-carousel';
import { BASE_URL } from "../consts";
import UTILS from "../imageUrl";


import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(2),
    // backgroundColor:'green',
    [theme.breakpoints.down("xs")]: {
      paddingRight: theme.spacing(0),
      paddingLeft: theme.spacing(2)
    },
    color: theme.palette.text.primary
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
    marginLeft: theme.spacing(3),
    textAlign: 'center',
    fontWeight: 'bold'
  },
  item: {
    marginLeft: theme.spacing(3),
    textAlign: 'center',
  },
  border: {
    border: ' 15px solid #FFFFFF'
  },
  carousel: {
    width: 400,
    padding: theme.spacing(1)
  },
  divisor: {
    width: 400,
    color: 'blue'
  },
  arrow: {
    cursor: 'pointer'
  },
  imageStyle: {
    boxShadow: '2px 2px 5px #ccc'
  },
  strongPosition: {
    paddingRight: 10
  },
  divider: {
    'display': 'flex',
    'width': theme.spacing(50),
    'marginBottom': theme.spacing(2)
  },
  padding: {
    padding: theme.spacing(4)
  }
});

const axios = require("axios");
class Produto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      photoProduct: [],
    };
  }


  componentDidMount() {
    this.getProduct();
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
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

      const programation = this.getProgramacoes(product)

      await this.setState({ programations: programation })
      await this.setState({ product: product });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  resize = () => {
    let currentHideNav = (window.innerWidth <= 760);
    if (currentHideNav !== this.state.hideNav) {
      this.setState({ hideNav: currentHideNav });
    }
  }

  getProgramacoes = (product) => {
    const obj = []
    product.programacoes.map(programacoes => {
      return obj.push(programacoes)
    })
    return obj
  }

  getAllParamsFromUrl() {
    const produto = this.getParamFromUrl("produto");
    const dataProg = this.getParamFromUrl("data_prog")

    return {
      produto,
      dataProg
    };
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
      // preco_varejo,
      // preco_custo,
      desc_produto,
      // desc_cor,
      fornecedor,
      referencia,
      periodo_pcp,
      categoria,
      subcategoria,
      estilista,
      programacoes,
      // estampa,
      // cor_produto,
      data_primeira_venda,
      // faturamento,
      // sobra_atacado
      // qtd_venda,
      // vl_pago,
      // vl_desconto,
      // markup,
      // qtd_vendida_preco_cheio,
      // verba_programada,
      base,
      // vitrine_uniforme
    } = this.state.product;
    console.log(this.state.product)
    return (
      <Fragment>
        <Header
          title="DETALHES DO PRODUTO"
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

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.padding}
        >
          <Grid item xs={12} sm={6} className={classes.carousel}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.padding}
            >
              <Carousel
                animationSpeed={1500}
                infinite
                arrowRight={<ArrowForwardIosIcon color="primary" className={classes.arrow} name="angle-double-right" />}
                arrowLeft={<ArrowBackIosIcon color="primary" className={classes.arrow} name="angle-double-left" />}
                addArrowClickHandler
                dots
                slidesPerPage={this.state.hideNav ? 1 : 1}
                className={classes.carousel}
              >
                {photoProduct.map(image => {
                  return (
                    <Grid item justify="center">
                      <div className={classes.border}>
                        <img className={classes.imageStyle} src={image} alt="produto" />
                      </div>
                    </Grid>
                  )
                })}
              </Carousel>
            </Grid>
          </Grid>
          <Grid container xs={12} sm={6}>
            <Grid item xs={12}>
              <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Ref:</strong>{referencia}</Typography>
              <Typography variant="h5" component="p">{desc_produto}</Typography>
              <Typography variant="h9" color="textSecondary" component="p">{formatPrice(preco_varejo_original)}</Typography>
              {this.state.product.colecoes ? (
                <Typography variant="h5" component="p">{this.state.product.colecoes[0].nome_colecao}</Typography>
              ) : null}
            </Grid>
            <Divider />
            <Divider color="primary" className={classes.divider}></Divider>
            <Grid item xs={12}>
              {this.state.product ? (
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography color="textSecondary" variant="h5" className={classes.heading}>Detalhes do Produto</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container direction="row">
                      <Grid item xs={12}>
                        <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Categoria:</strong>{categoria}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Sub-Categoria:</strong>{subcategoria}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Estilista:</strong>{estilista}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Fornecedor:</strong>{fornecedor}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Periodo PCP:</strong>{periodo_pcp}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Base:</strong>{base}</Typography>
                      </Grid>
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ) : null}
            </Grid>
            <Divider color="primary" className={classes.divider}></Divider>
            <Grid item xs={12}>
              {programacoes ? programacoes.map(programacoes => {
                return (
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography color="textSecondary" variant="h5" className={classes.heading}>Programação</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Grid container direction="row">
                        <Grid item xs={12}>
                          <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Data de Programação:</strong>{programacoes.data_prog}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Nome Programação:</strong>{programacoes.nome_programacao}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Quantidade Programada:</strong>{programacoes.qtde_programada}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Quantidade Entregue:</strong>{programacoes.qtde_entregue}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Ultima Data de Agendamento:</strong>{programacoes.ultima_data_agendamento_entrega}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Entrega Ajustada:</strong>{programacoes.entrega_ajustada}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Vitrine/Uniforme:</strong>{programacoes.vitrine_uniforme}</Typography>
                        </Grid>
                      </Grid>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )
              }) : null}
            </Grid>
            <Divider color="primary" className={classes.divider}></Divider>
            <Grid item xs={12}>
              {this.state.product ? (
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography color="textSecondary" variant="h5" className={classes.heading}>Vendas</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container direction="row">
                      <Grid item xs={12}>
                        <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Preco Cheio:</strong>{formatPrice(preco_varejo_original)}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Preco Medio:</strong>{}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Desconto Medio:</strong>{}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Markup:</strong>{}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h9" color="textSecondary" component="p"><strong>Qtd Vendida Preço Cheio:</strong>{}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Data Primeira Venda:</strong>{data_primeira_venda}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Verba Programada:</strong>{}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Faturamento:</strong>{}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h9" color="textSecondary" component="p"><strong className={classes.strongPosition}>Sobra Atacado:</strong>{}</Typography>
                      </Grid>
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ) : null}
            </Grid>
            <Divider color="primary" className={classes.divider}></Divider>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Produto.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Produto);