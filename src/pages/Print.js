import React, { Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import LoadingDialog from "../components/recursableComponents/LoadingDialog";

// import Tooltip from "@material-ui/core/Tooltip";

import Badge from "@material-ui/core/Badge";
import Card from "@material-ui/core/Card";
// import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";



import Typography from "@material-ui/core/Typography";


import { withSnackbar } from "notistack";


import UTILS from "../imageUrl";


const styles = theme => ({

  margin: {
    margin: theme.spacing(0.5)
  },
  cardToPrint: {
    cursor: "pointer",
    minHeight: 400,
    maxWidth: 300,
    maxHeight: 400,
    minWidth: 300,

    margin: theme.spacing(0.6),
    marginBottom: theme.spacing(0),
    [theme.breakpoints.down("sm")]: {
      minHeight: 320,
      maxWidth: 160,
      maxHeight: 320,
      minWidth: 160,
      margin: theme.spacing(0.6),
      marginBottom: theme.spacing(0)

    },
    boxSizing: "border-box"
  },
  badge: {
    position: "relative",
    top: 5,
    left: 100,
    [theme.breakpoints.down("sm")]: {
      // top: 180,
      left: 140
    }
  },

  mediaCardPrint: {
    // height: 415,
    margin:0,
    padding:0,
    width: 300,
    height: 180,
    position: "relative",
    top:-18,
    // width: 140,
    boxSizing: "border-box",
    objectFit: "scale-up",
    [theme.breakpoints.down("sm")]: {
      height: 190,
      width: 160
    },

    borderColor: "#FFE600"
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
    const { categoriaFilter, subcategoriaFilter, estampaFilter, fornecedorFilter, estilistaFilter } = this.state;
    const produtosFiltrados = produtos.filter(produto => {
      return (
        categoriaFilter.includes(produto.categoria) &&
        subcategoriaFilter.includes(produto.subcategoria) &&
        estampaFilter.includes(produto.estampa) &&
        fornecedorFilter.includes(produto.fornecedor) &&
        estilistaFilter.includes(produto.estilista)
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
            let resto = produtosPerProgramacao % 10;
            let restoInicio = [];
            let restoMeio = [];
            let restoFim = [];

            for (let j = 0; j < resto; j++) {
              if (j <= 4 && resto <= 5) {
                restoInicio.push(produtosPerProgramacao - j);
              } else if (j >= 5 && resto <= 10) {
                console.log(resto,'meu resto,')
                restoMeio.push(produtosPerProgramacao - j + 5);
              } else if (j > 7 && resto > 8) {
                restoFim.push(produtosPerProgramacao - j + 8);
              }
            }
            console.log(restoMeio, programacao)
            let produtosAllowed = [];
            // let offSet = 10;
            // let whileVerify = produtosPerProgramacao;
            let altura = 84;
            // while (whileVerify / 10 >= 1) {
            //   altura = 84;
            //   whileVerify -= 10;
            //   // for (let i = 1; i <= 10; i += 1) {
            //   //   produtosAllowed.push(offSet + i);
            //   // }
            //   offSet += 10;
            // }
            let produtosParaMostrarFiltrados = produtosFiltrados.map(
              (produtos, index) => {
                const {
                  produto,
                  desc_produto,
                  cor_produto,
                  qtde_programada,
                  desc_cor_produto,
                  preco_varejo_original
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
                    {index % 10 === 0 && index > 0 ? (
                      <div style={{ width: "100%",marginTop: 17}}>
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
                           {this.props.relatoryName?`${this.props.relatoryName}`:`Data da programação:  ${programacao}`} 
                          </Typography>
                          <Divider></Divider>
                        </Grid>
                      </div>
                    ) : null}

                    <Grid item  className="">
                      <Card
                      variant="elevation"
                      elevation={3}
                        className={classes.cardToPrint}
                        id="card"
                        // onClick={() => this.handleClickProduct(_id)}
                      >
                                {this.props.showBadges && (<div className={classes.badge}>
                                  <Badge badgeContent={""}  classes={{ badge: color }}>
</Badge>
                                </div>

)}  
       {/* <Badge badgeContent={""}  classes={{ badge: color }}> */}
                          <img
                            className={classes.mediaCardPrint}
                            src={produtos.image}
                            alt="imagem"
                            onLoad={() => this.checkLastImg(produtos.image)}
                          />
                        {/* </Badge> */}
                        <Grid
          style={{ marginLeft: 10 }}
          container
          alignItems="flex-start"
          direction="column"
        >
          <Typography
            color="textSecondary"
            variant="body2"
            className={classes.desc_produto}
          >
            {UTILS.formatToMaxCaractersAllowed(
              desc_produto,
16            )}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {`Ref ${produto}`}
          </Typography>

          <Typography variant="body2" color="textSecondary">
            {`${cor_produto} - ${UTILS.formatToMaxCaractersAllowed(
              desc_cor_produto,
             10
            )} `}
          </Typography>

          <Typography variant="body2" color="textSecondary">
            {`R$${preco_varejo_original},00`}
          </Typography>
    {qtde_programada &&       <Typography variant="body2" color="textSecondary">
            {`Qtde programada:  ${qtde_programada}`}
          </Typography>}
        </Grid>
                      </Card>
                      {produtosAllowed.includes(index + 1) ? (
                        <div
                          style={{
                            height: altura,
                            backgroundColor: "transparent",
                            width: 50
                          }}
                        ></div>
                      ) : null}
                      {restoInicio.includes(index + 1) && index >= 5 ? (
                        <div
                          style={{
                            height: 325,
                            backgroundColor: "transparent",
                            width: 50
                          }}
                        ></div>
                      ) : null}
                      {/* {restoMeio.includes(index + 1) && index >= 4 ? (
                        <div
                          style={{
                            height: 10,
                            backgroundColor: "green",
                            width: 50
                          }}
                        ></div>
                      ) : null} */}
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
            if (produtosPerProgramacao <= 5) {
              produtosParaMostrarFiltrados.push(
                <Grid item container>
                  <div
                    style={{
                      backgroundColor: "transparent",
                      height: 330,
                      width: 50
                    }}
                  ></div>
                </Grid>
              );
            }

            if (
              produtosPerProgramacao > 5 &&
              produtosPerProgramacao <= 10 &&
              restoMeio.length < 1
            ) {
              produtosParaMostrarFiltrados.push(
                <Grid item container align="center">
                  <div
                    style={{
                      backgroundColor: "transparent",
                      height: 10,
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
                  {this.props.relatoryName?`${this.props.relatoryName}`:`Data da programação:  ${programacao}`} 
                  </Typography>
                  <Divider></Divider>
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
