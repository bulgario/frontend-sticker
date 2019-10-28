import React, { Fragment } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

 const Category = (props) => {

  const [category, setCategory] = React.useState('')
  const [open, setOpen] = React.useState(false)

  const handleChange = event => {
    setCategory(event.target.value)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const style = makeStyles({
    formControl: {
      minWidth: 120,
    },
    titleForm: {
      color: '#FFE600',
    },
    titleCenter: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      flexDirection: 'column',
    }
  })

  return (
    <Fragment>
    <div className={style.titleCenter}>
      <h2>{props.name}</h2>
      <form autoComplete="off">
        <FormControl className={style.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select"></InputLabel>
          <Select
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={category}
            onChange={handleChange}
            inputProps={{
              name: 'category',
              id: 'demo-controlled-open-select',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}></MenuItem>
            <MenuItem value={20}></MenuItem>
            <MenuItem value={30}></MenuItem>
          </Select>
        </FormControl>
      </form>
    </div>
    </Fragment>
  )
}

export default Category