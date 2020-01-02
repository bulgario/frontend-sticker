import React, { Fragment } from "react";
import BoxCompany from "./recursableComponents/BoxCompany";
import DatePicker from "./recursableComponents/DatePicker";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100
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

  componentDidMount() {
    const filterData = array => {
      return array.filter((item, index) => array.indexOf(item) === index);
    };

    const filterCollection = collection => {
      let allCollections = [].concat(...collection)
      return allCollections.filter((item, index) => allCollections.indexOf(item) === index);
    }

    const categories = [];
    const subcategories = [];
    const nome_colecao = [];
    axios
      .get("http://localhost:8000/allproducts")
      .then(elem => {
        let data = elem.data;
        data.map(data => {
          categories.push(data.value.categoria);
          subcategories.push(data.value.subcategoria);
          nome_colecao.push(data.value.nome_colecao);
        });
      })
      .then(async () => {
        let newNameCollection = await filterCollection(nome_colecao)
        let newCategories = await filterData(categories);
	    	let newSubcategorie = await filterData(subcategories);
        this.setState({ category: newCategories });
        this.setState({ subcategories: newSubcategorie });
        this.setState({ nome_collection: newNameCollection });
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
    try {
      if (this.validateRequest()) {
        const response = await axios.get("http://localhost:8000/products", {
          params: {
            dataInicio: this.state.data_inicio,
            dataFim: this.state.data_fim,
            dataUltimoAgendamento: this.state.data_ultimo,
            category: this.state.choosedCategory,
            subcategory: this.state.choosedSubCategory,
            collection_name: this.state.choosedNameCollection
          }
        });

        if (response.data.length < 1) {
          return this.props.enqueueSnackbar(
            "Não há produtos programados para essas datas ",
            { variant: "warning" }
          );
        } 
	  } 
	  else {	
		this.props.enqueueSnackbar("Todos os campos precisam estar preenchidos", {
			variant: "error"
		  });

	}
    } catch (err) {
	  console.log(err.data);
	  this.props.enqueueSnackbar("Problemas no backend", {
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

  render(props) {
    const { classes } = this.props;
    return (
      <Fragment>
        <Grid>
          <BoxCompany insta={true} />
        </Grid>
        <Grid container justify="center">
          <DatePicker choosedData={this.getData} />
        </Grid>
        <Grid container justify="center">
          <div>

            <InputLabel id="label-category">Categoria</InputLabel>

            <Select
              labelId="label-category"
              id="demo-simple-select-outlined"
              value={this.state.choosedCategory}
              onChange={e => {
				  console.log(e.target.value)
                this.setState({ choosedCategory: e.target.value });
              }}
              labelWidth={100}
              label="Categoria"
              variant="outlined"
              className={this.props.classes.select}
            >
              {this.state.category.map(categorias => {
                return (
                  <MenuItem
				  key={categorias}
                    value={categorias}
                  >
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
				console.log(e.target.value)

                this.setState({ choosedSubCategory: e.target.value });
              }}
              labelWidth={100}
              label="Subcategoria"
              variant="outlined"
              className={this.props.classes.select}
            >
              {this.state.subcategories.map(subcategoria => {
                return (
                  <MenuItem
				  key={subcategoria}
                    value={subcategoria}
                  >
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
				console.log(e.target.value)

                this.setState({ choosedNameCollection: e.target.value });
              }}
              labelWidth={100}
              label="choosedNameCollection"
              variant="outlined"
              className={this.props.classes.select}
            >
              {this.state.nome_collection.map(collection => {
                return (
                  <MenuItem
				  key={collection}
                    value={collection}
                  >
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
      </Fragment>
    );
  }
}
const wrapperComponent = withStyles(styles)(withSnackbar(Search));
export default wrapperComponent;
