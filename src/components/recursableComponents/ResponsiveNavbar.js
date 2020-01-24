import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import { withRouter } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import User from "../../services/User";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import ListIcon from "./ListIcon";
import { ROUTES } from "../../consts";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

function ResponsiveNavbar(props) {
  const user = new User();

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
    props.openMenu()
  };

  const matchRoute = (urlTested, matcher) => {
    const urlSplitted = urlTested.split("/");
    const matchSplitted = matcher.split("/");
    return urlSplitted[1] === matchSplitted[1];
  };
  const menuIcons = [
    {
      name: "check",
      text: "Recebimento",
      action: () => redirect(ROUTES.HOME),
      show: user.canAcessThisRoute(ROUTES.HOME),
      route: ROUTES.HOME
    },
    {
      name: "shopping-cart",
      text: "Venda",
      action: () => redirect(ROUTES.HOME),
      show: user.canAcessThisRoute(ROUTES.HOME),
      route: ROUTES.INSTA
    },
    {
      name: "note",
      text: "Meus relatórios",
      action: () => redirect(ROUTES.HOME),
      show: user.canAcessThisRoute(ROUTES.HOME),
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
  function redirect(url) {
    props.history.push(url);
  }
  const handleClick = icon => {
    icon.action();
  };
  function getIndexInitialSelectedMenu(menuIcons) {
    const urlNow = props.location.pathname;
    return menuIcons.findIndex(menu => {
      if (menu.hasOwnProperty("route")) {
        return matchRoute(menu.route, urlNow);
      }
      return false;
    });
  }

  const renderUserInfo = () => {
    const user = new User();
    return (
      <Grid container flex="column" className={classes.userInfoContainer}>
        <AccountCircle fontSize={"large"} color="primary"></AccountCircle>
        <br />
        <br />

        <Typography
          align="justify"
          gutterBottom
          variant="h6"
          component="h2"
          className={classes.login}
        >
          {user.getLogin()}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.email}
        >
          {user.getEmail()}
        </Typography>
      </Grid>
    );
  };


  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
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
    </div>
  );


  return (
    <div>

      <SwipeableDrawer
      disableBackdropTransition={!iOS} disableDiscovery={iOS}
        open={props.open}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {sideList("left")}
      </SwipeableDrawer>
    </div>
  );
}
export default withRouter(ResponsiveNavbar);

