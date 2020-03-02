import React, { Fragment } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";

import Header from "../components/recursableComponents/Header";
import Footer from "../components/recursableComponents/Footer";

import LoadingDialog from "../components/recursableComponents/LoadingDialog";

import ChooseReportList from "../components/recursableComponents/ChooseReportList";
import User from "../services/User";

import ChipsList from "../components/recursableComponents/ChipsList";

import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";

import Typography from "@material-ui/core/Typography";

import { signIn } from "../actions";
import FilterList from "@material-ui/icons/FilterList";

import Divider from "@material-ui/core/Divider";

import { withSnackbar } from "notistack";
import { BASE_URL } from "../consts";

import ArrowBack from "@material-ui/icons/ArrowBack";

import Toc from "@material-ui/icons/Toc";
import CheckIcon from "@material-ui/icons/Check";
import DoneAllIcon from "@material-ui/icons/DoneAll";

import IconButton from "@material-ui/core/IconButton";

import FilterDrawer from "../components/recursableComponents/FilterDrawer";
import OrderDrawer from "../components/recursableComponents/OrderDrawer";
import TopDrawer from "../components/recursableComponents/TopDrawer";

import UTILS from "../imageUrl";
const axios = require("axios");
const styles = theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  card: {
    cursor: "pointer",
    minHeight: 450,
    maxWidth: 300,
    maxHeight: 500,
    minWidth: 300,
    margin: theme.spacing(0.6),
    padding: theme.spacing(0.6),
    backgroundColor: "white",
    [theme.breakpoints.down("sm")]: {
      minHeight: 337,
      maxWidth: 160,
      maxHeight: 350,
      minWidth: 160,
      margin: theme.spacing(0.6),
      marginBottom: theme.spacing(4)
    },
    // opacity: 0.5,
    boxSizing: "border-box"
  },

  cardOpacity: {
    cursor: "pointer",
    minHeight: 450,
    maxWidth: 300,
    maxHeight: 500,
    minWidth: 300,
    margin: theme.spacing(0.6),
    padding: theme.spacing(0.6),
    backgroundColor: "white",
    [theme.breakpoints.down("sm")]: {
      minHeight: 337,
      maxWidth: 160,
      maxHeight: 350,
      minWidth: 160,
      margin: theme.spacing(0.6),
      marginBottom: theme.spacing(4)
    },
    opacity: 0.4,
    boxSizing: "border-box"
  },

  mediaCard: {
    height: 310,
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
      marginBottom: theme.spacing(2)
    },
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing(0),
      paddingLeft: theme.spacing(0),
      marginBottom: theme.spacing(2)
    }
  },
  hideXsLabel: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  paddingRightSmall: {
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
    fontSize: "100px",
    margin: "0 auto"
  },
  emojiPosition: {
    margin: "0 auto",
    textAlign: "center"
  }
});

