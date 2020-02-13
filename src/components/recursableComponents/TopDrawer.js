import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { withRouter } from "react-router-dom";

import AutoComplete from "./AutoComplete"
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    height: 'auto',
    
  },
  close: {
    flexGrow: 1,
    height: 0
  },
  padding: theme.spacing(2),

}));

function TopDrawer(props) {
  const  classes  = useStyles()
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

  return (
    <div className={classes.root}>

      <SwipeableDrawer
      disableBackdropTransition={!iOS} disableDiscovery={iOS}
        open={props.open}
        onClose={toggleDrawer("top", false)}
        onOpen={toggleDrawer("top", true)}
        anchor="top"
        className={classes.padding}
        
      >
                    <AutoComplete/>
      </SwipeableDrawer>
     </div>
  );
}
export default withRouter(TopDrawer);

