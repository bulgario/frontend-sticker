import React, { Fragment } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Header from "../components/recursableComponents/Header";
import Footer from "../components/recursableComponents/Footer";
import CardProduct from "../components/recursableComponents/CardProduct";
import PrintPage from './Print'


import Typography from "@material-ui/core/Typography";


import { signIn } from "../actions";
import FilterList from "@material-ui/icons/FilterList";

import Divider from "@material-ui/core/Divider";

import { withSnackbar } from "notistack";
import { BASE_URL } from "../consts";
import User from "../services/User";

import ArrowBack from "@material-ui/icons/ArrowBack";
import Print from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";

import Toc from "@material-ui/icons/Toc";

import { IconButton } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import DoneAllIcon from "@material-ui/icons/DoneAll";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import FilterDrawer from "../components/recursableComponents/FilterDrawer";
import OrderDrawer from "../components/recursableComponents/OrderDrawer";
import ChipsList from "../components/recursableComponents/ChipsList";

import ChooseReportList from "../components/recursableComponents/ChooseReportList";


const axios = require("axios");
const _ = require("lodash");

const styles = theme => ({
  root: {
    transition: 'background-color 1.6s ',
    backgroundColor:'white'
  },
  expanded: {
    transition: 'background-color 1.6s ',
    backgroundColor:'#fafafa'

  },
  margin: {
    margin: theme.spacing(0.5)
  },
  whiteButton: {
    color: "white",
    sizeSmall: "100px"
  },
  paddingRightSmall: {
     paddingRight: theme.spacing(1.5),

    [theme.breakpoints.down("xs")]: {
       paddingRight: theme.spacing(1.5),
       paddingLeft: theme.spacing(0)
    },
    [theme.breakpoints.down("sm")]: {
       paddingRight: theme.spacing(1.5),
       paddingLeft: theme.spacing(0)
    }
  },
  hideXsLabel: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
});

