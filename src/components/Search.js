import React, { Fragment } from 'react'
import BoxCompany from './recursableComponents/BoxCompany'
import DatePicker from './recursableComponents/DatePicker'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import MenuList from './recursableComponents/MenuList'
import { withStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
			category: [],
			subcategories: [],
			nome_collection: [],
			data_inicio: '',
			data_fim: '',
			data_ultimo: '',
			anchorEl: null,
			choosedCategory: '',
			choosedSubcategory: ''
    }
	}

	componentDidMount() {
		const filterData = (array) => {
			return array.filter((item, index) => array.indexOf(item) === index)
		}

		const categories = []
		const subcategories = []
		const nome_colecao = []
		axios.get('http://localhost:8000/allproducts').then(elem => {
			let data = elem.data
			data.map((data) => {
				categories.push(data.value.categoria)
				subcategories.push(data.value.subcategoria)
				nome_colecao.push(data.value.nome_colecao)
			})
		}).then(async () => {
			let newCategories = await filterData(categories)
			let newSubcategorie = await filterData(subcategories)
			this.setState({ category: newCategories })
			this.setState({ subcategories: newSubcategorie })
			this.setState({ nome_collection: nome_colecao })
		})
	}

	getData = (dataInicio, dataFim, dataUltimo) => {
		this.setState({ data_inicio: dataInicio })
		this.setState({ data_fim: dataFim })
		this.setState({ data_ultimo: dataUltimo })
	}

	handleData = async () => {
		await axios.get('http://localhost:8000/products', { params: { 
			dataInicio: this.state.data_inicio,
			dataFim: this.state.data_fim,
			dataUltimoAgendamento: this.state.data_ultimo,
			category: this.state.choosedCategory,
			subcategory: this.state.choosedSubcategory,
			collection_name: 'V18FYI',
		}})
	}

	handleClose = (event) => {
	this.setState({ anchorEl: null });
	this.setState({showCategoryList: false, showSubCategoryList: false})
	};
	
	handleClick = event => {
		console.log(event.currentTarget)
		if (event.currentTarget.id == 1) {
			this.setState({ showCategoryList:true})
		}
		if (event.currentTarget.id == 2) {
			this.setState({ showSubCategoryList:true})
		}
		this.setState({ anchorEl: event.currentTarget });
	};
	
	handleChoosedData = (data, id) => {
		if(id === 'categoria') {
			this.setState({ choosedCategory: data })
		}
		if(id === 'subcategoria') {
			this.setState({ choosedSubcategory: data })
		}
		this.handleClose()
	}

  render(props) {
		const { classes } = this.props;
    return (
      <Fragment>
			<Grid>
			<BoxCompany insta={true} />
			</Grid>
			<Grid container justify="center">
				<DatePicker
					choosedData={this.getData}
				/>
			</Grid>
			<Grid container justify="center">
			<div>
				<Button aria-controls="category-menu" aria-haspopup="true" onClick={this.handleClick} id='1'>
					Categoria
				</Button>
				<Menu
					id="category-menu"
					anchorEl={this.state.anchorEl}
					keepMounted
					open={this.state.showCategoryList}
					onClose={() => this.setState({showCategoryList : false})}
				>
				{this.state.category.map((categorias) => {
					const id = 'categoria'
					return <MenuItem value={categorias, id} onClick={() => this.handleChoosedData(categorias, id)}>{categorias}</MenuItem>
				})}
				</Menu>
			</div>
		<div>
      <Button aria-controls="subcategory-menu" aria-haspopup="true" onClick={this.handleClick}  id='2'>
        Subcategoria
      </Button>
      <Menu
        id="subcategory-menu"
        anchorEl={this.state.anchorEl}
        keepMounted
		open={this.state.showSubCategoryList}
        onClose={() => this.setState({showSubCategoryList : false})}
      >
      {this.state.subcategories.map((subcategoria) => {
				const id = 'subcategoria'
        return <MenuItem value={subcategoria, id} onClick={() => this.handleChoosedData(subcategoria, id)}>{subcategoria}</MenuItem>
      })}
      </Menu>
    </div>
			<Grid container justify="center">
				<Button
					className={classes.button}
					variant="contained"
					color="primary"
					onClick={this.handleData}
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