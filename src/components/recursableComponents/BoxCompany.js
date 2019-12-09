import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Menu from "@material-ui/icons/Menu";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Share from "@material-ui/icons/Share";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    backgroundColor: "#FFE600",
    boxShadow: "1px 1px 1px 1px"
  },
  header: {
    backgroundColor: "#FFE600",
    color: theme.palette.text.primary,
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  spacing: {
    marginHorizontal: theme.spacing(2)
  }
}));

const BoxCompany = (props) => {
  const classes = useStyles();

  const userData = [
    { id: 1, companyName: "Animale" },
    { id: 2, companyName: "Farm" }
  ];

  const [user] = useState(userData);
  const { insta } = props
  if (insta) {
    return (
      <div className={classes.header}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          {/* <Grid item></Grid> */}
          <ArrowBack> </ArrowBack>
          <Typography variant="h4"> {user[0].companyName} </Typography>

          {/* <Grid item container direction="row" aligmItems="start"> */}
          <Grid item direction="row" spacing={1}>
            <Share/>
            <Menu/>
          </Grid>
          {/* <Grid item></Grid> */}
          {/* </Grid> */}
        </Grid>
      </div>
    );
  }

  return (
    <div>
      <h2 className={classes.root}>{user[0].companyName}</h2>
    </div>
  );
};

export default BoxCompany;
