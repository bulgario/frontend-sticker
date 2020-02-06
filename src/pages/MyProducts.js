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

const vitrine = [
  {
    nomeColecao: "Vitrine 04/12/19",
    id_usuario: 123,
    imagemJanela:
      "https://img.elo7.com.br/product/244x194/1BF6822/adesivos-para-vitrines-liquidacao-vitrine-de-lojas.jpg",
    produto_tags: {
      id_produto_1: [1, 2, 3],
      id_produto_2: []
    }
  },
  {
    nomeColecao: "Vitrine 04/12/19",
    id_usuario: 456,
    imagemJanela:
      "https://img.elo7.com.br/product/244x194/1BF6822/adesivos-para-vitrines-liquidacao-vitrine-de-lojas.jpg",
    produto_tags: {
      id_produto_1: [1, 2, 3],
      id_produto_2: []
    }
  }
];

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
    display: "flex",
    color: theme.palette.text.primary,
    fontSize: 60,
    position: "flex-start"
  },
  circlePosition: {
    position: "fixed",
    right: theme.spacing(2)
  }
});

class MyProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderCard: false
    };
  }

  generateNewCards = () => {
    const { renderCard } = this.state;
    if (renderCard === false) {
      this.setState({ renderCard: true });
    } else {
      this.setState({ renderCard: false });
    }
  };

  renderNewCard = () => {
    const { classes } = this.props;
    if (this.state.renderCard) {
      return (
        <Grid item className={classes.gridItem}>
          <MyProductsCards
            idUser={vitrine[0].id_usuario}
            imagemJanela={vitrine[0].imagemJanela}
            redirectTo="/meusprodutos"
          ></MyProductsCards>
        </Grid>
      );
    }
  };

  render() {
    const { classes } = this.props;

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
        {vitrine.map(meusProdutos => {
          return (
            <MyProductsCards
              nameCardBox={
                meusProdutos.nome_relatorio !== ""
                  ? meusProdutos.nome_relatorio
                  : ""
              }
              idUser={meusProdutos.id_usuario}
              imagemJanela={meusProdutos.imagemJanela}
              redirectTo="/meusprodutos"
            />
          );
        })}
        <Grid item className={classes.gridItem}>
          {this.state.renderCard ? this.renderNewCard() : ""}
        </Grid>
        <div className={classes.circlePosition} onClick={this.generateNewCards}>
          <AddCircleIcon
            className={classes.circleIcon}
            color="primary"
            onClick={this.generateNewCards}
          />
        </div>
      </Fragment>
    );
  }
}

const wrapperComponent = withStyles(styles)(
  withSnackbar(withRouter(MyProducts))
);
export default wrapperComponent;
