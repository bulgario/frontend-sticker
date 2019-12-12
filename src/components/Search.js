import React, { Fragment } from 'react'
import BoxCompany from './recursableComponents/BoxCompany'
import DatePicker from './recursableComponents/DatePicker'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import MenuList from './recursableComponents/MenuList'
import { withStyles } from '@material-ui/core/styles'

const axios = require('axios')

const styles = theme => ({
	root: {
		margin: theme.spacing(1),
		height: 100,
		width: '100%',
		position: 'relative'
	},
	button: {
		margin: theme.spacing(1),
		display:'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    width: 100
	}
})

const handleMenuBrandClose = value => { }

const getData = async (dataInicio, dataFim, dataUltimo) => {
	await axios.post('http://localhost:8000/produto/data', {
		dataInicio: dataInicio,
		dataFim: dataFim,
		dataUltimoAgendamento: dataUltimo
	})
}


class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
			category: [],
			subcategory: [],
    }
	} 

	componentDidMount() {
		const getCategories = async () => {
			const categories = []
				await axios.get('http://localhost:8000/produto/category/categoria').then(data => {
					data.data.data.forEach(elem => {
						categories.push(elem._source.categoria)
					});
				})
				const data = await filterData(categories)		
				this.setState({ category: data })
		}

		const getSubcategories = async () => {
			const subcategories = []
				await axios.get('http://localhost:8000/produto/category/subcategoria').then(data => {
					data.data.data.forEach(elem => {
						subcategories.push(elem._source.subcategoria)
					});
				})
				const data = await filterData(subcategories)		
				this.setState({ subcategory: data })
		}
		
		const filterData = (array) => {
			let data = array.filter((item, index) => array.indexOf(item) === index)
			return data
		}

		getCategories()
		getSubcategories()
	}

  render(props) {
		const { classes } = this.props;
		const location = [
			{id: 0, label: "New York", selected: false, key: 'location', checked: true},
			{id: 1, label: "New York", selected: false, key: 'location', checked: true},
			{id: 2, label: "New York", selected: false, key: 'location', checked: true},
		]
		
    return (
      <Fragment>
			<Grid>
			<BoxCompany insta={true} />
			</Grid>
			<Grid container justify="center">
				<DatePicker
					choosedData={getData}
				/>
			</Grid>
			<Grid container justify="center">
				<MenuList
					title={'Coleção'}
					list={this.state.category}
					onClose={handleMenuBrandClose}
					
				/>
				{/* <MenuList
					title={'Categoria'}
					list={this.state.category}
					onClose={this.handleMenuBrandClose}
				/>
				<MenuList
					title={'Subcategoria'}
					list={this.state.location}
					onClose={this.handleMenuBrandClose}
				/> */}
				<Grid container justify="center">
					<Button
						className={classes.button}
						variant="contained"
						color="primary"
					// className={classes.margin}
					>
						Buscar
			</Button>
				</Grid>
			</Grid>
		</Fragment>
    )
  }
}

export default withStyles(styles)(Search)