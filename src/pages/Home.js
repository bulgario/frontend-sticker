import React, { Fragment } from 'react'


import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
import { Redirect } from 'react-router-dom'
import User from "../services/User";
import Header from "../components/recursableComponents/Header";
import Container from "@material-ui/core/Container";
import Navbar from "../components/recursableComponents/Navbar";
import MenuCard from "../components/recursableComponents/MenuCard";








const styles = theme => ({
    
    container: {

    },
  root: {
    flexGrow: 1,
    height: 'auto',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  grid: {
    marginTop: theme.spacing(2),
  },
  loadingCircle: {
    padding: theme.spacing(3),
    textAlign: 'center',
  },
  main: {
    marginTop: theme.spacing(6),
  },
  button: {
    margin: theme.spacing(2),
  },
  pointer: {
    cursor: 'pointer',
  },
  logo: {
    width: 180,
    margin: theme.spacing(2),
  },
  margin:{
    margin: theme.spacing(2)
  }
});

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      showPassword: false,
      usernameError: false,
      passwordError: false,
      recoveryError: false,
      recoverySubmitted: false,
      recoveryShow: false,
      open:false

    }
  }

  openMenu=() =>   {
      console.log('fui chamado')
      this.setState({open: !this.state.open})
      console.log(this.state.open)
  }

  render() {
    const { classes } = this.props;
    const user = new User()

    if (!user.getUser()) {
      return (
        <Redirect from={'/home'} to={'/login'} />
      );
    }

    return (
        <Fragment>
            		<Navbar  openMenu={this.openMenu} open={this.state.open}></Navbar>


        <Header insta={false} 
        openMenu={this.openMenu}
        id_marca={this.state.id_marca_user}
        marca={this.state.marca_user} 
        />
      <Container className={classes.root}>
            <Grid container justify="center" direction="column" alignItems="center" spacing={4} >
                <Grid item>
                <MenuCard title="Programação" body="Acompanhe todo o fluxo de pedidos e faça análises" redirectTo="/search"></MenuCard>

                </Grid>
                <Grid item>
                <MenuCard title="Venda" body="Confira em tempo real os números de pedidos e vendas"></MenuCard>

                </Grid>


            </Grid>
      </Container>
      </Fragment>

    );
  }
}
const wrappedComponent = withStyles(styles)(Menu)


export default (wrappedComponent)