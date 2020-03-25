import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signIn } from "../actions";
import { withSnackbar } from "notistack";
import { BASE_URL } from "../consts";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import PencilIcon from "@material-ui/icons/CreateOutlined";
import Typography from "@material-ui/core/Typography";
import FilterList from "@material-ui/icons/FilterList";
import Divider from "@material-ui/core/Divider";
import Toc from "@material-ui/icons/Toc";
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import CardProduct from "../components/recursableComponents/CardProduct";


import Grow from '@material-ui/core/Grow';

import Header from "../components/recursableComponents/Header";
import Footer from "../components/recursableComponents/Footer";
import LoadingDialog from "../components/recursableComponents/LoadingDialog";
import FilterDrawer from "../components/recursableComponents/FilterDrawer";
import OrderDrawer from "../components/recursableComponents/OrderDrawer";
import TopDrawer from "../components/recursableComponents/TopDrawer"

const axios = require("axios");
const _ = require("lodash");


const styles = theme => ({
  margin: {
    margin: theme.spacing(1)
  },

  mediaCard: {
    height: 320,
    width: 220,
    boxSizing: "border-box",
    objectFit: "scale-down",
    // border: "2px groove",
    // borderRadius: "3px",
    // borderColor: "#8080801a",

    [theme.breakpoints.down("sm")]: {
      height: 220,
      width: 140
    }
  },
  mainImage: {
    marginTop: theme.spacing(1),
    width: 300,
    height: 300,
    border: "solid transparent",
    borderRadius: "12px"
  },

  productInfo: {
    width: 250,
    borderWidth: 1.5,
    borderColor: "black"
  },

  dateText: {
    textAlign: "center",
    fontWeight: "bold"
  },
  horizontalScroll: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  whiteButton: {
    color: "white",
    sizeSmall: "100px"
  },
  desc_produto: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9"
    }
  },
  containerSmall: {
      marginBottom: theme.spacing(10),
    [theme.breakpoints.down("xs")]: {
      paddingRight: theme.spacing(0),
      paddingLeft: theme.spacing(0),
      marginBottom: theme.spacing(2),

    },
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing(0),
      paddingLeft: theme.spacing(0),
      marginBottom: theme.spacing(2),

    }
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
  emoji: {
    fontSize: '100px',
    margin: '0 auto'
  },
  emojiPosition: {
    margin: '0 auto',
    textAlign: 'center'
  },
});

