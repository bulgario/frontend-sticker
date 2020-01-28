import React from "react";
import Autosuggest from "react-autosuggest";
import { debounce } from "throttle-debounce";
import { BASE_URL } from "../../consts";
import { Redirect } from "react-router-dom";
import imagesFromProducts from "../../imageUrl";
import Grid from "@material-ui/core/Grid";


import './styles.css';

const axios = require("axios");

export default class AutoComplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      suggestions: [],
      redirect: false
    };
  }
  
  componentDidMount() {
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
        this.setState({ redirect: true })
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
    const { value, suggestions, redirect } = this.state;
    const inputProps = {
      placeholder: "Buscar Produtos",
      value,
      onChange: this.onChange
    };

    if(redirect) {
      console.log("entro")
      return (
        <Redirect to={'/produto'} />
      )
    }
    
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
