import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography,Fab } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { withRouter } from "react-router-dom";
import User from "../../services/User";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    backgroundColor: "#ffeb3b",
    boxShadow: "1px 1px 1px 1px"
  },
  header: {
    backgroundColor: "#ffeb3b",
    color: theme.palette.text.primary,
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  spacing: {
    marginHorizontal: theme.spacing(2)
  },
  loginName: {
    maxWidth: "20%",
    fontSize: 16,
    fontWeight: "bold"
  }
}));


const Header = props => {
  const classes = useStyles();
  const user  = new User()
  const { login, id_marca_estilo } = user.getUser()
  const { id_marca, marca } = props

  const verifyUserbrand = (id_marca, marca, id_marca_estilo) => {
    return id_marca == id_marca_estilo ? marca : "SomaLabs" //eslint-disable-line
  }

  const handleClick = eve => {
    if(props.history.location.pathname ==='/search') {
      User.logout()
      return  props.history.push('/login')
    }

    return props.history.goBack()
  };

  const { insta } = props;
  if (insta) {
    return (
      <div className={classes.header}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Fab color="primary" onClick={handleClick}>
            <ArrowBack ></ArrowBack>
            </Fab>
          </Grid>
          <Grid item>
            <Typography variant="h4">{verifyUserbrand(id_marca, marca, id_marca_estilo)}</Typography>
          </Grid>

          <Typography className={classes.loginName}>
            
          {login}
          </Typography>

          {/* <Grid item container direction="row" aligmItems="start"> */}
          {/* <Grid item direction="row" spacing={1}>
            <Share/>
            <Menu/>
          </Grid> */}
          {/* <Grid item></Grid> */}
          {/* </Grid> */}
        </Grid>
      </div>
    );
  }

  return (
    <div>
      <h2 className={classes.root}>Animale</h2>
    </div>
  );
};

export default withRouter(Header);
