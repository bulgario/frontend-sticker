import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function OutlinedChips(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Grid container direction="row" justify="center" alignItems="center "spacing={1} item >  
        
        {props.reports.map((report,index) => {
          if(props.reportsIds.includes(report.id)) {
            return (  <Grid item  ><Chip label={report.nome_relatorio} onDelete={  props.removeChips(report)} color="primary" variant="outlined" /></Grid>  
            )
          }
          return null
        })}
        </Grid>

    </div>
  );
}