import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { date } from '../../actions'

import 'date-fns'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

const DatePicker = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date('2019-08-18T21:11:54'))

  const handleDateChange = data => {
    setSelectedDate({
      ...data

    })
    console.log("vvvv",data)
  }

  console.log(selectedDate)

  return (
    <Fragment>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
      <h2 container justify="space-around">{props.titleDate}</h2>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label={props.label}
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  date: state.date.selectedDate
})

const mapDispatchToProps = dispatch => {

}


export default connect(mapStateToProps, mapDispatchToProps)(DatePicker)
