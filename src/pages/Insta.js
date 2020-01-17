import React, { Fragment } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";

import Header from "../components/recursableComponents/Header";
import Badge from '@material-ui/core/Badge';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";

import Fab from "@material-ui/core/Fab";

import { signIn } from "../actions";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { withSnackbar } from "notistack";
import {
  BASE_URL,
} from '../consts'
import User from '../services/User'


const axios = require("axios");
const _ = require("lodash");

const styles = theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  media: {
    height: 400,
    width: 280
  },
  card: {
    height: 500,
    maxWidth: 620,
    maxHeight: 800,
    minWidth: 620,
    margin: theme.spacing(2),
    padding: 0,
    backgroundColor: "white"
  },
  mediaCard: {
    height: 220,
    width: 200,
    objectFit: "scale-down",
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),

    borderWidth: 2,
    borderColor: "#FFE600"
  },
  productInfo: {
    width: 300,
    borderWidth: 1.5,
    borderColor: "black",
    marginTop: theme.spacing(2),

    marginRight: theme.spacing(1),

    marginLeft: theme.spacing(2)
  },

  dateText: {
    textAlign: "center",
    fontWeight: "bold"
  },
  horizontalScroll: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(3)
  },
  divider: {
    backgroundColor: "#ffe600",
    marginLeft: "25%",
    marginRight: "25%",
    height: 1.5
  },
  cardHeader: {
    textAlign: "center"
    // paddingVertical:theme.spacing(-2)
  },
  textField: {
    width: 190,
    margin: theme.spacing(1)
  },
  textFieldFull: {
    width: 385,
    margin: theme.spacing(1)
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 400
  },
  balls: {
    left: 0
  }
});

class Insta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produto: [],
      username: "",
      password: "",
      showPassword: false,
      usernameError: false,
      passwordError: false,
      recoveryError: false,
      recoverySubmitted: false,
      recoveryShow: false,
      allProducts: [],
      expanded: false
    };
  }

  componentDidMount() {
    this.getProducts();
  }
  async getProducts() {
    try {
      const response = await axios.get(`${BASE_URL}/products/selectedProducts`, {
        params: this.getAllParamsFromUrl()
      });
      let products = response.data;

      if (products.length < 1 || _.isEmpty(products) ) {
        return this.props.enqueueSnackbar(
          "Não há produtos programados para essas datas ",
          { variant: "warning" }
        );
      }

      this.setState({ allProducts: products });

    } catch (err) {
      console.log(err);
      return this.props.enqueueSnackbar("Problemas no backend", {
        variant: "error"
      });
    }
  }

  getAllParamsFromUrl() {
    const user  = new User()
    const dataInicio = this.getParamFromUrl("dataInicio");
    const dataFim = this.getParamFromUrl("dataFim");
    const dataUltimoAgendamento = this.getParamFromUrl("dataUltimoAgendamento");
    const category = this.getParamFromUrl("categoria");
    const subcategory = this.getParamFromUrl("subcategoria");
    const collection_name = this.getParamFromUrl("colecao");
    const id_marca_estilo = user.getIdMarcaEstilo()

    return {
      dataInicio,
      dataFim,
      dataUltimoAgendamento,
      category,
      subcategory,
      collection_name,
      id_marca_estilo
    };
  }

  getJsonFromUrl(param) {
    return JSON.parse(this.getParamFromUrl(param));
  }

  getParamFromUrl(param) {
    const urlSearch = new URLSearchParams(this.props.location.search);
    return urlSearch.get(param);
  }

  onDragEnd = result => {}

  renderProgramacoes() {
    const { allProducts } = this.state;
    const { classes } = this.props;
    return Object.entries(allProducts).map(produtos => {
      return (
        <Grid item direction="row" justify="center">
          <Grid item align="center">
            <Typography variant="h5">{produtos[0]}</Typography>
          </Grid>
          <Divider variant="middle" className={classes.divider}></Divider>
          {this.state.expanded
            ? this.renderProductsCardsView()
            : this.renderProductsInstaView()}
        </Grid>
      );
    });
  }


  renderBalls(distribuicao, validBasedinSchedule) {
    if(distribuicao === true) {
      return (
        <Badge badgeContent={4} color="primary"></Badge>
      )
    } else if(distribuicao === validBasedinSchedule) {
      return (
        <Badge badgeContent={4} color="secondary"></Badge>
      )
    } else {
      return (
        <Badge badgeContent={4} color="error"></Badge>
      )
    } 
  }

  renderProductsCardsView() {
    const { classes } = this.props;
    const { produto, allProducts } = this.state;

    return (
      <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      >
        {Object.values(allProducts).map(data => {
            return data.map(produtos => {
              const { distribuicao, ultima_data_agendamento_entrega, produto, desc_produto, cor_produto, qtde_programada, validBasedinSchedule } = produtos
              return(
              <Card className={classes.card}>
              <Typography gutterBottom variant="h8" component="h2">{produto}</Typography>
              <Typography variant="body2" color="textSecondary" component="p">{desc_produto}</Typography>
              <Typography variant="body2" color="textSecondary" component="p">{cor_produto}</Typography>
              {/* <Typography variant="body2" color="textSecondary" component="p">{produtos.desc_cor_produto}</Typography> */}
              <Typography gutterBottom variant="h8" component="h2">{qtde_programada}</Typography>
              <Typography gutterBottom variant="h8" component="h2">{ultima_data_agendamento_entrega}</Typography>
            <Grid className={classes.productInfo}>
              {this.renderBalls(distribuicao, validBasedinSchedule)}
            </Grid>
              <CardMedia
              className={classes.mediaCard}
                image={
                  produtos.nome_arquivo[0]
                    ? produtos.nome_arquivo[0]
                    : "noPhoto"
                }
                title="Produto"
                />
               </Card>
              )
            })
        })}
      </Grid>
    );
  }

 
  renderProductsInstaView() {
    const { classes } = this.props;
    const { allProducts } = this.state;
    return (
      <Grid className={classes.horizontalScroll}>
        {Object.values(allProducts).map(data => {
         return data.map(produto => {
            return (
              <Card className={classes.margin}>
                <CardMedia
                  className={classes.media}
                  image={produto.nome_arquivo[0]}
                  title="Produto"
                />
              </Card>
            );
          });
        })}
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Header insta={true} />

        <Container>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={this.state.expanded}
                onChange={() =>
                  this.setState({ expanded: !this.state.expanded })
                }
              />
            }
            label="Detalhes"
          />

          <div className={classes.margin}>
            <Grid container direction="column" spacing={2}>
              {this.renderProgramacoes()}
            </Grid>
          </div>
        </Container>
        <Grid container justify="center">
          <Fab aria-label={"Add"} className={classes.fab} color={"primary"}>
            <AddIcon />
          </Fab>
        </Grid>
      </Fragment>
    );
  }
}

const wrapperComponent = withStyles(styles)(withSnackbar(withRouter(Insta)));

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  recoverySuccess: state.auth.recovery,
  authToken: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  signIn: (username, password) => dispatch(signIn(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(wrapperComponent);
