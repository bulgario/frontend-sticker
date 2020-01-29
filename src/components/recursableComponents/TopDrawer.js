import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { withRouter } from "react-router-dom";

import AutoComplete from "./SearchAutoComplete"



function TopDrawer(props) {
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
    <div>

      <SwipeableDrawer
      disableBackdropTransition={!iOS} disableDiscovery={iOS}
        open={props.open}
        onClose={toggleDrawer("top", false)}
        onOpen={toggleDrawer("top", true)}
        anchor="top"
      >
        <AutoComplete></AutoComplete>
      </SwipeableDrawer>
    </div>
  );
}
export default withRouter(TopDrawer);