class Insta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produto: [],
      username: "",
      password: "",
      showPassword: false,
      usernameError: false,
      passwordError: false,
      recoveryError: false,
      recoverySubmitted: false,
      recoveryShow: false,
      allProgramacoes: [],
      expanded: true,
      filters: {},
      categoriaFilter: [],
      subcategoriaFilter: [],
      estampaFilter: [],
      orderBy: "desc_cor_produto",
      orderAsc: true,
      print: false,
      filterSelected: { Categoria: true, Subcategoria: true, Estampa: true },
      filtersLen: {},
      selectItens: false,
      selectedProducts: [],
      showReportsList: false,
      reportsIds: this.getParamFromUrl("addRelatorio")?[this.getParamFromUrl("addRelatorio")]:[],
      reports: [],
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
    this.getRelatories();
  }
  async getProducts() {
    try {
      const response = await axios.get(
        `${BASE_URL}/products/selectedProducts`,
        {
          params: this.getAllParamsFromUrl()
        }
      );
      let products = response.data;

      if (products.length < 1 || _.isEmpty(products)) {
        return this.props.enqueueSnackbar(
          "Não há produtos programados para essas datas ",
          { variant: "warning" }
        );
      }
      this.setState({ allProgramacoes: products });
    } catch (err) {
      console.log(err);
      return this.props.enqueueSnackbar("Problemas no backend", {
        variant: "error"
      });
    }
    this.mountFiltersOptions();
  }

  async getRelatories() {
    const user = new User();
    const id_usuario = user.user.id_usuario;
    await axios
      .get(`${BASE_URL}/myProducts/getReports`, {
        params: {
          id_user: id_usuario
        }
      })
      .then(data => {
        this.setState({ reports: data.data });
        // this.setState({ reportsIds: data.data.map(ids => ids.id) });
      });
  }

  unmarkAllFilters = filterParam => {
    const { allProgramacoes } = this.state;
    const programacoes = Object.keys(allProgramacoes);
    const categorias = [];
    const subcategorias = [];
    const estampas = [];

    programacoes.map(programacao => {
      return allProgramacoes[programacao].map(produto => {
        if (filterParam === "Categoria") {
          if (
            !categorias.some(
              categoria => categoria.name === produto.categoria
            ) &&
            produto.categoria
          ) {
            categorias.push({
              name: produto.categoria,
              checked: this.state.filterSelected["Categoria"]
            });
          }
        }

        if (filterParam === "Subcategoria") {
          if (
            !subcategorias.some(
              subcategoria => subcategoria.name === produto.subcategoria
            ) &&
            produto.subcategoria
          ) {
            subcategorias.push({
              name: produto.subcategoria,
              checked: this.state.filterSelected["Subcategoria"]
            });
          }
        }

        if (filterParam === "Estampa") {
          if (
            !estampas.some(estampa => estampa.name === produto.estampa) &&
            produto.estampa
          ) {
            estampas.push({
              name: produto.estampa,
              checked: this.state.filterSelected["Estampa"]
            });
          }
        }

        return true;
      });
    });
    categorias.push("");
    subcategorias.push("");
    estampas.push("");
    const filters = {
      Categoria:
        filterParam === "Categoria"
          ? categorias
          : this.state.filters["Categoria"],
      Subcategoria:
        filterParam === "Subcategoria"
          ? subcategorias
          : this.state.filters["Subcategoria"],
      Estampa:
        filterParam === "Estampa" ? estampas : this.state.filters["Estampa"]
    };
    return this.refreshFilter(filters);
  };
  mountFiltersOptions = () => {
    const { allProgramacoes } = this.state;
    const programacoes = Object.keys(allProgramacoes);
    const categorias = [];
    const subcategorias = [];
    const estampas = [];

    programacoes.map(programacao => {
      return allProgramacoes[programacao].map(produto => {
        if (
          !categorias.some(categoria => categoria.name === produto.categoria) &&
          produto.categoria
        ) {
          categorias.push({ name: produto.categoria, checked: true });
        }
        if (
          !subcategorias.some(
            subcategoria => subcategoria.name === produto.subcategoria
          ) &&
          produto.subcategoria
        ) {
          subcategorias.push({ name: produto.subcategoria, checked: true });
        }
        if (
          !estampas.some(estampa => estampa.name === produto.estampa) &&
          produto.estampa
        ) {
          estampas.push({ name: produto.estampa, checked: true });
        }
        return true;
      });
    });

    const filters = {
      Categoria: categorias,
      Subcategoria: subcategorias,
      Estampa: estampas
    };
    this.setState({
      categoriaInitialLen: categorias.length,
      subcategoriaInitialLen: subcategorias.length,
      estampaInitialLen: estampas.length
    });

    return this.refreshFilter(filters);
  };

  getAllParamsFromUrl() {
    const user = new User();
    const dataInicio = this.getParamFromUrl("dataInicio");
    const dataFim = this.getParamFromUrl("dataFim");
    const entregaAjustada = this.getParamFromUrl("entregaAjustada");
    const category = this.getParamFromUrl("categoria");
    const subcategory = this.getParamFromUrl("subcategoria");
    const collection_name = this.getParamFromUrl("colecao");
    const id_marca_estilo = user.getIdMarcaEstilo();

    return {
      dataInicio,
      dataFim,
      entregaAjustada,
      category,
      subcategory,
      collection_name,
      id_marca_estilo
    };
  }

  getJsonFromUrl(param) {
    return JSON.parse(this.getParamFromUrl(param));
  }

  getParamFromUrl(param) {
    const urlSearch = new URLSearchParams(this.props.location.search);
    return urlSearch.get(param);
  }


  renderProgramacoes() {
    const { allProgramacoes } = this.state;
    const { classes } = this.props;
    const programacoes = Object.keys(allProgramacoes);
    return programacoes.map(programacao => {
      // let numRows,maxHeight
      // if(window.innerWidth >= 555) {
      //    numRows = allProgramacoes[programacao].length/3 < 1? 1: allProgramacoes[programacao].length/3
      //   maxHeight = Math.ceil(numRows) * 580 
      // } else{
      //   numRows = allProgramacoes[programacao].length/2 < 1? 1: allProgramacoes[programacao].length/2
      //   maxHeight = Math.ceil(numRows) * 500
      // }
      return (
        // <Grid item direction="row" justify="center" style={{width:'100%', marginTop: '0.5%',maxHeight}}>
                <Grid item  style={{width:'100%', marginTop: '0.5%'}}>

          <ExpansionPanel 
          key={`${programacao}`}
          classes={{
                root: classes.root,
                expanded: classes.expanded
                }}
                >
                
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid
                item
                alignItems="center"
                direction="row"
                justify="flex-start"
                container
              >
                <Typography variant="h5">
                  {programacao}
                </Typography>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{padding:0}} >
              { this.renderProductsCardsView(
                    this.filterProducts(allProgramacoes[programacao])
                  )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      );
    });
  }


  filterProducts(produtos) {
    const { categoriaFilter, subcategoriaFilter, estampaFilter } = this.state;
    const produtosFiltrados = produtos.filter(produto => {
      return (
        categoriaFilter.includes(produto.categoria) &&
        subcategoriaFilter.includes(produto.subcategoria) &&
        estampaFilter.includes(produto.estampa)
      );
    });
    return produtosFiltrados.sort(this.compare);
  }
  handleClickProduct(id) {
    const { selectedProducts } = this.state;
    if (this.state.selectItens) {
      if (!selectedProducts.includes(id)) {
        selectedProducts.push(id);
      } else {
        const index = selectedProducts.indexOf(id);
        selectedProducts.splice(index, 1);
      }
      this.setState({ selectedProducts });
    } else {
    }
  };

  mountDataToSaveReports() {
    try {
      const {selectedProducts, reportsIds} = this.state

      const arr = []
      selectedProducts.forEach(reportId => {
        let obj = {}
        obj["id_produto_cor"] = reportId
        obj.tags = []
        arr.push(obj)
      })
      
      const allProducts = reportsIds.map(reportId => {
        // console.log("aaaa", arr)
        // const obj = { ...arr }
        const arrayToSave = { produto_tags: arr,  id_relatorio: reportId}
        return arrayToSave
      })
      console.log("eeee", allProducts)
      return allProducts

    } catch(err) {
      console.log(err)
    }

    return true
  }

  async saveProductsToReports() {
    try {
      const { selectedProducts, reportsIds } = this.state;
      if (selectedProducts.length < 1) {
        return this.props.enqueueSnackbar("Nenhum produto foi selecionado.", {
          variant: "warning"
        });
      }
      if (reportsIds.length < 1) {
        return this.props.enqueueSnackbar("Nenhum relatório foi selecionado.", {
          variant: "warning"
        });
      }
      const data = this.mountDataToSaveReports();
      await Promise.all(
        data.map(data =>
          axios.post(`${BASE_URL}/myProducts/editRelatory`, data)
        )
      );
      this.props.enqueueSnackbar("Produtos salvos com sucesso.", {
        variant: "success"
      });
      if (this.getParamFromUrl("addRelatorio")) {
        return this.props.history.push(
          `/relatorio?id_relatorio=${this.getParamFromUrl("addRelatorio")}`
        );
      }
      return;
    } catch (err) {
      return this.props.enqueueSnackbar(
        "Não foi possível salvar os produtos.",
        { variant: "error" }
      );
    }
  }

  renderProductsCardsView(data) {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={0}
      >
        {data.map((produtos, index) => {

          return (
            <CardProduct showBadges={true} key={`${produtos.id}${index}`}redirect={!this.state.selectItens} productToRender={produtos} cardOpacity={this.state.selectItens &&
              !this.state.selectedProducts.includes(produtos.id)}
              handleClickProduct={() => this.handleClickProduct(produtos.id)}
             >
            </CardProduct>)

        })}
      </Grid>
    );
  }

  openFilter = () => {
    this.setState({ open: !this.state.open });
  };

  refreshFilter = filterObj => {
    this.setState({ filters: filterObj });
    const filtros = Object.keys(filterObj);
    const categorias = [];
    const subcategorias = [];
    const estampas = [];
    filtros.map(filtro => {
      return filterObj[filtro].map(item => {
        if (filtro === "Categoria") {
          if (item.checked) {
            categorias.push(item.name);
          }
        }
        if (filtro === "Subcategoria") {
          if (item.checked) {
            subcategorias.push(item.name);
          }
        }
        if (filtro === "Estampa") {
          if (item.checked) {
            estampas.push(item.name);
          }
        }
        return true;
      });
    });

    categorias.push("");
    subcategorias.push("");
    estampas.push("");
    this.setState({
      filterSelected: {
        Estampa: estampas.length - 1 === this.state.estampaInitialLen,
        Subcategoria:
          subcategorias.length - 1 === this.state.subcategoriaInitialLen,
        Categoria: categorias.length - 1 === this.state.categoriaInitialLen
      }
    });
    this.setState({
      categoriaFilter: categorias,
      subcategoriaFilter: subcategorias,
      estampaFilter: estampas
    });
  };

  openOrder = () => {
    this.setState({ openOrderDrawer: !this.state.openOrderDrawer });
  };

  compare = (a, b) => {
    if (!a[this.state.orderBy] || !b[this.state.orderBy]) return;

    if (this.state.orderAsc) {
      if (a[this.state.orderBy] < b[this.state.orderBy]) return -1;
      if (b[this.state.orderBy] > a[this.state.orderBy]) return 1;
      return 0;
    } else {
      if (a[this.state.orderBy] > b[this.state.orderBy]) return -1;
      if (b[this.state.orderBy] < a[this.state.orderBy]) return 1;
      return 0;
    }
  };

  setOrderBy = (orderAsc, value) => {
    this.setState({ orderBy: value, orderAsc });
  };
  chooseFilterSelected = (filterParam, forceFalse = false) => {
    const { filterSelected } = this.state;
    if (forceFalse) {
      // return this.setState({filterSelected:{...filterSelected, [filterParam]:false}})
    } else
      return this.setState({
        filterSelected: {
          ...filterSelected,
          [filterParam]: !filterSelected[filterParam]
        }
      });
  };

  handleItensSelect = () => {
    const { selectItens } = this.state;
    this.setState({ selectItens: !selectItens });
  };

  handleSelectAllItens = async () => {
    let allProducts = [];
    const programacoes = Object.keys(this.state.allProgramacoes);
   programacoes.map(programacao => {
      return this.filterProducts(this.state.allProgramacoes[programacao]).map(produto=> allProducts.push(produto))
    });

    if (this.state.selectedProducts.length === allProducts.length) {
      await this.setState({ selectedProducts: [] });
    } else {
      //selecionando todos os produtos
      await this.setState({
        selectedProducts: this.filterProducts(allProducts).map(
          produto => produto.id
        )
      });
    }
  };

  handleToogleChips = (nome_relatorio, id) => {
    const { reportsIds } = this.state;

    if (!reportsIds.includes(id)) {
      reportsIds.push(id);
    } else {
      const index = reportsIds.indexOf(id);
      reportsIds.splice(index, 1);
    }
    this.setState({ reportsIds });
  };

  removeChips = ({ nome_relatorio, id }) => () => {
    const { reportsIds } = this.state;

    const indexId = reportsIds.indexOf(id);
    reportsIds.splice(indexId, 1);

    this.setState({ reportsIds });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>

        <Header
          title="Resultados da programação"
          rightIcon={
            <Grid container direction="row">
              <IconButton
                aria-label="upload picture"
                component="span"
                className={classes.whiteButton}
                onClick={this.handleItensSelect}
              >
                <ShareIcon></ShareIcon>
              </IconButton>
              <IconButton
                aria-label="upload picture"
                component="span"
                className={classes.whiteButton}
                onClick={() => {
                  this.setState({ print: true, loadingPrint: true });
                }}
              >
                <Print></Print>	
              </IconButton>
            </Grid>
          }
          leftIcon={
            <IconButton
              aria-label="upload picture"
              component="span"
              className={classes.whiteButton}
              onClick={() => this.props.history.goBack()}
            >
              <ArrowBack></ArrowBack>
            </IconButton>
          }

        />
        <FilterDrawer
          openMenu={this.openFilter}
          open={this.state.open}
          filters={this.state.filters}
          refreshFilter={this.refreshFilter}
          mountFiltersOptions={this.mountFiltersOptions}
          unmarkAllFilters={this.unmarkAllFilters}
          filterSelected={this.state.filterSelected}
          chooseFilterSelected={this.chooseFilterSelected}
          filtersLen={this.state.filtersLen}
        ></FilterDrawer>
        <OrderDrawer
          openMenu={this.openOrder}
          open={this.state.openOrderDrawer}
          setOrderBy={this.setOrderBy}
          orderBy={this.state.orderBy}
          orderAsc={this.state.orderAsc}
        ></OrderDrawer>

        <div>
          <Grid
            id="some"
            item
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
            sm={12}
            xs={12}
          >
            <Grid
              container
              xs={1}
              item
              sm={2}
              alignItems="center"
              justify="flex-start"
            >
              <IconButton onClick={this.openFilter}>
                <FilterList></FilterList>
              </IconButton>
              <Typography className={classes.hideXsLabel}>Filtrar</Typography>
            </Grid>
            <Grid
            container
            xs={10}
            item
            sm={8}
            alignItems="center"
            justify="center"
            direction="row"
          >
            {this.state.selectItens ? (
              <ChipsList
                reportsIds={this.state.reportsIds}
                showModalReports={() =>
                  this.setState({ showReportsList: true })
                }
                reports={this.state.reports}
                removeChips={this.removeChips}
              />
            ) : null}
          </Grid>
            <Grid
              container
              xs={1}
              item
              sm={2}
              alignItems="center"
              justify="flex-end"
              className={classes.paddingRightSmall}
            >
              <IconButton onClick={this.openOrder}>
                <Toc></Toc>
              </IconButton>
              <Typography className={classes.hideXsLabel}>Ordenar</Typography>
            </Grid>
          </Grid>
          <Divider id="some"></Divider>

          <div className={classes.margin}>
            <Grid container direction="column" >
              {this.state.print
                ? <PrintPage orderBy={this.state.orderBy} orderAsc={this.state.orderAsc} onFinishPrint={() => this.setState({print:false})} allProgramacoes={this.state.allProgramacoes} categoriaFilter={this.state.categoriaFilter} subcategoriaFilter={this.state.subcategoriaFilter} estampaFilter={this.state.estampaFilter}></PrintPage>
                : this.renderProgramacoes()}
            </Grid>
          </div>
        </div>

        <Grid container justify="center">
        </Grid>
        {this.state.selectItens ? (
          <Footer
            hideButton={true}
            relatoryPage={this.state.relatoryPage}
            leftIconTodos={
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                onClick={() => this.saveProductsToReports()}
              >
                <IconButton>
                  <CheckIcon
                    onClick={() => {
                      this.setState({
                        selectingProducts: !this.state.selectingProducts
                      });
                    }}
                  ></CheckIcon>
                </IconButton>
                <Typography className={classes.hideXsLabel}>Salvar </Typography>
              </Grid>
            }
            rightIconTodos={
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="flex-end"
                onClick={() => this.handleSelectAllItens()}
              >
                <IconButton>
                  <DoneAllIcon></DoneAllIcon>
                </IconButton>
                <Typography className={classes.hideXsLabel}>
                  Selecionar todos
                </Typography>
              </Grid>
            }
          ></Footer>
        ) : null}
        <ChooseReportList
          onClose={() => this.setState({ showReportsList: false })}
          reports={this.state.reports}
          reportsIds={this.state.reportsIds}
          open={this.state.showReportsList}
          handleToogleChips={this.handleToogleChips}
        ></ChooseReportList>
      </Fragment>
    );
  }
}

const wrapperComponent = withStyles(styles)(withSnackbar(withRouter(Insta)));

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  recoverySuccess: state.auth.recovery,
  authToken: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  signIn: (username, password) => dispatch(signIn(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(wrapperComponent);
