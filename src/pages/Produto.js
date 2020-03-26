import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { IconButton, Container } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Header from "../components/recursableComponents/Header";

import '@brainhubeu/react-carousel/lib/style.css';
import Carousel from '@brainhubeu/react-carousel';
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
     
      console.log("aa", product)
      await this.setState({ programations: programation })
      await this.setState({ product: product });
    } catch (err) {
      console.log(err);
      return err;
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
    const { photoProduct, programations } = this.state;
    console.log("bb", this.state.programations)
    const {
      preco_varejo_original,
      preco_varejo,
      preco_custo,
      desc_produto,
      desc_cor,
      fornecedor,
      referencia,
      periodo_pcp,
      categoria,
      subcategoria,
      estilista,
      programacoes,
      estampa,
      cor_produto,
      data_primeira_venda,
      // faturamento,
      // sobra_atacado
      // qtd_venda,
      // vl_pago,
      // vl_desconto,
      // markup,
      // qtd_vendida_preco_cheio,
      // verba_programada
      
    } = this.state.product;

    const singleItem = (title, item) => {
      return (
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={2}>
            <Typography variant="h9" component="p" className={classes.title}>{title}:</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h12" component="p" color="textSecondary" className={classes.item}>{item}</Typography>
          </Grid>
        </Grid>
      )
    }

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
                <img src={image} alt="produto"/>
              </div>
              </Grid>
            )
          })}
        </Carousel>
        <Grid container direction="row" item md={12} xs={12} spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h3" component="p" className={classes.title}>Programação</Typography>
            </Grid>
          </Grid>
          <Grid container  direction="row" justify="flex-start" item md={12} xs={12} spacing={3}>
            {singleItem("Descricao do Produto", desc_produto)}
            {singleItem("Referencia", referencia)}
            {singleItem("Preco", preco_custo)}
          </Grid>
        <br></br>
        <br></br>
        <br></br>
        <Grid container md={12} spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5" component="p" className={classes.title}>Detalhes do Produto</Typography>
        </Grid>
            <Grid container  direction="row" justify="flex-start" item md={12} xs={12} spacing={3}>
              <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Cor</TableCell>
                    <TableCell align="right">Categoria</TableCell>
                    <TableCell align="right">Subcategoria</TableCell>
                    <TableCell align="right">Estilista</TableCell>
                    <TableCell align="right">Fornecedor</TableCell>
                    <TableCell align="right">Periodo PCP</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell align="right">{desc_cor}</TableCell>
                  <TableCell align="right">{categoria}</TableCell>
                  <TableCell align="right">{subcategoria}</TableCell>
                  <TableCell align="right">{estilista}</TableCell>
                  <TableCell align="right">{fornecedor}</TableCell>
                  <TableCell align="right">{estilista}</TableCell>
                  <TableCell align="right">{periodo_pcp}</TableCell>
                </TableBody>
              </Table>
            </TableContainer>
            </Grid>
        </Grid>
        <br></br>
        <br></br>
        <br></br>
        <Grid container  direction="row" justify="flex-start" item md={12} xs={12} spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" component="p" className={classes.title}>Programação</Typography>
        </Grid>
              {programacoes ? programacoes.map(programacoes => {
                  return (
                    <TableContainer>
                      <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Nome Programação</TableCell>
                            <TableCell align="right">Data Prog</TableCell>
                            <TableCell align="right">Qtd Entregue</TableCell>
                            <TableCell align="right">Qtd Programada</TableCell>
                            <TableCell align="right">Ultima data Agendamento</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={programacoes.nome_programacao}>
                              <TableCell component="th" scope="row">
                                {programacoes.nome_programacao}
                              </TableCell>
                              <TableCell align="right">{programacoes.data_prog}</TableCell>
                              <TableCell align="right">{programacoes.qtde_entregue}</TableCell>
                              <TableCell align="right">{programacoes.qtde_programada}</TableCell>
                              <TableCell align="right">{programacoes.ultima_data_agendamento_entrega}</TableCell>
                            </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )
                }) : null}
            </Grid>
        <br></br>
        <br></br>
        <br></br>
        <Grid container direction="row" item md={12} xs={12} spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" component="p" className={classes.title}>Vendas</Typography>
        </Grid>
      </Grid>
      <Grid container  direction="row" justify="flex-start" item md={12} xs={12} spacing={3}>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Preco Cheio</TableCell>
                <TableCell align="right">Preco Medio</TableCell>
                <TableCell align="right">Desconto Medio</TableCell>
                <TableCell align="right">Markup</TableCell>
                <TableCell align="right">Qtd Vendida Preço Cheio</TableCell>
                <TableCell align="right">Data Primeira Venda</TableCell>
                <TableCell align="right">Verba Programada</TableCell>
                <TableCell align="right">Faturamento</TableCell>
                <TableCell align="right">Sobra Atacado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell align="right">{preco_varejo_original}</TableCell>
              {/* <TableCell align="right">{(qtd_venda/vl_pago)}</TableCell> */}
              {/* <TableCell align="right">{(vl_desconto/qtd_venda)}</TableCell> */}
              {/* <TableCell align="right">{markup}</TableCell> */}
              {/* <TableCell align="right">{qtd_vendida_preco_cheio}</TableCell> */}
              <TableCell align="right">{data_primeira_venda}</TableCell>
              {/* <TableCell align="right">{verba_programada}</TableCell> */}
              {/* <TableCell align="right">{faturamento}</TableCell> */}
              {/* <TableCell align="right">{sobra_atacado}</TableCell> */}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      </Fragment>
    );
  }
}

Produto.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Produto);