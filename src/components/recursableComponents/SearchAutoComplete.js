import React from "react";
import Autosuggest from "react-autosuggest";
import { debounce } from "throttle-debounce";
import { BASE_URL } from "../../consts";
import imagesFromProducts from "../../imageUrl";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CardMedia from '@material-ui/core/CardMedia';


import ListItemText from '@material-ui/core/ListItemText';

import "./styles.css";

import withStyles from "@material-ui/core/styles/withStyles";

const axios = require("axios");

const styles = theme => ({
  root: {
    flexGrow: 1,
    // backgroundColor: "red",
    height: 300,
    width: 100
  },
  suggestionItem: {
    height: 50,
    backgroundColor: theme.palette.background.paper,
  },
  image: {
    width: 70,
    height:70
  }
});
class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
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

  getProduct = value => {
    return this.state.suggestions.map(products => {
      if (value === products.produto) {
        this.setState({ selectedOption: products });
        return this.setState({ redirect: true });
      }
      return true;
    });
  };

  renderSuggestion = suggestion => {
    console.log("eu");
    const { classes } = this.props;

    return (
      <Grid
        xs={12}
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.suggestionItem}
      >
        <ListItem>
          <Grid container direction="row" justify="flex-start" alignItems="center">
          <ListItemText
            primary={suggestion.produto}
            secondary={suggestion.desc_produto}
          />
                  {/* <img className={classes.image} alt="produto" src={"https://storage.googleapis.com/soma-web/283805-produto_estilo-283805_1.jpg"} ></img> */}
                  <CardMedia
         className={classes.image}
        image="https://storage.googleapis.com/soma-web/283805-produto_estilo-283805_1.jpg"
        title="Live from space album cover"
      />
                  </Grid>

        </ListItem>
        {/* <div className="product">{suggestion.produto}</div>
        <div
          className="shortCode"
          onClick={() => this.getProduct(suggestion.produto)}
        >
          {suggestion.desc_produto}
        </div> */}
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
            const previewImage = imagesFromProducts(
              60,
              60,
              product.produto,
              product.cor_produto
            );
            return (product.previewImage = previewImage);
          });
          const results = resp.data;
          console.log(results);
          return this.setState({ suggestions: results });
        });
      return;
    } catch (error) {
      return error;
    }
  };

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  shouldRenderSuggestions = value => {
    return value.trim().length > 2;
  };

  handleData = async selectedOption => {
    return this.props.history.push(`/produto?produto=${selectedOption.id}`);
  };

  render() {
    const { value, suggestions, redirect, selectedOption } = this.state;
    const { classes } = this.props;

    const inputProps = {
      placeholder: "Buscar Produtos",
      value,
      onChange: this.onChange,
    };

    if (redirect) {
      this.handleData(selectedOption);
    }
    return (
      <div className={classes.root}>
        <Grid
          xs={12}
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.suggestionItem}
        >
          <List>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              onSuggestionSelected={this.selectedfoo}
              getSuggestionValue={suggestion => suggestion.desc_produto}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
              shouldRenderSuggestions={value =>
                this.shouldRenderSuggestions(value)
              }
            />
          </List>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(AutoComplete));
