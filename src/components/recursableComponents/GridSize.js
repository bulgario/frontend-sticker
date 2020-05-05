import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Tooltip from '@material-ui/core/Tooltip';
import AppsIcon from '@material-ui/icons/Apps';

const styles = theme => ({
  icon: {
    cursor: 'pointer'
  },
  position: {
    paddingTop: theme.spacing(0.6)
  }
});

function GridSize(props) {
  const { classes } = props;
  const [gridValue, setGridValue] = useState(null)

  useEffect(() => {
    const { dispatch } = props

    dispatch({
      type: 'GRID_ITEMS_SIZE',
      gridValue,
    })
  }, [gridValue]) //eslint-disable-line

  return (
    <Fragment>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        xs={4}
      >
        <Grid item>
          <Tooltip title="4 items" placement="top">
            <AppsIcon
              className={classes.icon}
              id={1}
              onClick={() => setGridValue(15)}
            />
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="2 items" placement="top">
            <AppsIcon
              className={classes.icon}
              id={2}
              onClick={() => setGridValue(6)}
            />
          </Tooltip>
        </Grid>

      </Grid>
    </Fragment>
  )
}


const wrapperComponent = withStyles(styles)(
  withSnackbar(withRouter(GridSize))
);

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(wrapperComponent);