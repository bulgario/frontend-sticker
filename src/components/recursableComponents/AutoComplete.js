// import 'isomorphic-fetch';
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BASE_URL } from "../../consts";
import User from "../../services/User"

import UTILS from "../../imageUrl";

import Button from '@material-ui/core/Button';

import { withRouter } from "react-router-dom";


import axios from "axios";
import { Typography,Grid } from "@material-ui/core";
import {makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  list: {
    width: 280
  },
  fullList: {
    width: "auto"
  },
  root: {
padding: theme.spacing(0.6),

  },
  popper: {
    backgroundColor:'transparent',

  },  paper: {
    backgroundColor:'white',
    borderRadius: 0,
    marginRight: theme.spacing(-0.2),
    marginLeft: theme.spacing(-1.1),
    [theme.breakpoints.up("md")]: {
      marginRight: theme.spacing(-4.5),
    }


  },
  paper2: {
    backgroundColor:'white',
    borderRadius: 0,
    marginRight: theme.spacing(-1.4),
    marginLeft: theme.spacing(-1.1),
    [theme.breakpoints.up("md")]: {
      marginRight: theme.spacing(-5.5),
    }


  },
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  },
  mainLabel: {
    margin: theme.spacing(1)
  },
  button: {
    color: "white",
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  selectAll: {
    marginRight: theme.spacing(2)
  }
}));

 function ProdutoAutoComplete(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [valueInput, getValueInput] = React.useState("");

  const getAllProductsBasedInInput = () => {
    const user = new User();
    const id_marca_estilo = user.user.id_marca_estilo;
    return props.history.push(`/produtos?desc_produto=${valueInput}&id_marca_estilo=${id_marca_estilo}`)
  }

  const fetchUrl = async ({ target }) => {
    setLoading(true);
    const response = await axios.get(
      `${BASE_URL}/products/search_product?desc_produto=${target.value}`
    );
    setLoading(false);
    setOptions(response.data);
  };

  let event;
  const debouce = async ({ target }) => {
    getValueInput(target.value)
    clearTimeout(event);
    event = setTimeout(()=>fetchUrl({target}), 500);
  }

  const onTagsChange = async (event, value) => {
    setValue(value);
  };

  const renderOption = option => {

    const previewImage = UTILS.imagesFromProducts(
      40,
      40,
      option.produto,
      option.cor_produto
    );
    return (
      <Grid  container direction="row" sm={12} xs={12} justify="space-between" alignItems="space-between" onClick={() => props.history.push(`/produto?produto=${option.id}`)}>
        <Grid container item direction="column" sm={9} xs={9} md={3} lg={3} >
        <Grid container item direction="row" justify="space-between" alignItems="center">
        <Typography color="textSecondary"  variant="subtitle2">{UTILS.formatToMaxCaractersAllowed(option.desc_produto,20)}</Typography>
        <Typography variant="h6">{option.produto}</Typography>
          </Grid>

          <Grid container item direction="row" justify="space-between" alignItems="center">
          <Typography color="textSecondary"  variant="body" >{UTILS.formatToMaxCaractersAllowed(option.desc_cor,20)}</Typography>

          <Typography variant="h6" >{UTILS.formatToMaxCaractersAllowed(option.cor_produto,20)}</Typography>
          </Grid>



        </Grid>
        <Grid container justify="center" item  sm={3} xs={3}>
        {option.nome_arquivo?        <img
        style={{width: 50,height:50}}
        src={previewImage}
        alt="imagem"></img> : null}
        </Grid>

      </Grid>
    );
  };
  return (
    <div style={{backgroundColor:'white'}}>
      <Button onClick={getAllProductsBasedInInput}>Buscar</Button>
    <Autocomplete
    // disablePortal={true}
    noOptionsText="Nenhum produto foi encontrado"
    loadingText="Buscando produtos..."
      inputvalue={value}
      onChange={onTagsChange}
      id="asynchronous-demo"
      style={{ width: "97%", marginTop: 5, marginLeft: 5, marginBottom: 7, border:"solid 0 white" }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      // popupIcon={}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => {
        return option.desc_produto === value.desc_produto;
      }}
      renderOption={option => renderOption(option)}
      getOptionLabel={option => option.desc_produto}
      options={options}
      loading={loading}
      classes={props.relatorioPage?
        {
          popper: classes.popper, 
          paper: classes.paper2,
          root: classes.root,
          listbox: classes.listbox,
         
        }: {
          popper: classes.popper, 
          paper: classes.paper,
          root: classes.root,
          listbox: classes.listbox,
         
        }}
      renderInput={params => (
        <TextField
        disableUnderline={true}
        inputStyle={{borderWidth: 0,backgroundColor:'green'}}
        placeholder="Descrição do produto"
          onChange={e => {
            debouce(e);
          }}
          {...params}
          // label="Buscar produtos"
          fullWidth
          // variant="outlined"
          InputProps={{
            ...params.InputProps, classes,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
        </div>

  );
}

export default withRouter(ProdutoAutoComplete);