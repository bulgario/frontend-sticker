import React, { Fragment } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";

import PencilIcon from "@material-ui/icons/CreateOutlined";

import Header from "../components/recursableComponents/Header";
import Footer from "../components/recursableComponents/Footer";

import LoadingDialog from "../components/recursableComponents/LoadingDialog";

import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";


import { signIn } from "../actions";
import FilterList from "@material-ui/icons/FilterList";

import Divider from "@material-ui/core/Divider";

import { withSnackbar } from "notistack";
import { BASE_URL } from "../consts";
import User from "../services/User";

import ArrowBack from "@material-ui/icons/ArrowBack";

import Toc from "@material-ui/icons/Toc";

import { IconButton } from "@material-ui/core";

import FilterDrawer from "../components/recursableComponents/FilterDrawer";
import OrderDrawer from "../components/recursableComponents/OrderDrawer";

import imagesFromProducts from "../imageUrl";
const axios = require("axios");
const _ = require("lodash");

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
    boxSizing: "border-box"
  },

  mediaCard: {
    height: "auto",
    width: 220,
    boxSizing: "border-box",
    objectFit: "scale-down",
    border: "2px groove",
    borderRadius: "3px",
    borderColor: "#8080801a",

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
    [theme.breakpoints.down("xs")]: {
      paddingRight: theme.spacing(0),
      paddingLeft: theme.spacing(0)
    },
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing(0),
      paddingLeft: theme.spacing(0)
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
  }
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
      products: [
        {
          cor_produto: "6012",
          estampa: "",
          nome_arquivo: [
            "https://storage.googleapis.com/soma-web/1540055457-produto_cor-52103681_6012_1-T-SHIRT-DE-SEDA-COM-DECOTE-V-DE-ZIPER-METAL-LISA.jpg",
            "https://storage.googleapis.com/soma-web/1540055457-produto_cor-52103681_6012_10-T-SHIRT-DE-SEDA-COM-DECOTE-V-DE-ZIPER-METAL-LISA.jpg",
            "https://storage.googleapis.com/soma-web/1540055457-produto_cor-52103681_6012_2-T-SHIRT-DE-SEDA-COM-DECOTE-V-DE-ZIPER-METAL-LISA.jpg",
            "https://storage.googleapis.com/soma-web/1540055457-produto_cor-52103681_6012_3-T-SHIRT-DE-SEDA-COM-DECOTE-V-DE-ZIPER-METAL-LISA.jpg",
            "https://storage.googleapis.com/soma-web/1540055457-produto_cor-52103681_6012_4-T-SHIRT-DE-SEDA-COM-DECOTE-V-DE-ZIPER-METAL-LISA.jpg",
            "https://storage.googleapis.com/soma-web/282977-produto_estilo-52.10.3681.jpg",
            "https://storage.googleapis.com/soma-web/282977-produto_estilo-52.10.3681B.jpg"
          ],
          nome_colecao: ["INV20"],
          qtde_entregue: 0,
          categoria: "SEDA",
          preco_varejo: 598,
          data_inicial: ["2019-06-11"],
          id_marca: 6,
          id_produto: 930362538,
          entrega_ajustada: "",
          marca: "ANIMALE",
          data_fim: ["1981-12-13"],
          produto: "52.10.3681",
          subcategoria: "TOP BASICO",
          desc_cor_produto: "VERMELHO DISCO",
          id_marca_linx: 1,
          preco_varejo_original: 598,
          qtde_programada: 493,
          desc_produto: "T-SHIRT SEDA DECOTE ZÍPER LISA",
          data_prog: "2020-02-12",
          ultima_data_agendamento_entrega: "1981-12-13",
          distribuicao: true,
          preco_custo: 128.77,
          _id: "1540055457",
          validBasedinSchedule: true
        },
        {
          cor_produto: "6000",
          estampa: "",
          nome_arquivo: [
            "https://storage.googleapis.com/soma-web/1601850436-produto_cor-24011526_6000_1-CAMISA-DE-SEDA-BASICA-COM-BOLSOS-AMARELA.jpg",
          ],
          nome_colecao: ["INV20"],
          qtde_entregue: 59,
          categoria: "SEDA",
          preco_varejo: 758,
          data_inicial: ["2019-06-27"],
          id_marca: 6,
          id_produto: 933340142,
          entrega_ajustada: "2019-12-04",
          marca: "ANIMALE",
          data_fim: ["1981-12-13"],
          produto: "24.01.1526",
          subcategoria: "CAMISA",
          desc_cor_produto: "AMARELO YOKO",
          id_marca_linx: 1,
          preco_varejo_original: 758,
          qtde_programada: 59,
          desc_produto: "CAMISA SEDA GABRIELA",
          data_prog: "2020-02-12",
          ultima_data_agendamento_entrega: "2019-12-06",
          distribuicao: true,
          preco_custo: 147.71,
          _id: "1601850436",
          validBasedinSchedule: true
        },
        {
          cor_produto: "4060",
          estampa: "ONÇA YUNES PRETO",
          nome_arquivo: [
            "https://storage.googleapis.com/soma-web/1560475925-produto_cor-24011499_4060_1-CAMISA-DE-SEDA-BASICA-ESTAMPA-DE-ONCA.jpg",
            "https://storage.googleapis.com/soma-web/1560475925-produto_cor-24011499_4060_10-CAMISA-DE-SEDA-BASICA-ESTAMPA-DE-ONCA.jpg",
            "https://storage.googleapis.com/soma-web/1560475925-produto_cor-24011499_4060_2-CAMISA-DE-SEDA-BASICA-ESTAMPA-DE-ONCA.jpg",
            "https://storage.googleapis.com/soma-web/1560475925-produto_cor-24011499_4060_3-CAMISA-DE-SEDA-BASICA-ESTAMPA-DE-ONCA.jpg",
            "https://storage.googleapis.com/soma-web/1560475925-produto_cor-24011499_4060_4-CAMISA-DE-SEDA-BASICA-ESTAMPA-DE-ONCA.jpg",
            "https://storage.googleapis.com/soma-web/1560475925-produto_cor-24011499_4060_5-CAMISA-DE-SEDA-BASICA-ESTAMPA-DE-ONCA.jpg",
            "https://storage.googleapis.com/soma-web/283728-produto_estilo-283728_01.jpg",
            "https://storage.googleapis.com/soma-web/283728-produto_estilo-283728_02.jpg",
            "https://storage.googleapis.com/soma-web/283728-produto_estilo-283728_03.jpg",
            "https://storage.googleapis.com/soma-web/283728-produto_estilo-2d839c70-89df-4fa6-b174-26f15725e8a9.jpg",
            "https://storage.googleapis.com/soma-web/283728-produto_estilo-5676a59a-7e6f-4852-a680-b352f126679b.jpg"
          ],
          nome_colecao: ["INV20"],
          qtde_entregue: 192,
          categoria: "SEDA",
          preco_varejo: 798,
          data_inicial: ["2019-06-17"],
          id_marca: 6,
          id_produto: 931344208,
          entrega_ajustada: "2020-01-10",
          marca: "ANIMALE",
          data_fim: ["1981-12-13"],
          produto: "24.01.1499",
          subcategoria: "CAMISA",
          desc_cor_produto: "EST ONÇA YUNES PRETO",
          id_marca_linx: 1,
          preco_varejo_original: 798,
          qtde_programada: 192,
          desc_produto: "CAMISA SEDA BASICA ONCA",
          data_prog: "2020-02-12",
          ultima_data_agendamento_entrega: "2020-01-10",
          distribuicao: true,
          preco_custo: 159.39,
          _id: "1560475925",
          validBasedinSchedule: true
        },
        {
            cor_produto: "6000",
            estampa: "",
            nome_arquivo: [
              "https://storage.googleapis.com/soma-web/1601850436-produto_cor-24011526_6000_1-CAMISA-DE-SEDA-BASICA-COM-BOLSOS-AMARELA.jpg",
            ],
            nome_colecao: ["INV20"],
            qtde_entregue: 59,
            categoria: "SEDA",
            preco_varejo: 758,
            data_inicial: ["2019-06-27"],
            id_marca: 6,
            id_produto: 933340142,
            entrega_ajustada: "2019-12-04",
            marca: "ANIMALE",
            data_fim: ["1981-12-13"],
            produto: "24.01.1526",
            subcategoria: "CAMISA",
            desc_cor_produto: "AMARELO YOKO",
            id_marca_linx: 1,
            preco_varejo_original: 758,
            qtde_programada: 59,
            desc_produto: "CAMISA SEDA GABRIELA",
            data_prog: "2020-02-12",
            ultima_data_agendamento_entrega: "2019-12-06",
            distribuicao: true,
            preco_custo: 147.71,
            _id: "1601850436",
            validBasedinSchedule: true
          },        {
            cor_produto: "6000",
            estampa: "",
            nome_arquivo: [
              "https://storage.googleapis.com/soma-web/1601850436-produto_cor-24011526_6000_1-CAMISA-DE-SEDA-BASICA-COM-BOLSOS-AMARELA.jpg",
            ],
            nome_colecao: ["INV20"],
            qtde_entregue: 59,
            categoria: "SEDA",
            preco_varejo: 758,
            data_inicial: ["2019-06-27"],
            id_marca: 6,
            id_produto: 933340142,
            entrega_ajustada: "2019-12-04",
            marca: "ANIMALE",
            data_fim: ["1981-12-13"],
            produto: "24.01.1526",
            subcategoria: "CAMISA",
            desc_cor_produto: "AMARELO YOKO",
            id_marca_linx: 1,
            preco_varejo_original: 758,
            qtde_programada: 59,
            desc_produto: "CAMISA SEDA GABRIELA",
            data_prog: "2020-02-12",
            ultima_data_agendamento_entrega: "2019-12-06",
            distribuicao: true,
            preco_custo: 147.71,
            _id: "1601850436",
            validBasedinSchedule: true
          },        {
            cor_produto: "6000",
            estampa: "",
            nome_arquivo: [
              "https://storage.googleapis.com/soma-web/1601850436-produto_cor-24011526_6000_1-CAMISA-DE-SEDA-BASICA-COM-BOLSOS-AMARELA.jpg",
            ],
            nome_colecao: ["INV20"],
            qtde_entregue: 59,
            categoria: "SEDA",
            preco_varejo: 758,
            data_inicial: ["2019-06-27"],
            id_marca: 6,
            id_produto: 933340142,
            entrega_ajustada: "2019-12-04",
            marca: "ANIMALE",
            data_fim: ["1981-12-13"],
            produto: "24.01.1526",
            subcategoria: "CAMISA",
            desc_cor_produto: "AMARELO YOKO",
            id_marca_linx: 1,
            preco_varejo_original: 758,
            qtde_programada: 59,
            desc_produto: "CAMISA SEDA GABRIELA",
            data_prog: "2020-02-12",
            ultima_data_agendamento_entrega: "2019-12-06",
            distribuicao: true,
            preco_custo: 147.71,
            _id: "1601850436",
            validBasedinSchedule: true
          },
      ]
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  async getProducts() {
    try {
      const response = await axios.get(
        `${BASE_URL}/products/selectedProducts`,
        {
          params: {
            dataInicio: "2020-02-01T18:57:00.000Z",
            dataFim: "2020-02-12T18:57:00.000Z",
            entregaAjustada: "2020-02-27T18:57:00.000Z",
            collection_name: "INV20",
            id_marca_estilo: 6,
            category: "a",
            subcategory: "b"
          }
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
    return this.props.history.push(`/produto?produto=${id}`);
  }

  renderProductsCardsView(data) {
    const { classes } = this.props;
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
            _id
            // id_produto
          } = produtos;
          const image = imagesFromProducts(
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
              <div
                className={classes.card}
                onClick={() => this.handleClickProduct(_id)}
              >
                <Typography variant="h6" component="p">
                  {produto}
                </Typography>
                <Typography
                  variant="p"
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
                  variant="p"
                  color="textSecondary"
                  component="p"
                  className={classes.desc_produto}
                >
                  {desc_cor_produto.length > 13
                    ? `${desc_cor_produto.substring(0, 13)}...`
                    : desc_cor_produto}
                </Typography>
                {produtos.image ? (
                  <CardMedia
                    id="border"
                    className={classes.mediaCard}
                    image={produtos.image}
                    title="Produto"
                  />
                ) : (
                  <CardMedia
                    className={classes.mediaCard}
                    image={"/no-picture.png"}
                    title="Produto sem foto"
                  />
                )}
                <Typography variant="h5" component="p" color="textSecondary">
                  {qtde_programada}
                </Typography>
              </div>
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
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <LoadingDialog
          open={this.state.loadingPrint}
          message={"Criando relatório"}
        />

        <Header
          title="Vitrine 02/12/2020"
          rightIcon={
            <IconButton
              aria-label="upload picture"
              component="span"
              className={classes.whiteButton}
              onClick={() => {
                // this.setState({print:true,loadingPrint:true})
              }}
            >
              <PencilIcon></PencilIcon>
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
          <Grid container direction="row" justify="center">
            <CardMedia
              className={classes.mainImage}
              title="Vitrine"
              image="https://img.elo7.com.br/product/244x194/1BF6822/adesivos-para-vitrines-liquidacao-vitrine-de-lojas.jpg"
            />
          </Grid>

          <div className={classes.margin}>
            <Grid container direction="column" spacing={2}>
            <Grid item direction="row" justify="center">
            {this.renderProductsCardsView(this.filterProducts(this.state.products))}
                 </Grid>
            </Grid>
          </div>
        </Container>
        {/* </DragDropContext> */}

        <Footer></Footer>
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
