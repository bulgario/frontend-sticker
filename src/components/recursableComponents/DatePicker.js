import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import {BASE_URL} from '../../consts';

import { withSnackbar } from "notistack";

const axios = require("axios");

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
        const response = await axios.get(`${BASE_URL}/collections/getCollectionBasedInData`, {
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

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar  
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          id="date-picker-inline"
          label={"Última data agendamento"}
          value={selectedDateUltimo}
          onChange={handleDateUltimoAgendamento}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default withSnackbar(MaterialUIPickers);
