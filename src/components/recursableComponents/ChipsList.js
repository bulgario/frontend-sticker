import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  },
  blackButton: {
    color: 'black'
  }
}));

export default function OutlinedChips(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        item
      >
        <Grid item onClick={props.showModalReports}>
          {props.reportsIds.length >= 1 ? (
                        <Fab
                        color="primary"
                        aria-label="add"
                        className={classes.fabButton}
                        onClick={props.onClick}
                        size="small"
                      >
                        <AddIcon className={classes.blackButton} />
                      </Fab>
          ) : (
            <Chip
              label={"Adicionar relatórios"}
              clickable
              avatar={<Avatar>+</Avatar>}
              color="primary"
              variant="outlined"
            />
          )}
        </Grid>
        {props.reports.map((report, index) => {
          if (props.reportsIds.includes(report.id)) {
            return (
              <Grid item>
                <Chip
                  label={report.nome_relatorio}
                  onDelete={props.removeChips(report)}
                  color="primary"
                  variant="outlined"
                />
              </Grid>
            );
          }
          return null;
        })}
      </Grid>
    </div>
  );
}