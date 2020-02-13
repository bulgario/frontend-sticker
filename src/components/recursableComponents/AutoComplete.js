// import 'isomorphic-fetch';
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BASE_URL } from "../../consts";

import UTILS from "../../imageUrl";


import { withRouter } from "react-router-dom";


import axios from "axios";
import { Typography,Grid } from "@material-ui/core";

 function ProdutoAutoComplete(props) {

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);


  const fetchUrl = async ({ target }) => {
    setLoading(true);
    const response = await axios.get(
      `${BASE_URL}/products/search_product?desc_produto=${target.value}`
    );
    setLoading(false);

    setOptions(response.data);
  };

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
      <Grid container direction="row" sm={12} xs={12} justify="space-between" alignItems="space-between" onClick={() => props.history.push(`/produto?produto=${option.id}`)}>
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
    <Autocomplete
    noOptionsText="Nenhum produto foi encontrado"
    loadingText="Buscando produtos..."
      inputvalue={value}
      onChange={onTagsChange}
      id="asynchronous-demo"
      style={{ width: "97%", marginTop: 5, marginLeft: 5, marginBottom: 7 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
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
      renderInput={params => (
        <TextField
        placeholder="Descrição do produto"
          onChange={e => {
            fetchUrl(e);
          }}
          {...params}
          // label="Buscar produtos"
          fullWidth
          variant="outlined"
          InputProps={{
            ...params.InputProps,
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
  );
}

export default withRouter(ProdutoAutoComplete);

