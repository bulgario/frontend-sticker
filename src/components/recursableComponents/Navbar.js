import React from "react";
import { withRouter } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";


import makeStyles from "@material-ui/core/styles/makeStyles";

import ListIcon from "./ListIcon";
import AccountCircle from "@material-ui/icons/AccountCircle";


import { ROUTES } from "../../consts";

import User from "../../services/User";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 0,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerExpanded: {
    width: 280,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
  },
  button: {
    position: "fixed",
    [theme.breakpoints.down("sm")]: {
      top: "2%",
      left: "2%"
    },
    [theme.breakpoints.up("md")]: {
      top: "1%",
      left: "1%"
    },
    opacity: 0.5,
    "&:hover": {
      opacity: 1
    },

  },
  login: { 
    textAlign:'center'
},
userInfoContainer: { 
    padding:theme.spacing(2),
}
}));

function Navbar(props) {
  const classes = useStyles();
  const user = new User();
  const matchRoute = (urlTested, matcher) => {
    const urlSplitted = urlTested.split("/");
    const matchSplitted = matcher.split("/");
    return urlSplitted[1] === matchSplitted[1];
  };
  const renderUserInfo = () => {
    const user = new User();
    return (
      <Grid container flex="column" className={classes.userInfoContainer}>
        <AccountCircle fontSize={"large"} color="primary"></AccountCircle>
        <br />
        <br />

        <Typography align='justify' gutterBottom variant="h6" component="h2"  className={classes.login} >
          {user.getLogin()}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p"className={classes.email}>
          {user.getEmail()}
        </Typography>

      </Grid >
    );
  };

  const menuIcons = [
    {
      name: "check",
      text: "Recebimento",
      action: () => redirect(ROUTES.SEARCH),
      show: user.canAcessThisRoute(ROUTES.SEARCH),
      route: ROUTES.HOME
    },
    {
      name: "shopping-cart",
      text: "Venda",
      action: () => redirect(ROUTES.INSTA),
      show: user.canAcessThisRoute(ROUTES.INSTA),
      route: ROUTES.INSTA
    },
    {
      name: "note",
      text: "Meus relatórios",
      action: () => redirect(ROUTES.INSTA),
      show: user.canAcessThisRoute(ROUTES.INSTA),
      route: ROUTES.SEARCH
    },
    {
      name: "exit_to_app",
      text: "Logout",
      action: () => {
        User.logout();
        redirect(ROUTES.LOGIN);
      },
      show: true
    }
  ];

  function getIndexInitialSelectedMenu(menuIcons) {
    const urlNow = props.location.pathname;
    return menuIcons.findIndex(menu => {
      if (menu.hasOwnProperty("route")) {
        return matchRoute(menu.route, urlNow);
      }
      return false;
    });
  }

  //   function getMobileNavbar() {
  //     return (
  //       <>
  //         <ExpansiveFab buttons={menuIcons.filter(icon => icon.show)} onClick={handleClick}/>
  //       </>
  //     );
  //   }

  function getDeskptopNavbar() {
    return (
      <Drawer
        // variant={"permanent"}
        classes={{
          paper: props.open ? classes.drawerExpanded : classes.drawer
        }}
        open={props.open} onClose={props.openMenu}
      >
        {/* <ListIcon icons={[mainMenu]} onClick={handleClick} /> */}
        <br />

        {renderUserInfo()}

        <Divider></Divider>
        <br />

        <ListIcon
          icons={menuIcons.filter(icon => icon.show)}
          onClick={handleClick}
          showText={props.open}
          showSelected
          initialIndexSelect={getIndexInitialSelectedMenu(menuIcons)}
        />
      </Drawer>
    );
  }

  function redirect(url) {
    props.history.push(url);
  }

  const handleClick = icon => {
    icon.action();
  };

  return (
    <>
      {/* <Hidden smUp>
        { getMobileNavbar() }
      </Hidden> */}

      <Hidden xsDown>{getDeskptopNavbar()}</Hidden>
    </>
  );
}

export default withRouter(Navbar);
