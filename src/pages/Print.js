import React, { Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import LoadingDialog from "../components/recursableComponents/LoadingDialog";


import Badge from "@material-ui/core/Badge";

import Typography from "@material-ui/core/Typography";


import { withSnackbar } from "notistack";


import UTILS from "../imageUrl";


const styles = theme => ({
  root: {
    transition: 'background-color 1.6s ',
    backgroundColor:'white'
  },
  expanded: {
    transition: 'background-color 1.6s ',
    backgroundColor:'#fafafa'

  },
  main: {
    flexGrow: 1,
    height: "auto"
  },
  margin: {
    margin: theme.spacing(0.5)
  },
  media: {
    height: 400,
    width: 280,
    [theme.breakpoints.down("sm")]: {
      height: 210,
      width: 120
    }
  },
  cardToPrint: {
    cursor: "pointer",
    minHeight: 305,
    maxWidth: 160,
    maxHeight: 305,
    minWidth: 160,
    margin: theme.spacing(0.6),
    marginBottom: theme.spacing(0),
    [theme.breakpoints.down("sm")]: {
      minHeight: 305,
      maxWidth: 160,
      maxHeight: 305,
      minWidth: 160,
      margin: theme.spacing(0.6),
      marginBottom: theme.spacing(0)

    },
    boxSizing: "border-box"
  },
  badge: {
    position:'relative',top:5,left: 285,
    [theme.breakpoints.down("sm")]: {
      // top: 180,
      left: 140
    },
  },

  mediaCardPrint: {
    height: 180,
    width: 140,
    boxSizing: "border-box",
    objectFit: "scale-down",
    [theme.breakpoints.down("sm")]: {
      height: 180,
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
  greenIcon: {
    backgroundColor: "#25d64c"
  },
  yellowIcon: {
    backgroundColor: "#ebf918"
  },
  redIcon: {
    backgroundColor: "#ff491b"
  }
});

class Insta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loadingPrint: true
    };
  }


  chooseBalls({ distribuicao, validBasedinSchedule }){
    const { classes } = this.props;

    if (distribuicao === true) {
      return classes.greenIcon
    } else if (validBasedinSchedule === true) {
      return classes.yellowIcon
      
    } else {
      return classes.redIcon

    }
  };
  
  compare = (a, b) => {
    if (!a[this.props.orderBy] || !b[this.props.orderBy]) return;

    if (this.props.orderAsc) {
      if (a[this.props.orderBy] < b[this.props.orderBy]) return -1;
      if (b[this.props.orderBy] > a[this.props.orderBy]) return 1;
      return 0;
    } else {
      if (a[this.props.orderBy] > b[this.props.orderBy]) return -1;
      if (b[this.props.orderBy] < a[this.props.orderBy]) return 1;
      return 0;
    }
  };
  filterProducts(produtos) {
    const { categoriaFilter, subcategoriaFilter, estampaFilter } = this.props;
    const produtosFiltrados = produtos.filter(produto => {
      return (
        categoriaFilter.includes(produto.categoria) &&
        subcategoriaFilter.includes(produto.subcategoria) &&
        estampaFilter.includes(produto.estampa)
      );
    });
    return produtosFiltrados.sort(this.compare);
  }
  checkLastImg = async image => {
    const { allProgramacoes } = this.props;
    const programacoes = Object.keys(allProgramacoes);
    const programacaoWithProducts = programacoes.filter(
      programacao =>
        this.filterProducts(allProgramacoes[programacao]).length >= 1
    );
    const produtosFiltrados = this.filterProducts(
      allProgramacoes[
        programacaoWithProducts[programacaoWithProducts.length - 1]
      ]
    );
    const ultimo_produto = produtosFiltrados[produtosFiltrados.length - 1];

    if (image === ultimo_produto.image) {
      await this.setState({ loadingPrint: false });

      window.print();
      this.setState({ print: false, loadingPrint: false });
      this.props.onFinishPrint()
    }
  };
  GetFormattedDate() {
    const todayTime = new Date().toISOString().split("T")[0];
    const [year, month, day] = todayTime.split("-");
    return month + "-" + day + "-" + year;
  }
  programacoesToPrint() {
    const { allProgramacoes } = this.props;
    const { classes } = this.props;
    const programacoes = Object.keys(allProgramacoes);

    return (
      <div className={"myDivToPrint"}>
        <Grid container direction="column" spacing={2}>
          {programacoes.map(programacao => {
            const produtosFiltrados = this.filterProducts(
              allProgramacoes[programacao]
            );
            let produtosPerProgramacao = produtosFiltrados.length;
            if (produtosPerProgramacao < 1) {
              return null;
            }
            let resto = produtosPerProgramacao % 12;
            let restoInicio = [];
            let restoMeio = [];
            let restoFim = [];

            for (let j = 0; j < resto; j++) {
              if (j <= 3 && resto <= 4) {
                restoInicio.push(produtosPerProgramacao - j);
              } else if (j > 3 && resto <= 8) {
                restoMeio.push(produtosPerProgramacao - j + 4);
              } else if (j > 7 && resto > 8) {
                restoFim.push(produtosPerProgramacao - j + 8);
              }
            }
            let produtosAllowed = [];
            let offSet = 8;
            let whileVerify = produtosPerProgramacao;
            let altura = 84;
            while (whileVerify / 12 >= 1) {
              altura = 82;
              whileVerify -= 12;
              for (let i = 1; i <= 4; i += 1) {
                produtosAllowed.push(offSet + i);
              }
              offSet += 12;
            }
            let produtosParaMostrarFiltrados = produtosFiltrados.map(
              (produtos, index) => {
                const {
                  produto,
                  desc_produto,
                  cor_produto,
                  qtde_programada,
                  desc_cor_produto,
                  // _id
                } = produtos;
                const color = this.chooseBalls(produtos);
                const image = UTILS.imagesFromProducts(
                  220,
                  320,
                  produtos.produto,
                  produtos.cor_produto
                );
                produtos.image = image;
                if (produtosPerProgramacao < 1) {
                  return null;
                }
                return (
                  <Fragment>
                    {index % 12 === 0 && index > 0 ? (
                      <div style={{ width: "100%" }}>
                        <Grid
                          item
                          // alignItems="center"
                          direction="column"
                          justify="flex-start"
                          container
                        >
                          <Typography component="subtitle" align="start">
                            {`${this.GetFormattedDate()}`}
                          </Typography>
                          <Typography align="center">
                            {`Data da programação:  ${programacao}`}
                          </Typography>
                        </Grid>
                      </div>
                    ) : null}

                    <Grid item align="center" className="">
                      <div
                        className={classes.cardToPrint}
                        id="card"
                        // onClick={() => this.handleClickProduct(_id)}
                      >
                        <Typography variant="h6">
                          {produto}
                        </Typography>
                        <Typography
                          color="textSecondary"
                         
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
                        <Typography
                          color="textSecondary"
                         
                          className={classes.desc_produto}
                        >
                          {desc_cor_produto.length > 13
                            ? `${desc_cor_produto.substring(0, 13)}...`
                            : desc_cor_produto}
                        </Typography>
                        <Badge
                          badgeContent={""}
                          classes={{ badge: color }}
                        >
                          <img
                            className={classes.mediaCardPrint}
                            src={produtos.image}
                            alt="Produto sem foto"
                            onLoad={() => this.checkLastImg(produtos.image)}
                          />
                        </Badge>
                        <Typography
                          variant="h5"
                         
                          color="textSecondary"
                          className="prende"
                        >
                          {qtde_programada}
                        </Typography>
                      </div>
                      {produtosAllowed.includes(index + 1) ? (
                        <div
                          style={{
                            height: altura,
                            backgroundColor: "transparent",
                            width: 50
                          }}
                        ></div>
                      ) : null}
                      {restoInicio.includes(index + 1) && index >= 4 ? (
                        <div
                          style={{
                            height: 700,
                            backgroundColor: "transparent",
                            width: 50
                          }}
                        ></div>
                      ) : null}
                      {restoMeio.includes(index + 1) && index >= 4 ? (
                        <div
                          style={{
                            height: 380,
                            backgroundColor: "transparent",
                            width: 50
                          }}
                        ></div>
                      ) : null}
                      {restoFim.includes(index + 1) && index >= 4 ? (
                        <div
                          style={{
                            height: 75,
                            backgroundColor: "transparent",
                            width: 50
                          }}
                        ></div>
                      ) : null}
                    </Grid>
                  </Fragment>
                );
              }
            );
            if (produtosPerProgramacao <= 4) {
              produtosParaMostrarFiltrados.push(
                <Grid item container>
                  <div
                    style={{
                      backgroundColor: "transparent",
                      height: 690,
                      width: 50
                    }}
                  ></div>
                </Grid>
              );
            }

            if (
              produtosPerProgramacao > 4 &&
              produtosPerProgramacao <= 8 &&
              restoMeio.length < 1
            ) {
              produtosParaMostrarFiltrados.push(
                <Grid item container align="center">
                  <div
                    style={{
                      backgroundColor: "transparent",
                      height: 355,
                      width: 50
                    }}
                  ></div>
                </Grid>
              );
            }

            return (
              <Grid item direction="row" justify="center">
                <Grid
                  item
                  direction="column"
                  justify="flex-start"
                  container
                >
                  <Typography component="subtitle" align="start">
                    {`${this.GetFormattedDate()}`}
                  </Typography>
                  <Typography align="center">
                    {`Data da programação:  ${programacao}`}
                  </Typography>
                </Grid>
                {
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={0}
                  >
                    {produtosParaMostrarFiltrados}
                  </Grid>
                }
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
                  <LoadingDialog
          open={this.state.loadingPrint}
          message={"Criando relatório"}
        />
        <div className={classes.containerSmall}>

          <div className={classes.margin}>
            <Grid container direction="column" >
              {this.programacoesToPrint()}
            </Grid>
          </div>
        </div>
      </Fragment>
    );
  }
}

const wrapperComponent = withStyles(styles)(withSnackbar(withRouter(Insta)));
export default wrapperComponent
