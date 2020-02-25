import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';

// import CommentIcon from '@material-ui/icons/Comment';
// import ShuffleIcon from '@material-ui/icons/Shuffle';

import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor:'white'
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  whiteButton: {
    color:"white"
  }
}));

export default function BottomAppBar(props) {
  const classes = useStyles();

  return (
        <React.Fragment>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="open drawer">
            <CommentIcon />
          </IconButton>
          <Typography variant="body2" component="h6">RESUMO</Typography> */}
          <Fab color="primary" aria-label="add" className={classes.fabButton} onClick={props.onClick}>
            <AddIcon  className={classes.whiteButton} />
          </Fab>
          <div className={classes.grow} />
          {/* <IconButton edge="start" color="inherit" aria-label="open drawer">
            <ShuffleIcon />
          </IconButton>
          <Typography variant="body2" component="h6">AGRUPAR</Typography> */}
        </Toolbar>
      </AppBar>
        </React.Fragment>
    
  );
}