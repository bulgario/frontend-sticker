import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import { IconButton } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Grid from "@material-ui/core/Grid";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import Header from "../components/recursableComponents/Header";
import MyProductsCards from "../components/recursableComponents/MyProductsCards";

import {BASE_URL} from '../consts';
import User from "../services/User";
import axios from "axios";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "blue"
  },
  input: {
    margin: theme.spacing.unit
  },
  root: {
    flexGrow: 1,
    height: "auto",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  grid: {
    marginTop: theme.spacing(2)
  },
  loadingCircle: {
    padding: theme.spacing(3),
    textAlign: "center"
  },
  main: {
    marginTop: theme.spacing(6)
  },
  button: {
    margin: theme.spacing(2)
  },
  pointer: {
    cursor: "pointer"
  },
  logo: {
    width: 180,
    margin: theme.spacing(2)
  },
  margin: {
    margin: theme.spacing(2)
  },
  gridItem: {
    maxWidth: 700
  },
  whiteButton: {
    color: "white",
    sizeSmall: "100px"
  },
  circleIcon: {
    cursor: "pointer",
    fontSize: theme.spacing(8)
  }
});

class MyProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vitrine: []
    };
  }

  componentDidMount() {
    this.getReports()
  }

  async getReports() {
    try {
      await axios.get(`${BASE_URL}/myProducts/getReports`, {
        params: this.getAllParamsFromUrl()
      }).then(data => {
        this.setState({ vitrine: data.data })
      })
    } catch (err) {
      console.log("Error getting reports:", err)
    }
  }

  getAllParamsFromUrl() {
    const user = new User();
    const id_user = user.getUser().id_usuario;
    return {
      id_user,
    };
  }

  render() {
    const { classes } = this.props;
    const { vitrine } = this.state;
    const user = new User()
    const date = new Date()

    const generateNewCards = () => {
      this.setState({ 
        vitrine: [...this.state.vitrine,
        { 
          id_usuario : user.user.id_usuario,
          // "img_relatorio": img_relatorio,
          data_criacao : date,
          produto_tags: {},
          referencia_tags: {},
        }] 
      }, () => console.log(this.state.vitrine));
    };

    return (
      <Fragment>
        <Header
          title="Meus Produtos"
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
        {vitrine.map((meusProdutos, i) => {
          const setStateProduct = (obj, cb) =>
            this.setState(
              {
                vitrine: [
                  ...this.state.vitrine.slice(0, i),
                  obj,
                  ...this.state.vitrine.slice(i + 1)
                ]
              },
              () => {
                console.log(this.state.vitrine);
              }
            );
          return (
            <MyProductsCards
              nameCardBox={
                meusProdutos.nome_relatorio !== ""
                  ? meusProdutos.nome_relatorio
                  : ""
              }
              redirectTo={`/relatorio?id_relatorio=${meusProdutos.id}`}
              getProdutosData={setStateProduct}
              meusProdutos={meusProdutos}
              index={i}
            />
          );
        })}
        <Grid container item direction="row" alignItems="flex-end" xs={12}>
          <Grid item direction="row" justify="flex-end" container>
            <AddCircleIcon
              className={classes.circleIcon}
              color="primary"
              onClick={generateNewCards}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

const wrapperComponent = withStyles(styles)(
  withSnackbar(withRouter(MyProducts))
);
export default wrapperComponent;
