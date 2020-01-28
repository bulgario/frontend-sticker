import React from "react";
import Autosuggest from "react-autosuggest";
import { debounce } from "throttle-debounce";
import { BASE_URL } from "../../consts";
import { Redirect } from "react-router-dom";
import imagesFromProducts from "../../imageUrl";
import Grid from "@material-ui/core/Grid";

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';


import './styles.css';

const axios = require("axios");

export default class AutoComplete extends React.Component {
  state = {
    value: "",
    suggestions: [],
  };

  componentWillMount() {
    this.onSuggestionsFetchRequested = debounce(
      500,
      this.onSuggestionsFetchRequested
    );
  }

  getProduct = (value) => {
    this.state.suggestions.map(products => {
      if(value === products.produto) {
        //  ESTADO SO ESTA SENDO SELECIONADO APOS A SEGUNDA CHAMADA DO ITEM, NA PRIMEIRA, ELE NAO SALVA O ESTADO, PORQUE????
        this.setState({ selectedOption: products })
      }
    })
  }

  renderSuggestion = suggestion => {
    return (
      <Grid item xs={12}>
        <Grid container direction="column" justify="center" alignItems="center">  
            <img src={suggestion.previewImage}></img>
          <div className="product">{suggestion.produto}</div>
          <div className="shortCode" onClick={() => this.getProduct(suggestion.produto)}>{suggestion.desc_produto}</div>
        </Grid>
      </Grid>
    );
  };

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    try {
      axios
        .post(`${BASE_URL}/products/search_product`, {
          desc_produto: value
        })
        .then(resp => {
          resp.data.map(product => {
            const previewImage = imagesFromProducts(60, 60, product.produto, product.cor_produto)
            product.previewImage = previewImage
          })
          const results = resp.data
     			this.setState({ suggestions: results })
        });
    } catch (error) {
      return error;
    }
  };

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  shouldRenderSuggestions = (value) => {
    return value.trim().length > 2;
  }

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Buscar Produtos",
      value,
      onChange: this.onChange
    };

    // if(this.state.suggestions.length > 0) {
    //   return (
    //     <Redirect from={"/home"} to={"/produto"} />
    //   )
    // }
    
    return (
      <div className="App">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.selectedfoo}
          getSuggestionValue={suggestion => suggestion.desc_produto}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          shouldRenderSuggestions={(value) => this.shouldRenderSuggestions(value)}
        />
      </div>
    );
  }
}
