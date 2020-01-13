import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
  const [selectedDateInicio, setSelectedDateInicio] = React.useState(null);
  const [selectedDateFim, setSelectedDateFim] = React.useState(null);
  const [selectedDateUltimo, setSelectedDateUltimo] = React.useState(null);

  const handleDataInicioChange = (date) => {
    setSelectedDateInicio(date)
    props.choosedData(date, selectedDateFim, selectedDateUltimo)
  }

  const handleDataFimChange = (date) => {
    setSelectedDateFim(date)
    props.choosedData(selectedDateInicio, date, selectedDateUltimo)
  }

  const handleDateUltimoAgendamento = (date) => {
    setSelectedDateUltimo(date)
    props.choosedData(selectedDateInicio, selectedDateFim, date)
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