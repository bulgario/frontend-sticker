import React, { Fragment } from "react";
import Header from "./recursableComponents/Header";
import DatePicker from "./recursableComponents/DatePicker";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withRouter } from "react-router-dom";


import InputLabel from "@material-ui/core/InputLabel";

import { withSnackbar } from "notistack";

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
    padding: theme.spacing(1.5)
  },
  select: {
    width: 160,
    marginLeft: theme.spacing(0.6),
    marginRight: theme.spacing(0.6)
  }
});
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      subcategories: [],
      nome_collection: [],
      data_inicio: "",
      data_fim: "",
      data_ultimo: "",
      anchorEl: null,
      choosedCategory: "",
      choosedSubCategory: "",
      choosedNameCollection: ""
    };
  }

  async componentDidMount() {
    const filterData = array => {
      return array.filter((item, index) => array.indexOf(item) === index);
    };

    const filterCollection = collection => {
      let allCollections = [].concat(...collection);
      return allCollections.filter(
        (item, index) => allCollections.indexOf(item) === index
      );
    };

    const categories = [];
    const subcategories = [];
    const nome_colecao = [];
    const response = await axios.get("http://localhost:8000/products/listAllProducts");
    let { data } = response;
    data.map(data => {
      categories.push(data.value.categoria);
      subcategories.push(data.value.subcategoria);
      nome_colecao.push(data.value.nome_colecao);
    });

    let newNameCollection = filterCollection(nome_colecao);
    let newCategories = filterData(categories);
    let newSubcategories = filterData(subcategories);
    this.setState({
      category: newCategories,
      subcategories: newSubcategories,
      nome_collection: newNameCollection
    });
  }

  getData = (dataInicio, dataFim, dataUltimo) => {
    this.setState({ data_inicio: dataInicio });
    this.setState({ data_fim: dataFim });
    this.setState({ data_ultimo: dataUltimo });
  };

  validateRequest = () => {
    const { data_inicio, data_fim, data_ultimo } = this.state;
    if (!data_inicio) {
      //   this.props.enqueueSnackbar("Selecione uma data início", {
      //     variant: "error"
      //   });
      return false;
    }
    if (!data_fim) {
      //   this.props.enqueueSnackbar("Selecione uma data fim", {
      //     variant: "error"
      //   });
      return false;
    }
    if (!data_ultimo) {
      //   this.props.enqueueSnackbar("Selecione a data do último agendamento", {
      //     variant: "error"
      //   });
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
        ).toISOString()}&dataUltimoAgendamento=${new Date(
          this.state.data_ultimo
        ).toISOString()}&categoria=${this.state.choosedCategory}&subcategoria=${
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
    const { data_inicio, data_ultimo, data_fim } = this.state;
    if (data_fim && data_inicio && data_ultimo) {
      return (
        <Grid container justify="center">
          <div>
            <InputLabel id="label-category">Categoria</InputLabel>

            <Select
              labelId="label-category"
              id="demo-simple-select-outlined"
              value={this.state.choosedCategory}
              onChange={e => {
                console.log(e.target.value);
                this.setState({ choosedCategory: e.target.value });
              }}
              labelWidth={100}
              label="Categoria"
              variant="outlined"
              className={this.props.classes.select}
            >
              {this.state.category.map(categorias => {
                return (
                  <MenuItem key={categorias} value={categorias}>
                    {categorias}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <div>
            <InputLabel id="label-subcategory">Subcategoria</InputLabel>
            <Select
              labelId="label-subcategory"
              id="demo-simple-select-outlined"
              value={this.state.choosedSubCategory}
              onChange={e => {
                console.log(e.target.value);

                this.setState({ choosedSubCategory: e.target.value });
              }}
              labelWidth={100}
              label="Subcategoria"
              variant="outlined"
              className={this.props.classes.select}
            >
              {this.state.subcategories.map(subcategoria => {
                return (
                  <MenuItem key={subcategoria} value={subcategoria}>
                    {subcategoria}
                  </MenuItem>
                );
              })}
            </Select>
            {/* </Menu> */}
          </div>
          <div>
            <InputLabel id="label-subcategory">Colecao</InputLabel>
            <Select
              labelId="label-subcategory"
              id="demo-simple-select-outlined"
              value={this.state.choosedNameCollection}
              onChange={e => {
                console.log(e.target.value);

                this.setState({ choosedNameCollection: e.target.value });
              }}
              labelWidth={100}
              label="choosedNameCollection"
              variant="outlined"
              className={this.props.classes.select}
            >
              {this.state.nome_collection.map(collection => {
                return (
                  <MenuItem key={collection} value={collection}>
                    {collection}
                  </MenuItem>
                );
              })}
            </Select>
            {/* </Menu> */}
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
      );
    }

    return null;
  }
  render(props) {
    const { classes } = this.props;
    return (
      <Fragment>
        <Grid>
          <Header insta={true} />
        </Grid>
        <Grid container justify="center">
          <DatePicker choosedData={this.getData} />
        </Grid>
        {this.renderInputs()}
      </Fragment>
    );
  }
}
const wrapperComponent = withStyles(styles)(withSnackbar(withRouter(Search)));
export default wrapperComponent;
