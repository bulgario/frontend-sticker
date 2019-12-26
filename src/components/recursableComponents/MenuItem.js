import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const axios = require('axios')

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleCategoria = (categoria) => {
    props.getCategories(categoria)
  }

  const handleSubcategoria = (subcategoria) => {
    props.getSubcategories(subcategoria)
  }

  const handleNameCollection = (nomeCollection) => {
    props.getNameCollection(nomeCollection)
  }

  const { categoria, subcategoria, nome_collection } = props
  return (
    <Fragment>
    <div>
      <Button aria-controls="category-menu" aria-haspopup="true" onClick={handleClick}>
        Categoria
      </Button>
      <Menu
        id="category-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
      {categoria.map((categorias) => {
        return <MenuItem value={categorias} onClick={() => handleCategoria(categorias)}>{categorias}</MenuItem>
      })}
      </Menu>
    </div>
    <div>
     <Button aria-controls="subcategory-menu" aria-haspopup="true" onClick={handleClick}>
        Subcategoria
     </Button>
     <Menu
       id="subcategory-menu"
       anchorEl={anchorEl}
       keepMounted
      //  open={Boolean(anchorEl)}
      //  onClose={handleClose}
     >
       {subcategoria.map((subcategorias) => {
          return <MenuItem value={subcategorias} onClick={() => handleSubcategoria(subcategorias)}>{subcategorias}</MenuItem>
        })}
     </Menu>
   </div>
   <div>
     <Button aria-controls="subcategory-menu" aria-haspopup="true" onClick={handleClick}>
        Colecao
     </Button>
     <Menu
       id="nameCollection-menu"
       anchorEl={anchorEl}
       keepMounted
      //  open={Boolean(anchorEl)}
      //  onClose={handleClose}
     >
       {nome_collection.map((nomeCollection) => {
          return <MenuItem value={nomeCollection} onClick={() => handleSubcategoria(nomeCollection)}>{nomeCollection}</MenuItem>
        })}
     </Menu>
   </div>
  </Fragment>
  );
}

