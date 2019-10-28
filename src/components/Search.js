import React, { Fragment, useState } from 'react'
import BoxCompany from './recursableComponents/BoxCompany'
import DatePicker from './recursableComponents/DatePicker'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import MenuList from './recursableComponents/MenuList'

const location = [
	{id: 0, label: "New York", selected: false, key: 'location', checked: true},
	{id: 1, label: "New York", selected: false, key: 'location', checked: true},
	{id: 2, label: "New York", selected: false, key: 'location', checked: true},
]

const useStyles = makeStyles(theme => ({
	margin: {
	  margin: theme.spacing(1),
	},
}))
	
const handleMenuBrandClose = value => {}

const Login = (props) => {
	const [date, handleDate] = useState({
		dateBegin: [],
		dateEnd: [],
		dateLimit: [],
	})

	const getDateValue = (data) => {
		handleDate(data)
	}

console.log("aaaa",date)

	const classes = useStyles()
	return(
		<Fragment>
			<Grid>
			<BoxCompany/>
			</Grid>
			<DatePicker
				getDateValue={getDateValue} 
				titleDate={"Data de Programação"}
				label={"inicio"}
			/>
			<DatePicker
				getDateValue={getDateValue} 
				label={"fim"}
			/>		
			<DatePicker 
				titleDate={"Limite de recebimento"}
			/>
			<Grid>
			<MenuList
				title={'Coleção'} 
				list={location} 
				onClose={handleMenuBrandClose}
			/>
			</Grid>
			<Grid>
			<MenuList
				title={'Categoria'} 
				list={location} 
				onClose={handleMenuBrandClose}
				
			/>
			</Grid>
			<Grid>
			<MenuList 
				title={'Subcategoria'} 
				list={location} 
				onClose={handleMenuBrandClose}
			/>
			</Grid>
			<Grid>
			<Button 
				variant="contained"
				color="primary" 
				className={classes.margin}
			>
			Buscar
			</Button>
			</Grid>	
		</Fragment>
	)
}

export default Login