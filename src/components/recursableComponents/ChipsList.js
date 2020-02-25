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
        
        {props.reportsNames.map((nome_relatorio,index) => {
            return (  <Grid item  ><Chip label={nome_relatorio} onDelete={  props.removeChips(index)} color="primary" variant="outlined" /></Grid>  
            )
        })}
        </Grid>

    </div>
  );
}