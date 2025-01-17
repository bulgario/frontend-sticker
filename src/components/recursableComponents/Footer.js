import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  paper: {
    paddingBottom: 50
  },
  list: {
    marginBottom: theme.spacing(2)
  },
  subheader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "white"
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto"
  },
  whiteButton: {
    color: "white"
  }
}));

export default function BottomAppBar(props) {
  const classes = useStyles();
  return (
    <div id="some">
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="open drawer">
            <CommentIcon />
          </IconButton>
          <Typography variant="body2" component="h6">RESUMO</Typography> */}
          {props.hideButton ? null : (
            <Fab
              color="primary"
              aria-label="add"
              className={classes.fabButton}
              onClick={props.onClick}
            >
              <AddIcon className={classes.whiteButton} />
            </Fab>
          )}

          <Grid
            container
            xs={6}
            item
            sm={6}
            alignItems="center"
            justify="flex-start"
            className={classes.paddingRightSmall}
            id="applied"
          >
            {props.leftIconTodos}
          </Grid>

          <Grid
            container
            xs={6}
            item
            sm={6}
            alignItems="center"
            justify="flex-end"
            className={classes.paddingRightSmall}
            id="todos"
          >
            <div className={classes.grow} />

            {props.rightIconTodos}
          </Grid>
          {/* <IconButton edge="start" color="inherit" aria-label="open drawer">
            <ShuffleIcon />
          </IconButton>
          <Typography variant="body2" component="h6">AGRUPAR</Typography> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
