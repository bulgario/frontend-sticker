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
  const [selectedDateInicio, setSelectedDateInicio] = React.useState(new Date('2019-08-18'));
  const [selectedDateFim, setSelectedDateFim] = React.useState(new Date('2019-08-18'));
  const [selectedDateUltimo, setSelectedDateUltimo] = React.useState(new Date('2019-08-18'));

  const handleDataInicioChange = (date) => {
    setSelectedDateInicio(date)
    props.choosedData(selectedDateInicio, selectedDateFim, selectedDateUltimo)
  }

  const handleDataFimChange = (date) => {
    setSelectedDateFim(date)
    props.choosedData(selectedDateInicio, selectedDateFim, selectedDateUltimo)
  }

  const handleDateUltimoAgendamento = (date) => {
    setSelectedDateUltimo(date)
    props.choosedData(selectedDateInicio, selectedDateFim, selectedDateUltimo)
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
          label={"inicio"}
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
          label={"fim"}
          value={selectedDateInicio}
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
          label={"Ultima data Agendamento"}
          value={selectedDateInicio}
          onChange={handleDateUltimoAgendamento}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}