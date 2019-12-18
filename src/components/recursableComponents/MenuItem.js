import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const axios = require('axios')

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [category, setCategory] = React.useState([]);
  const [subcategory, setSubcategory] = React.useState([]);
  const [nameCollection, setNameCollection] = React.useState([]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const filterData = (array) => {
			return array.filter((item, index) => array.indexOf(item) === index)
		}

    const categories = []
		const subcategories = []
		const nome_colecao = []
    axios.get('http://localhost:8000/allproducts').then(elem => {
				let data = elem.data.body.hits.hits
				data.map((data) => {
					categories.push(data._source.categoria)
					subcategories.push(data._source.subcategoria)
					nome_colecao.push(data._source.nome_colecao)
				})
      }).then(async () => {
				let newCategories = await filterData(categories)
        let newSubcategorie = await filterData(subcategories)
				// setCategory(newCategories)
				// setSubcategory(newSubcategorie)
        // setNameCollection(nome_colecao)
			})
  },[])



  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Categoria
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

