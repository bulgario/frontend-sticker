import React, { Fragment } from "react";
import Header from "../components/recursableComponents/Header";
import DatePicker from "../components/recursableComponents/DatePicker";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { withRouter } from "react-router-dom";

import InputLabel from "@material-ui/core/InputLabel";

import { withSnackbar } from "notistack";
import { BASE_URL } from "../consts";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";

const axios = require("axios");

const styles = theme => ({
  root: {
    margin: theme.spacing(1),
    height: 100,
    width: "100%",
    position: "relative"
  },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(1.5),
    color:'white'
  },
  select: {
    width: 160,
  },
  whiteButton: {
    color: "white",
    sizeSmall: "100px"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      subcategories: [],
      nome_collection: [],
      collections: [],
      data_inicio: "",
      data_fim: "",
      data_ultimo: "",
      anchorEl: null,
      choosedNameCollection: "",
      id_marca_user: "",
      marca_user: "",
      checked: true
    };
  }

  async componentDidMount() {
    const filterData = array => {
      return array.filter((item, index) => array.indexOf(item) === index);
    };

    const categories = [];
    const subcategories = [];
    const nome_colecao = [];
    const response = await axios.get(`${BASE_URL}/products/listAllProducts`);
    const { data } = response;
    const { id_marca, marca } = data[1].value;

    data.map(data => { //eslint-disable-line
      categories.push(data.value.categoria);
      subcategories.push(data.value.subcategoria);
      nome_colecao.push(data.value.nome_colecao);
    });

    let newCategories = filterData(categories);
    let newSubcategories = filterData(subcategories);
    this.setState({
      category: newCategories,
      subcategories: newSubcategories,
    });
    this.setState({ id_marca_user: id_marca });
    this.setState({ marca_user: marca });
  }

  getData = (dataInicio, dataFim, dataUltimo) => {
    this.setState({ data_inicio: dataInicio });
    this.setState({ data_fim: dataFim });
    this.setState({ data_ultimo: dataUltimo });
  };

  getCollections = (collection) => {
    this.setState({ nome_collection: collection })
  }

  validateRequest = () => {
    const { data_inicio, data_fim, data_ultimo, choosedNameCollection } = this.state;
    if (!data_inicio) {
      return false;
    }
    if (!data_fim) {
      return false;
    }
    if (!data_ultimo) {
      return false;
    }
    if (!choosedNameCollection) {
      return false;
    }

    return true;
  };

  handleData = async () => {
    // adicionar validações
    if (this.validateRequest()) {
      return this.props.history.push(
        `/insta?dataInicio=${new Date(
          this.state.data_inicio
        ).toISOString()}&dataFim=${new Date(
          this.state.data_fim
        ).toISOString()}&entregaAjustada=${
        this.state.data_ultimo
        }&categoria=${this.state.choosedCategory}&subcategoria=${
        this.state.choosedSubCategory
        }&colecao=${this.state.choosedNameCollection}`
      );
    } else {
      this.props.enqueueSnackbar("Todos os campos precisam estar preenchidos", {
        variant: "error"
      });
    }
  };

  handleClose = event => {
    this.setState({ anchorEl: null });
    this.setState({ showCategoryList: false, showSubCategoryList: false });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  renderInputs() {
    const { classes } = this.props;
    return (
      <Grid container justify="center">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Coleção</InputLabel>
          <Select
            className={classes.select}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={this.state.choosedNameCollection}
            onChange={e => {
              this.setState({ choosedNameCollection: e.target.value });
            }}
            label="Coleção"
          >
            {this.state.nome_collection.map(collection => {
              return (
                <MenuItem key={collection} value={collection}>
                  {collection}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Grid container item justify="center">
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
    );
  }
  render(props) {
    const { classes } = this.props
    return (
      <Fragment>
        <Grid>
          <Header
            title="Programação"
            rightIcon={null}
            leftIcon={
              <IconButton
                aria-label="upload picture"
                component="span"
                className={classes.whiteButton}
                onClick={() => this.props.history.goBack()}>
                <ArrowBack></ArrowBack>
              </IconButton>
            }
          />
        </Grid>
        <Grid container justify="center">
          <DatePicker
            choosedData={this.getData}
            choosedCollection={this.getCollections}
          />
        </Grid>
        <br></br>
        {this.renderInputs()}
      </Fragment>
    );
  }
}
const wrapperComponent = withStyles(styles)(withSnackbar(withRouter(Search)));
export default wrapperComponent;
