import React, { Fragment } from "react";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import { Redirect } from "react-router-dom";
import User from "../services/User";
import Header from "../components/recursableComponents/Header";
import Container from "@material-ui/core/Container";
import ResponsiveNavbar from "../components/recursableComponents/ResponsiveNavbar";

import MenuCard from "../components/recursableComponents/MenuCard";
import AutoComplete from "../components/recursableComponents/SearchAutoComplete"

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
      renderAutoComplete: false
    };
  }

  openMenu = () => {
    this.setState({ open: !this.state.open });
  };

  handleAutoComplete = () => {
    this.state.renderAutoComplete === true ?
      this.setState({ renderAutoComplete: false }) :
        this.setState({ renderAutoComplete: true }) 
  }

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

        <Header
          title="Central de produto"
          rightIcon={
            <IconButton
              aria-label="upload picture"
              component="span"
              className={classes.whiteButton}
            >
              <Search onClick={this.handleAutoComplete} />
              <div>
              {this.state.renderAutoComplete && <AutoComplete />}
              </div>
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
                title="Programação"
                body="Acompanhe todo o fluxo de pedidos e faça análises"
                redirectTo="/search"
              ></MenuCard>
            </Grid>
            <Grid item className={classes.gridItem}>
              <MenuCard
                title="Venda"
                body="Confira em tempo real os números de pedidos e vendas"
              ></MenuCard>
            </Grid>
          </Grid>
        </Container>
      </Fragment>
    );
  }
}
const wrappedComponent = withStyles(styles)(Home);

export default wrappedComponent;
