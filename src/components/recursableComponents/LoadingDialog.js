import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    padding: '40px 56px',
  }
});

class LoadingDialog extends Component {

  render() {
    const { classes, message, open } = this.props;

    return (
      <Dialog maxWidth={'sm'} open={open}>
        <DialogTitle className={classes.root}>
          <Grid container alignItems={"center"} spacing={3}>
            <Grid item>
              <Typography variant={'body1'}>
                {message}
              </Typography>
            </Grid>
            <Grid item><CircularProgress /></Grid>
          </Grid>
        </DialogTitle>
      </Dialog>
    )}
}

export default withStyles(styles)(LoadingDialog);
