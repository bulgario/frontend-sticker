import React from "react";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CreateIcon from "@material-ui/icons/Create";
import CheckIcon from "@material-ui/icons/Check";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "blue"
  },
  input: {
    margin: theme.spacing.unit
  },
  root: {
    flexGrow: 1,
    height: "auto",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  grid: {
    marginTop: theme.spacing(2)
  },
  loadingCircle: {
    padding: theme.spacing(3),
    textAlign: "center"
  },
  main: {
    marginTop: theme.spacing(6)
  },
  button: {
    cursor: "pointer"
  },
  logo: {
    width: 180,
    margin: theme.spacing(2)
  },
  margin: {
    margin: theme.spacing(2)
  },
  gridItem: {
    maxWidth: 700
    // backgroundColor: "blue"
  },
  whiteButton: {
    color: "white",
    sizeSmall: "100px"
  },
  circleIcon: {
    display: "flex",
    color: theme.palette.text.primary,
    fontSize: 60,
    position: "flex-start"
  },
  circlePosition: {
    position: "fixed",
    right: theme.spacing(2)
  },
  cover: {
    width: theme.spacing(12),
    height: theme.spacing(12)
  },
  checkSave: {
    cursor: "pointer"
  },
  iconCheck: {}
});

class MyProductsCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true
    };
  }

  render() {
    const { classes, nameCardBox, meusProdutos } = this.props;

    const handleNameChange = event => {
      const obj = Object.assign(this.props.meusProdutos, {
        nome_relatorio: event.target.value
      });

      this.props.getProdutosData(obj);
    };

    const handleInputDisable = () => {
      this.setState({ disabled: !this.state.disabled });
    };

    const handleSaveData = () => {
      try {
        // this.props.meusProdutos  POST PARA ENVIAR O DADO PORRA
        this.props.enqueueSnackbar("Salvo com Sucesso.", {
          variant: "success"
        });
        this.setState({ disabled: true });
      } catch (error) {
        console.log("Error Saving your collection of products:", error);
        this.props.enqueueSnackbar("Erro ao Salvar Sua Coleção.", {
          variant: "error"
        });
      }
    };

    return (
      <Container className={classes.root}>
        <Grid direction="row" container xs={12} sm={12}>
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <Grid container item justify="flex-start" direction="row">
                <Grid item direction="row" className={classes.gridItem}>
                  <Input
                    defaultValue={nameCardBox}
                    onChange={handleNameChange}
                    placeholder="Nome Coleção"
                    className={classes.input}
                    disabled={this.state.disabled}
                    inputProps={{
                      "aria-label": "Description"
                    }}
                  />
                </Grid>
                <Grid item direction="row" className={classes.iconCheck}>
                  {this.state.disabled ? (
                    <CreateIcon onClick={handleInputDisable} />
                  ) : (
                    <CheckIcon
                      color="primary"
                      className={classes.checkSave}
                      onClick={handleSaveData}
                    />
                  )}
                </Grid>
                <Grid item direction="row">
                  <CardActions className={classes.controls}>
                    <Button
                      className={classes.button}
                      color="primary"
                      onClick={() =>
                        this.props.history.push(this.props.redirectTo)
                      }
                    >
                      Acessar
                    </Button>
                    <Button
                      className={classes.button}
                      color="primary"
                      onClick={() =>
                        this.props.history.push(this.props.redirectTo)
                      }
                    >
                      Compartilhar
                    </Button>
                  </CardActions>
                </Grid>
              </Grid>
              <Grid item direction="row" justify="flex-end" container>
                <CardMedia
                  className={classes.cover}
                  image={meusProdutos.imagemJanela}
                  title="Vitrine"
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    );
  }
}

const wrapperComponent = withStyles(styles)(
  withSnackbar(withRouter(MyProductsCards))
);
export default wrapperComponent;
