import React, { Fragment } from "react";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import { Redirect } from "react-router-dom";
import User from "../services/User";
import Header from "../components/recursableComponents/Header";
import Container from "@material-ui/core/Container";
import ResponsiveNavbar from "../components/recursableComponents/ResponsiveNavbar";

import MenuCard from "../components/recursableComponents/MenuCard";
import TopDrawer from "../components/recursableComponents/TopDrawer"

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/icons/Menu";
import Search from "@material-ui/icons/Search";

const styles = theme => ({
  container: {},
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
    maxWidth: 500
  },
  whiteButton: {
    color: "white",
    sizeSmall: "100px"
  }
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false,
      usernameError: false,
      passwordError: false,
      recoveryError: false,
      recoverySubmitted: false,
      recoveryShow: false,
      open: false,
      open2: false,
      renderAutoComplete: false
    };
  }

  openMenu = () => {
    this.setState({ open: !this.state.open });
  };

  openMenu2 = () => {
    this.setState({ open2: !this.state.open2 });
  };

  render() {
    const { classes } = this.props;
    const user = new User();

    if (!user.getUser()) {
      return <Redirect from={"/home"} to={"/login"} />;
    }

    return (
      <Fragment>
        <ResponsiveNavbar
          openMenu={this.openMenu}
          open={this.state.open}
        ></ResponsiveNavbar>
        <TopDrawer      
          openMenu={this.openMenu2}
          open={this.state.open2}></TopDrawer>

        <Header
          title="+Produtos"
          rightIcon={
            <IconButton
              aria-label="upload picture"
              component="span"
              className={classes.whiteButton}
              onClick={this.openMenu2}
            >
              <Search  />
            </IconButton>
          }
          leftIcon={
            <IconButton
              onClick={this.openMenu}
              aria-label="upload picture"
              component="span"
              className={classes.whiteButton}
            >
              <Menu />
            </IconButton>
          }
        />
        <Container className={classes.root}>
          <Grid
            container
            justify="center"
            direction="column"
            alignItems="center"
            spacing={4}
          >
             <Grid item className={classes.gridItem}>
              <MenuCard
                title="Meus Produtos"
                body="Crie e compartilhe combinações de produtos"
                redirectTo="/meusprodutos"
              ></MenuCard>
            </Grid>
            <Grid item className={classes.gridItem}>
              <MenuCard
                title="Recebimento"
                body="Acompanhe todo o fluxo de pedidos e faça análises"
                redirectTo="/search"
              ></MenuCard>
            </Grid>
            {/* <Grid item className={classes.gridItem}>
              <MenuCard
                title="Acomp. Coleção"
                body="Veja os Produtos e acompanhe os principais indicadores"
                redirectTo="/colecoes"
              ></MenuCard>
            </Grid> */}
            {/* <Grid item className={classes.gridItem}>
              <MenuCard
                title="Venda"
                body="Confira em tempo real os números de pedidos e vendas"
              ></MenuCard>
            </Grid> */}
          </Grid>
        </Container>
      </Fragment>
    );
  }
}
const wrappedComponent = withStyles(styles)(Home);

export default wrappedComponent;
