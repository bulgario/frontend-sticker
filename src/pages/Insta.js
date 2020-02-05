import React, { Fragment } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Header from "../components/recursableComponents/Header";
// import DroppableWrapper from "../components/recursableComponents/DroppableWrapper";
import Badge from "@material-ui/core/Badge";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import Typography from "@material-ui/core/Typography";

// import Fab from "@material-ui/core/Fab";

import { signIn } from "../actions";
// import AddIcon from "@material-ui/icons/Add";
import FilterList from "@material-ui/icons/FilterList";

import Divider from "@material-ui/core/Divider";
import Button  from "@material-ui/core/Button";


// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Box from "@material-ui/core/Box";

// import Switch from "@material-ui/core/Switch";
import { withSnackbar } from "notistack";
import { BASE_URL } from "../consts";
import User from "../services/User";
// import { DragDropContext, Draggable } from "react-beautiful-dnd";

// import IconButton from '@material-ui/core/IconButton';
import ArrowBack from "@material-ui/icons/ArrowBack";
import Toc from "@material-ui/icons/Toc";

import { IconButton } from "@material-ui/core";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import FilterDrawer from "../components/recursableComponents/FilterDrawer";
import OrderDrawer from "../components/recursableComponents/OrderDrawer";

import imagesFromProducts from "../imageUrl";
const axios = require("axios");
const _ = require("lodash");