class AllProducts extends React.Component {
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
      relatoryPage: true,
      handleApplied: false,
      handleTodos: false,
      showReportsList: false,
      reports: [],
      reportsNames: [],
      reportsIds:[],
      selectedProducts: []
    };
  }

  componentDidMount() {
    this.getProductsBySearch();
    this.getReports();
  }

  async getReports() {
    const user = new User();
    const id_user = user.getUser().id_usuario;

    try {
      await axios
        .get(`${BASE_URL}/myProducts/getReports`, {
          params: { id_user }
        })
        .then(data => {
          this.setState({ reports: data.data });
        });
    } catch (err) {
      console.log("Error getting reports:", err);
    }
  }

  mountDataToSaveReports() {
    try {
      const {selectedProducts, reportsIds} = this.state
      const productsToSend = {produto_tags: {}}
  
      selectedProducts.map(productId => {
        productsToSend["produto_tags"][productId] = []
        return true
      })
      const arrayToSave = reportsIds.map(reportId => {
        const obj = {...productsToSend,
          id_relatorio: reportId,
        }

        return obj
      })
  
      return arrayToSave
    } catch(err) {
      console.log(err)
    }

    return true
  }
  async saveProductsToReports() {

    try{
      const {selectedProducts, reportsIds} = this.state
      if (selectedProducts.length <1) {
        return this.props.enqueueSnackbar(
          "Nenhum produto foi selecionado.",
          { variant: "warning" }
        );

      }

      if (reportsIds.length <1) {
        return this.props.enqueueSnackbar(
          "Nenhum relatório foi selecionado.",
          { variant: "warning" }
        );

      }

      const data = this.mountDataToSaveReports()
      
     await Promise.all(data.map(data => axios.post(`${BASE_URL}/myProducts/editRelatory`,data)))
        
      return   this.props.enqueueSnackbar(
        "Produtos salvos com sucesso.",
        { variant: "success" }
      );

    } catch(err) {

      return this.props.enqueueSnackbar(
        "Não foi possível salvar os produtos.",
        { variant: "error" }
      );

    }
  }
  async getProductsBySearch() {
    const response = await axios.get(
      `${BASE_URL}/products/listProductsWithSearchQuery`,
      {
        params: this.getAllParamsFromUrl(),
      }
    );
    if (response) {
      let surveyedProducts = response.data;

      const allProductsSelectedIds = surveyedProducts.map(produto => produto.id);

      this.setState({ products: surveyedProducts, allProductsSelectedIds });
      this.setState({ produto: surveyedProducts });
    }
    this.mountFiltersOptions()
  }

  getAllParamsFromUrl() {
    const desc_produto = this.getParamFromUrl("desc_produto");
    const id_marca_estilo = this.getParamFromUrl("id_marca_estilo");
    const referencia = this.getParamFromUrl("referencia");

    return {
      desc_produto,
      id_marca_estilo,
      referencia
    };
  }

  getParamFromUrl(param) {
    const urlSearch = new URLSearchParams(this.props.location.search);
    return urlSearch.get(param);
  }

  unmarkAllFilters = filterParam => {
    const { products } = this.state;
    const categorias = [];
    const subcategorias = [];
    const estampas = [];

    products.map(produto => {
      if (filterParam === "Categoria") {
        if (
          !categorias.some(categoria => categoria.name === produto.categoria) &&
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
    if (!selectedProducts.includes(id)) {
      selectedProducts.push(id);
    } else {
      const index = selectedProducts.indexOf(id);
      selectedProducts.splice(index, 1);
    }
    this.setState({ selectedProducts });
    // return this.props.history.push(`/produto?produto=${id}`);
  }

  renderProductsCardsView(data) {
    const { classes } = this.props;
    const { handleApplied } = this.state;

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={0}
      >
        {data.map((produtos, index) => {
          const {
            produto,
            desc_produto,
            cor_produto,
            qtde_programada,
            desc_cor_produto,
            id
            // id_produto
          } = produtos;
          const image = UTILS.imagesFromProducts(
            220,
            320,
            produtos.produto,
            produtos.cor_produto
          );
          produtos.image = image;

          return (
            // <Fragment>
            <Grid item align="center" className="">
              {/* <Draggable
                draggableId={id_produto.toString()}
                index={index}
                key={index}
              >
                {provided => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  > */}
              <Card
                variant="elevation"
                elevation={!this.state.selectedProducts.includes(id) ? 0 : 4}
                className={
                  !this.state.selectedProducts.includes(id)
                    ? classes.cardOpacity
                    : classes.card
                }
                onClick={() => this.handleClickProduct(id)}
              >
                <Typography variant="h6" component="p">
                  {produto}
                </Typography>
                <Typography
                  color="textSecondary"
                  component="p"
                  className={classes.desc_produto}
                >
                  {desc_produto.length > 13
                    ? `${desc_produto.substring(0, 13)}...`
                    : desc_produto}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="h3"
                >
                  {cor_produto}
                </Typography>
                {/* <Typography variant="body2" color="textSecondary" component="p">{produtos.desc_cor_produto}</Typography> */}
                <Typography
                  color="textSecondary"
                  component="p"
                  className={classes.desc_produto}
                >
                  {desc_cor_produto.length > 13
                    ? `${desc_cor_produto.substring(0, 13)}...`
                    : desc_cor_produto}
                </Typography>
                <CardMedia
                  id="border"
                  className={
                    handleApplied ? classes.mediaCardApplied : classes.mediaCard
                  }
                  image={produtos.image}
                  title="Produto"
                />

                <Typography variant="h5" component="p" color="textSecondary">
                  {qtde_programada}
                </Typography>
              </Card>
              {/* </div>
                )}
              </Draggable> */}
            </Grid>
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

    const produtosFiltrados = this.state.products.filter(produto => {
      return (
        categorias.includes(produto.categoria) &&
        subcategorias.includes(produto.subcategoria) &&
        estampas.includes(produto.estampa)
      );
    });
    this.setState({allProductsSelectedIds: produtosFiltrados.map(produto => produto.id)})
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

  handleToogleChips = (nome_relatorio,id) => {
    const { reportsIds } = this.state


    if (!reportsIds.includes(id)) {
      reportsIds.push(id);
    } else {
      const index = reportsIds.indexOf(id);
      reportsIds.splice(index, 1);
    }
    this.setState({ reportsIds });
  };
  removeChips = ({nome_relatorio,id}) => () => {
    const {  reportsIds } = this.state;


    const indexId = reportsIds.indexOf(id)
    reportsIds.splice(indexId, 1);

    this.setState({ reportsIds });
  };
  render() {
    const { classes } = this.props;
    const { relatory } = this.state;

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
              onClick={this.openTopDrawer}
            >
              <SearchIcon></SearchIcon>
            </IconButton>
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
        <TopDrawer
          relatorioPage={true}
          openMenu={this.openTopDrawer}
          open={this.state.openTopDrawer}
        ></TopDrawer>
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
        <Container className={classes.containerSmall}>
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
              <Typography className={classes.hideXsLabel} component="p">
                Filtrar
              </Typography>
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
              <ChipsList
                reportsIds={this.state.reportsIds}

                reports={this.state.reports}
                removeChips={this.removeChips}
              ></ChipsList>

              {/* <IconButton
                aria-label="add"
                onClick={() => this.setState({ showReportsList: true })}
              >
                <AddIcon  />
              </IconButton>
              <Typography className={classes.hideXsLabel}>Relatório</Typography> */}
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
              <Typography className={classes.hideXsLabel} component="p">
                Ordenar
              </Typography>
            </Grid>
          </Grid>

          <Divider id="some"></Divider>

          <div className={classes.margin}>
            <Grid container direction="column" spacing={2}>
              <Grid item direction="row" justify="center">
                {this.state.noProducts ? (
                  <div className={classes.emojiPosition}>
                    <Typography variant="h6" component="p">
                      Sem Produtos no seu Relatório
                    </Typography>
                    <span
                      role="img"
                      className={classes.emoji}
                      aria-label="Shrug"
                    >
                      🤷
                    </span>
                  </div>
                ) : (
                  this.renderProductsCardsView(this.filterProducts(this.state.products))
                )}
              </Grid>
            </Grid>
          </div>
        </Container>
        {/* </DragDropContext> */}

        <Footer
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
              <Typography  className={classes.hideXsLabel} >Salvar </Typography>
            </Grid>
          }
          rightIconTodos={
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="flex-end"
              onClick={() => {
                const allProducts = this.state.allProductsSelectedIds;
                if (this.state.selectedProducts.length === allProducts.length) {
                  this.setState({ selectedProducts: [] });
                } else {
                  //selecionando todos os produtos
                  this.setState({ selectedProducts: this.filterProducts(this.state.products).map(produto =>produto.id) });
                }
              }}
            >
              <IconButton>
                <DoneAllIcon></DoneAllIcon>
              </IconButton>
              <Typography className={classes.hideXsLabel}>Selecionar todos</Typography>
            </Grid>
          }
          onClick={() => this.setState({ showReportsList: true })}
        ></Footer>
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

const wrapperComponent = withStyles(styles)(
  withSnackbar(withRouter(AllProducts))
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
