import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Typography } from '@material-ui/core';
import {BASE_URL} from '../../consts';
import { withSnackbar } from "notistack";
import { withStyles } from "@material-ui/core/styles";

const axios = require("axios");

const styles = theme => ({
  title: {
    paddingTop: "25px",
    paddingBottom: "18px",
  },
    leftBarLabel: { 
    backgroundColor: "#FCB92C",
    width:5,
    // height:'100%',
    marginRight:theme.spacing(4),
    position: 'absolute',
    height: '62px',
    left: '0px'
  },
  labelWrapper: { 
    marginLeft: theme.spacing(-8),
    marginBottom: theme.spacing(3)
  }
});

const MaterialUIPickers = props =>  {
  const [selectedDateInicio, setSelectedDateInicio] = React.useState(null);
  const [selectedDateFim, setSelectedDateFim] = React.useState(null);
  const [selectedDateUltimo, setSelectedDateUltimo] = React.useState(null);

  const handleDataInicioChange = (date) => {
    setSelectedDateInicio(date)
    props.choosedData(date, selectedDateFim, selectedDateUltimo)
    getCollection(date, selectedDateFim, selectedDateUltimo)
  }

  const handleDataFimChange = (date) => {
    setSelectedDateFim(date)
    props.choosedData(selectedDateInicio, date, selectedDateUltimo)
    getCollection(selectedDateInicio, date, selectedDateUltimo)
  }

  const handleDateUltimoAgendamento = (date) => {
    setSelectedDateUltimo(date)
    props.choosedData(selectedDateInicio, selectedDateFim, date)
    getCollection(selectedDateInicio, selectedDateFim, date)
  }

  const getCollection = async (selectedDateInicio,selectedDateFim) => {
    if(selectedDateInicio !== null && selectedDateFim !== null) {
      try {
        const response = await axios.get(`${BASE_URL}collections/getCollectionBasedInData`, {
          params: getDatasForCollection(selectedDateInicio,selectedDateFim)
        }); 
        const collection = response.data
        if(collection.length < 1) {
          return props.enqueueSnackbar(
            "Não há produtos programados para essas datas ",
            { variant: "warning" }
          );
        }
        console.log(collection)
        props.choosedCollection(collection)

      } catch (error) {
        return props.enqueueSnackbar(
          "Problemas para buscar coleções",
          { variant: "warning" }
        );

      }
    }
  }

  const getDatasForCollection = (selectedDateInicio,selectedDateFim) => {
    const dataInicio = selectedDateInicio
    const dataFim = selectedDateFim
    return {
      dataInicio,
      dataFim
    }
  }
  const { classes } = props;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
      <div className={classes.title}>
      <Grid  className={classes.labelWrapper} container item justify="flex-start" direction="row" alignItems="center">
      <div className={classes.leftBarLabel}></div>
        <Typography variant="h4" component="h5">Data de Programação</Typography>
        <Grid item ></Grid>
      </Grid>
      </div>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar  
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          id="date-picker-inline"
          label={"Início"}
          value={selectedDateInicio}
          onChange={handleDataInicioChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar  
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          id="date-picker-inline"
          label={"Fim"}
          value={selectedDateFim}
          onChange={handleDataFimChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      </Grid>
      <Grid container justify="space-around">
      <div className={classes.title}>
      <Grid  className={classes.labelWrapper} container item justify="flex-start" direction="row" alignItems="center">
      <div className={classes.leftBarLabel}></div>
        <Typography variant="h4" component="h5">Limite de Recebimento</Typography>
        <Grid item ></Grid>
      </Grid>
      </div>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar  
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          id="date-picker-inline"
          label={"Ínicio"}
          value={selectedDateUltimo}
          onChange={handleDateUltimoAgendamento}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

const wrapperComponent = withStyles(styles)(withSnackbar(MaterialUIPickers));
export default wrapperComponent;