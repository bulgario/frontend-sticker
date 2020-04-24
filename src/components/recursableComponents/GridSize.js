import React, { Fragment,  useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Tooltip from '@material-ui/core/Tooltip';
import AppsIcon from '@material-ui/icons/Apps';
import Divider from '@material-ui/core/Divider';

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
  }, [gridValue])

  return (
    <Fragment>
      <Grid
      item
      xs={1}
      sm={2}
      className={classes.position}
      justify="flex-end"
    >
      <Tooltip title="4 items" placement="top">
        <AppsIcon
          className={classes.icon}
          id={1}
          onClick={() => setGridValue(15)}
        />
      </Tooltip>
      <Tooltip title="2 items" placement="top">
      <AppsIcon
        className={classes.icon}
        id={2}
        onClick={() => setGridValue(6)}
      />
      </Tooltip>
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