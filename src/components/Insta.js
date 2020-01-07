import React, { Fragment } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";

import TextField from "@material-ui/core/TextField";

import BoxCompany from "./recursableComponents/BoxCompany";
import CardActions from "@material-ui/core/CardActions";

import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";

import Fab from "@material-ui/core/Fab";

import { signIn } from "../actions";
import { programacoes } from "../consts";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { withSnackbar } from "notistack";

const axios = require("axios");

const styles = theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  media: {
    height: 400,
    width: 280
  },
  card: {
    height: 270,
    maxWidth: 620,
    maxHeight: 300,
    minWidth: 620,
    margin: theme.spacing(1),
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
      programacoes,
      expanded: false
    };
  }

  componentDidMount() {

    this.getProducts();
  }
  async getProducts() {
    try {
      const response = await axios.get("http://localhost:8000/products", {
        params: this.getAllParamsFromUrl()
      });
      console.log(response);

      if (response.data.length < 1) {
        return this.props.enqueueSnackbar(
          "Não há produtos programados para essas datas ",
          { variant: "warning" }
        );
      }

      const arrayProducts = response.data;
      const formatedProducts = arrayProducts.map((produto, index) => {
        return produto._source;
      });
      this.setState({ produto: formatedProducts });
    } catch (err) {
      console.log(err);
      return this.props.enqueueSnackbar("Problemas no backend", {
        variant: "error"
      });
    }
  }

  getAllParamsFromUrl() {
    const dataInicio = this.getParamFromUrl("dataInicio");
    const dataFim = this.getParamFromUrl("dataFim");
    const dataUltimoAgendamento = this.getParamFromUrl("dataUltimoAgendamento");
    const category = this.getParamFromUrl("categoria");
    const subcategory = this.getParamFromUrl("subcategoria");
    const collection_name = this.getParamFromUrl("colecao");

    return {
      dataInicio,
      dataFim,
      dataUltimoAgendamento,
      category,
      subcategory,
      collection_name
    };
  }

  getJsonFromUrl(param) {
    return JSON.parse(this.getParamFromUrl(param));
  }

  getParamFromUrl(param) {
    const urlSearch = new URLSearchParams(this.props.location.search);
    return urlSearch.get(param);
  }

  renderProgramacoes() {
    const { programacoes, produto } = this.state;
    console.log(programacoes)
    const { classes } = this.props;
    return programacoes.map(programacao => {
      return (
        <Grid item direction="row"  justify="center">
          <Grid item align="center">
          <Typography variant="h5">{programacao.date}</Typography>
          </Grid>
          <Divider variant="middle" className={classes.divider}></Divider>
          {this.state.expanded
            ? this.renderProductsCardsView(programacao.produtos)
            : this.renderProductsInstaView(programacao.produtos)}
        </Grid>
      );
    });
  }

  renderProductsCardsView({ produtos, date }) {
    const { classes } = this.props;
    const { produto } = this.state;
    return (
      <Grid container justify="center">
        {produto.map(produto => {
          return (
            <Card className={classes.card}>
              <Grid container direction="row" justify="flex-start">
                <Grid alignItems="center">
                  <CardMedia
                    className={classes.mediaCard}
                    image={
                      produto.nome_arquivo ? produto.nome_arquivo[0] : "noPhoto"
                    }
                    title="Produto"
                  />
                </Grid>
                <Grid className={classes.productInfo}>
                  <TextField
                    label="Coleção"
                    className={classes.textFieldFull}
                    value={produto.nome_colecao[0]}
                    InputProps={{
                      readOnly: true
                    }}
                    variant="outlined"
                  />
                  <Grid className={classes.row}>
                    <TextField
                      label="Categoria"
                      className={classes.textField}
                      value={produto.categoria}
                      InputProps={{
                        readOnly: true
                      }}
                      variant="outlined"
                    />
                    <TextField
                      label="Subcategoria"
                      className={classes.textField}
                      value={produto.subcategoria}
                      InputProps={{
                        readOnly: true
                      }}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          );
        })}
      </Grid>
    );
  }

  renderProductsInstaView({ produtos, date }) {
    const { classes } = this.props;
    const { produto } = this.state;
    return (
      <Grid className={classes.horizontalScroll}>
        {produto.map(produto => {
          return (
            <Card className={classes.margin}>
              <CardMedia
                className={classes.media}
                image={produto.nome_arquivo[0]}
                title="Produto"
              />

              {/* <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
              </CardActions> */}
            </Card>
          );
        })}
      </Grid>
    );
  }

  render() {
    const { classes, authToken } = this.props;
    // if (authToken) {
    //   return (
    //     <Redirect to={'/Login'} />
    //   );
    // }

    return (
      <Fragment>
        <BoxCompany insta={true} />

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

const wrappedInsta = withStyles(styles)(withSnackbar(Insta));

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  recoverySuccess: state.auth.recovery,
  authToken: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  signIn: (username, password) => dispatch(signIn(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(wrappedInsta);