class Relatorio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produto: [],
      expanded: true,
      filters: {},
      categoriaFilter: [],
      subcategoriaFilter: [],
      estampaFilter: [],
      orderBy: "desc_cor_produto",
      orderAsc: true,
      filterSelected: { Categoria: true, Subcategoria: true, Estampa: true },
      filtersLen: {},
      openTopDrawer: false,
      products: [],
      noProducts: false,
      activeReport: this.getParamFromUrl("id_relatorio"),
      removeItens: false,
      reportsIds:this.getParamFromUrl("addRelatorio")?[this.getParamFromUrl("addRelatorio")]:[],
      selectedProducts: [],
      remainingProducts: [],
      checked: true
    };
  }

  componentDidMount() {
    this.getProducts();
    this.getRelatory();
  }

  async getProducts() {
    try {
      const response = await axios.get(
        `${BASE_URL}/myProducts/getReport?id_relatorio=${this.getParamFromUrl("id_relatorio")}`
      );

      let products = response.data;

      if (products.length < 1 || _.isEmpty(products)) {
        this.setState({ noProducts: true })
        return this.props.enqueueSnackbar(
          "Não há produtos neste relatório",
          { variant: "warning" }
        );
      }
      this.setState({ products });
    } catch (err) {
      console.log(err.data);
      return this.props.enqueueSnackbar("Problemas para buscar relatório", {
        variant: "error"
      });
    }
    this.mountFiltersOptions();
  }

  async removeItensFromRelatory(products, remainingProducts) {
    
    const id_relatorio = this.getParamFromUrl("id_relatorio")
    const data = this.mountDataToSaveItensOnRelatory(id_relatorio, remainingProducts)
    try {
      await axios.post(`${BASE_URL}/myProducts/removeItensFromRelatory`, data)
      this.props.enqueueSnackbar("Produtos removidos com sucesso.", {
        variant: "success"
      });
      return true
    } catch (error) {
      console.log("Error removeItensFromRelatory", error)
      return this.props.enqueueSnackbar("Erro ao tentar deletar itens do relatório", {
        variant: "error"
      });
    }
  }

  async getRelatory() {
    try {
      const response = await axios.get(
        `${BASE_URL}/myProducts/getRelatory?id_relatorio=${this.getParamFromUrl("id_relatorio")}`
      );
      let relatory = response.data;
      this.setState({ relatory,products: relatory.produto_tags })
    } catch (error) {
      console.log(error)
      return this.props.enqueueSnackbar("Problemas para buscar relatório", {
        variant: "error"
      });
    }
  }

  mountDataToSaveItensOnRelatory = (idRelatorio, products) => {
    try {
      const arr = []
      products.forEach(product => {
          let obj = {}
        obj["id_produto_cor"] = product.id
        obj.tags = []
        arr.push(obj)
      })
      const arrayToSave = { produto_tags: arr,  id_relatorio: idRelatorio}
      return arrayToSave
    } catch(err) {
      console.log(err)
    }
    return true
  }

  unmarkAllFilters = filterParam => {
    const { products } = this.state;
    const categorias = [];
    const subcategorias = [];
    const estampas = [];

      products.map(produto => {
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
      })
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
    const { products } = this.state;
    const categorias = [];
    const subcategorias = [];
    const estampas = [];

 products.map(produto => {
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

  getParamFromUrl(param) {
    const urlSearch = new URLSearchParams(this.props.location.search);
    return urlSearch.get(param);
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
    // if(!this.state.removeItens) {
    //   return this.props.history.push(`/produto?produto=${id}`);
    // }
    if (!selectedProducts.includes(id)) {
      selectedProducts.push(id);
    } else {
      const index = selectedProducts.indexOf(id);
      selectedProducts.splice(index, 1);
    }
    this.setState({ selectedProducts });
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
            // <Fragment>
            <Grow 
              in={this.state.checked}
              style={{ transitionDelay: this.state.checked ? '500ms' : '0ms' }}
              {...(this.state.checked ? { timeout: 1500 } : {})}
            >
              <CardProduct redirect={!this.state.removeItens} productToRender={produtos} cardOpacity={!this.state.selectedProducts.includes(produtos.id) && this.state.removeItens}
                handleClickProduct={() => this.handleClickProduct(produtos.id)}
              >
              </CardProduct>
            </Grow>
            // </Fragment>
          );
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
  openTopDrawer = () => {
    this.setState({ openTopDrawer: !this.state.openTopDrawer });
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

  handleClickEdit =  () => {
     this.setState({ removeItens: !this.state.removeItens })
  }

  removeProductsFromRelatory = async () => {
    const { selectedProducts, products } = this.state
    const lastProducts = products.filter(val => !selectedProducts.includes(val.id))

    await this.setState({ products: lastProducts })

    if(selectedProducts.length > 0) {
      await this.removeItensFromRelatory(selectedProducts, lastProducts)
    }
    if(selectedProducts.length === 0) {
      this.setState({ removeItens: !this.state.removeItens })
      return this.props.enqueueSnackbar(
        "Nenhum item selecionado",
        { variant: "warning" }
      );
    }
    this.setState({ removeItens: !this.state.removeItens })
  }

  render() {
    const { classes } = this.props;
    const { relatory } = this.state

    return (
      <Fragment>
        <LoadingDialog
          open={this.state.loadingPrint}
          message={"Criando relatório"}
        />

        <Header
          title={relatory ? relatory.nome_relatorio : ""}
          rightIcon={
            <IconButton
              aria-label="upload picture"
              component="span"
              className={classes.whiteButton}
              onClick={() => {
                // this.setState({print:true,loadingPrint:true})
              }}
            >
              {this.state.removeItens ? 
                <DeleteIcon
                  onClick={this.removeProductsFromRelatory}
                />
              : <PencilIcon
                  onClick={this.handleClickEdit}
              />}
            </IconButton>
          }
          leftIcon={
            <IconButton
              aria-label="upload picture"
              component="span"
              className={classes.whiteButton}
              onClick={() => {
                if(this.props.location.state) {
                 return  this.props.history.replace(this.props.location.state.lastPage)

                } else { 
                  this.props.history.goBack()
                }

              }}
            >
              <ArrowBack></ArrowBack>
            </IconButton>
          }
        />
                <TopDrawer 
                activeReport={this.state.activeReport}
                relatorioPage={true}     
          openMenu={this.openTopDrawer}
          open={this.state.openTopDrawer}></TopDrawer>
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
        {/* <Container className={classes.containerSmall}> */}
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
              xs={6}
              item
              sm={6}
              alignItems="center"
              justify="flex-start"
            >
              <IconButton onClick={this.openFilter}>
                <FilterList></FilterList>
              </IconButton>
              <Typography component="p">Filtrar</Typography>
            </Grid>
            <Grid
              container
              xs={6}
              item
              sm={6}
              alignItems="center"
              justify="flex-end"
              className={classes.paddingRightSmall}
            >
              <IconButton onClick={this.openOrder}>
                <Toc></Toc>
              </IconButton>
              <Typography component="p">Ordenar</Typography>
            </Grid>
          </Grid>
          <Divider id="some"></Divider>

          <div className={classes.margin}>
            <Grid container direction="column" spacing={2}>
            <Grid item direction="row" justify="center">
            {this.state.noProducts ? 
            <div className={classes.emojiPosition}>
              <Typography variant="h6" component="p">Sem Produtos no seu Relatório</Typography>
              <span role="img" className={classes.emoji} aria-label="Shrug">🤷</span>
            </div>
            : this.renderProductsCardsView(this.filterProducts(this.state.products))}
                 </Grid>
            </Grid>
          </div>
        {/* </Container> */}
        {/* </DragDropContext> */}

        <Footer onClick={this.openTopDrawer}></Footer>
      </Fragment>
    );
  }
}

const wrapperComponent = withStyles(styles)(
  withSnackbar(withRouter(Relatorio))
);

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
