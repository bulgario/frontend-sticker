import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";


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
    backgroundColor: "#FCB92C",
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
  },
  title: {
    color: "white",
    fontSize: '1.5rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.18rem',
      maxWidth: 190,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2rem',
    },
  }
}));

const Header = props => {
  const classes = useStyles();

  return (
    <div className={classes.header} id="some">
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={4}>{props.leftIcon}</Grid>
        <Grid item xs={4}>
          <Typography align="center" variant="h5" component="p" className={classes.title}>{props.title}</Typography>
        </Grid>
        <Grid xs={4}></Grid>

        <Grid item>{props.rightIcon}</Grid>
        {props.rightIconAfter ? <Grid item>{props.rightIconAfter}</Grid> : ""}
      </Grid>
    </div>
  );
};

export default withRouter(Header);