const styles = theme => ({
  root: {
    maxWidth: "100%",
    // paddingLeft: theme.spacing(-4),
    marginLeft: theme.spacing(-4),
    marginRight: theme.spacing(-6)

    // backgroundColor: "red"
  },
  main: {
    flexGrow: 1,
    height: "auto"
  },
  margin: {
    margin: theme.spacing(1)
  },
  media: {
    height: 400,
    width: 280,
    // [theme.breakpoints.down('xs')]: {
    //   height: 150,
    //   width: 140,
    // },
    [theme.breakpoints.down("sm")]: {
      height: 210,
      width: 120
    }
  },
  greenIcon: {
    backgroundColor: "#25d64c"
  },
  yellowIcon: {
    backgroundColor: "#ebf918"
  },
  redIcon: {
    backgroundColor: "#ff491b"
  },
  cardToPrint: {
    cursor: "pointer",
    backgroundColor:'blue',
    minHeight: 400,
    maxWidth: 300,
    maxHeight: 400,
    minWidth: 300,
    margin: theme.spacing(0.2),
    // padding: theme.spacing(0.6),
    // backgroundColor: "white",
    [theme.breakpoints.down("sm")]: {
      minHeight: 343,
      maxWidth: 160,
      maxHeight: 343,
      minWidth: 160,
      margin: theme.spacing(0.6),
      // marginLeft:theme.spacing(-3),
      marginBottom: theme.spacing(0)
      // marginLeft:theme.spacing(-2),

      // paddingLeft: theme.spacing(-3),

      // padding: theme.spacing(1),
    },
    boxSizing: "border-box"
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
      // marginLeft:theme.spacing(-3),
      marginBottom: theme.spacing(4)
      // marginLeft:theme.spacing(-2),

      // paddingLeft: theme.spacing(-3),

      // padding: theme.spacing(1),
    },
    boxSizing: "border-box"
  },
  // badge: {
  //       paddingRight: theme.spacing(-19),
  //   paddingTop: theme.spacing(-0.5),
  // },
  mediaCard: {
    height: 320,
    width: 220,
    boxSizing: "border-box",
    objectFit: "scale-down",
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(-1),
    // marginTop: theme.spacing(-0.5),
    [theme.breakpoints.down("sm")]: {
      height: 220,
      width: 140
    },

    borderColor: "#FFE600"
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
  fab: {
    position: "fixed",
    bottom: theme.spacing(3)
  },
  divider: {
    backgroundColor: "#ffe600",
    marginLeft: "25%",
    marginRight: "25%",
    height: 1.5
  },
  cardHeader: {
    textAlign: "center"
    // paddingVertical:theme.spacing(-2)
  },
  textField: {
    width: 190,
    margin: theme.spacing(1)
  },
  textFieldFull: {
    width: 385,
    margin: theme.spacing(1)
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
      orderAsc: true
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

  mountFiltersOptions() {
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
    return this.refreshFilter(filters);
  }

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

  onDragEnd = result => {
    // const {destination,source, draggableId} = result
    // if (!destination) return
    // if (destination.droppableId === source.droppableId && destination.index === source.index) {
    //   return
    // }
    // // console.log(result)
    // // console.log(this.state.allProgramacoes,'velha programacao')
    // const produtosPerProgramation = this.state.allProgramacoes[source.droppableId]
    // // console.log(produtosPerProgramation)
    // const newArray = Array.from(produtosPerProgramation)
    // // console.log(source.droppableId)
    // const productToReplace = produtosPerProgramation.find((item,index) => index === source.index)
    // // console.log(productToReplace,'produto achado')
    // // console.log(newArray[source.index],'produto original')
    // newArray.splice(source.index,1)
    // newArray.splice(destination.index,0,productToReplace)
    // // console.log(newArray,'novo array')
    // const newProgramation = {
    //   ...this.state.allProgramacoes,
    //   [source.droppableId] : newArray
    // }
    // // console.log(newProgramation,' nova programacao')
    // const newState = {
    //   ...this.state,
    //   allProgramacoes: newProgramation
    //   //  {
    //   //   ...this.state.allProgramacoes,
    //   //   [source.droppableId] : newArray
    //   // }
    // }
    // // console.log(newState)
    // return
    // // this.setState(newState)
  };

  renderProgramacoes() {
    const { allProgramacoes } = this.state;
    const { classes } = this.props;
    // console.log(Object.entries(allProgramacoes),'teste')
    const programacoes = Object.keys(allProgramacoes);
    console.log(programacoes);
    return programacoes.map(programacao => {
      return (
        <Grid item direction="row" justify="center">
          {/* <div className={classes.root}> */}
          <ExpansionPanel>
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
                <Typography variant="h5" component="p">
                  {programacao}
                </Typography>

                {/* <IconButton>
                    <ArrowDropDownIcon></ArrowDropDownIcon>
                  </IconButton> */}
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.root}>
              {/* <Divider variant="middle" className={classes.divider}></Divider> */}
              {/* <DroppableWrapper
              droppableId={produtos[0]}
              direction="horizontal"
              isCombineEnabled={true}
                > */}
              {this.state.expanded
                ? this.renderProductsCardsView(
                    this.filterProducts(allProgramacoes[programacao])
                  )
                : this.renderProductsInstaView(allProgramacoes[programacao])}
              {/* </DroppableWrapper> */}
            </ExpansionPanelDetails>
          </ExpansionPanel>
          {/* </div> */}
        </Grid>
      );
    });
  }

  renderProgramacoesToPrint() {
    const { allProgramacoes } = this.state;
    const { classes } = this.props;
    console.log("CHAMEI")
    // console.log(Object.entries(allProgramacoes),'teste')
    const programacoes = Object.keys(allProgramacoes);
    console.log(programacoes);
    return programacoes.map(programacao => {
      return (
        <Grid item direction="row" justify="center">
          {/* <div className={classes.root}> */}
              <Grid
                item
                alignItems="center"
                direction="row"
                justify="flex-start"
                container
              >
                <Typography variant="p" component="p">
                  {programacao}
                </Typography>

                {/* <IconButton>
                    <ArrowDropDownIcon></ArrowDropDownIcon>
                  </IconButton> */}
              </Grid>

              {/* <Divider variant="middle" className={classes.divider}></Divider> */}
              {/* <DroppableWrapper
              droppableId={produtos[0]}
              direction="horizontal"
              isCombineEnabled={true}
                > */}
              {this.state.expanded
                ? this.renderProductsCardsViewPrint(
                    this.filterProducts(allProgramacoes[programacao])
                  )
                : this.renderProductsInstaView(allProgramacoes[programacao])}
              {/* </DroppableWrapper> */}
          {/* </div> */}
        </Grid>
      );
    });
  }

  filterProducts(produtos) {
    console.log("fui chamado");
    const { categoriaFilter, subcategoriaFilter } = this.state;
    const produtosFiltrados = produtos.filter(produto => {
      return (
        categoriaFilter.includes(produto.categoria) &&
        subcategoriaFilter.includes(produto.subcategoria)
      );
    });
    console.log(produtosFiltrados);
    return produtosFiltrados.sort(this.compare);
  }

  chooseBalls({ distribuicao, validBasedinSchedule }) {
    const { classes } = this.props;

    if (distribuicao === true) {
      return classes.greenIcon;
    } else if (validBasedinSchedule === false) {
      return classes.yellowIcon;
    } else {
      return classes.redIcon;
    }
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
          const color = this.chooseBalls(produtos);
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
                <Badge
                  badgeContent={""}
                  classes={{ badge: color }}
                  // color={color}
                  // className={color}
                  // anchorOrigin="top"
                >
                  {produtos.image ? (
                    <CardMedia
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
                </Badge>
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


  renderProductsCardsViewPrint(data) {
    const { classes } = this.props;
    let maxHeight = 1000
    let atual = 0
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={0}
      >
        {/* {atual += 20} */}
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
          const produtoNum = index + 1
          atual+= 22.222222
          const color = this.chooseBalls(produtos);
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
                className={classes.cardToPrint}
                id="card"

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
                <Badge
                  badgeContent={""}
                  classes={{ badge: color }}
                  // color={color}
                  // className={color}
                  // anchorOrigin="top"
                >
                  {produtos.image ? (
                    // <CardMedia
                    //   className={classes.mediaCard}
                    //   image={produtos.image}
                    //   title="Produto"
                    // />
                    <div className={classes.mediaCard}></div>
                  ) : (
                    <CardMedia
                      className={classes.mediaCard}
                      image={"/no-picture.png"}
                      title="Produto sem foto"
                    />
                  )}
                </Badge>
                <Typography variant="h5" component="p" color="textSecondary">
                  {qtde_programada}
                </Typography>
              </div>
              
              {/* </div>
                )}
              </Draggable> */}
              {atual > 1000?() => {atual =0
              return ( <div style={{background:'red',height:200,width:'100%'}}></div>)}:null}
            </Grid>
            
            // </Fragment>
          );
        })}
      </Grid>
    );
  }

  renderProductsInstaView(data) {
    const { classes } = this.props;
    return (
      <Grid className={classes.horizontalScroll}>
        {data.map((produto, index) => {
          return (
            // <Draggable
            //   draggableId={produto.id_produto.toString()}
            //   index={index}
            //   key={index}
            // >
            //   {provided => (
            //     <div
            //       {...provided.draggableProps}
            //       {...provided.dragHandleProps}
            //       ref={provided.innerRef}
            //     >
            <Card className={classes.margin}>
              <CardMedia
                className={classes.media}
                image={produto.image}
                title="Produto"
              />
            </Card>
            //     </div>
            //   )}
            // </Draggable>
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
    console.log(filterObj);
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
    console.log(orderAsc, value);
    this.setState({ orderBy: value, orderAsc });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={"myDivToPrint"}>
        <Grid container direction="column" spacing={2} >
              {this.renderProgramacoesToPrint()}

        </Grid>


        </div>
        <Header
          title="Resultados da programação"
          rightIcon={null}
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
        ></FilterDrawer>
        <OrderDrawer
          openMenu={this.openOrder}
          open={this.state.openOrderDrawer}
          setOrderBy={this.setOrderBy}
          orderBy={this.state.orderBy}
          orderAsc={this.state.orderAsc}
        ></OrderDrawer>
        {/* <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={this.state.expanded}
                onChange={() =>
                  this.setState({ expanded: !this.state.expanded })
                }
              />
            }
            label="Detalhes"
          /> */}
        {/* <DragDropContext onDragEnd={this.onDragEnd}> */}
        <Container className={classes.containerSmall} id="some">
          <Grid
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
          <Divider></Divider>
            <Button onClick={() =>{
              window.print()
              // this.PrintElem('teste1')
          
          }}>aaaa</Button>
          <div className={classes.margin}>
            <Grid container direction="column" spacing={2} >
              {/* {this.renderProgramacoes()} */}
            </Grid>
          </div>
        </Container>
        {/* </DragDropContext> */}

        <Grid container justify="center">
          {/* <Fab aria-label={"Add"} className={classes.fab} color={"primary"}>
            <AddIcon />
          </Fab> */}
        </Grid>
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
