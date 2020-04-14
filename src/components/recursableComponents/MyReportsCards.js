import React, { Fragment } from "react";
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
// import CardMedia from "@material-ui/core/CardMedia";
import CreateIcon from "@material-ui/icons/Create";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { BASE_URL } from "../../consts";
import axios from "axios";

import PropTypes from "prop-types";
import Grow from "@material-ui/core/Grow";

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
    width: theme.spacing(20),
    height: theme.spacing(20)
  },
  checkSave: {
    cursor: "pointer"
  },
  deleteIcon: {
    cursor: "pointer",
    width: theme.spacing(5),
    paddingLeft: theme.spacing(2)
  },
  CreateIcon: {
    cursor: "pointer"
  }
});

class MyReporstsCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      checked: true,
      open: false,
      newCard: false
    };
  }

  handleChange = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  render() {
    const { classes, nameCardBox, meusProdutos } = this.props; //eslint-disable-line
    const { checked } = this.state;
    const handleNameChange = event => {
      const obj = Object.assign(this.props.meusProdutos, {
        nome_relatorio: event.target.value
      });

      this.props.getProdutosData(obj);
    };

    const handleInputDisable = () => {
      this.setState({ disabled: !this.state.disabled });
    };

    const handleEditData = async () => {
      const {
        id_usuario,
        nome_relatorio,
        // img_relatorio,
        // data_criacao,
        // produto_tags,
        // referencia_tags,
        id
      } = this.props.meusProdutos;
      try {
        if (this.props.meusProdutos.id) {
          await axios.post(`${BASE_URL}/myProducts/editRelatoryName`, {
            id_relatorio: id,
            id_usuario: id_usuario,
            nome_relatorio: nome_relatorio
          });
          this.props.enqueueSnackbar("Salvo com Sucesso.", {
            variant: "success"
          });
        }
        this.setState({ disabled: true });
      } catch (error) {
        if (error.response.status === 409) {
          this.props.enqueueSnackbar("Nome do Relatório já existe.", {
            variant: "error"
          });
        } else {
          this.props.enqueueSnackbar("Erro ao Salvar Seu Relatório.", {
            variant: "error"
          });
        }
      }
    };

    const handleDeleteCard = async () => {
      const { id } = this.props.meusProdutos;
      if (id) {
        try {
          await axios.delete(`${BASE_URL}/myProducts/deleteRelatory`, {
            data: {
              id_relatorio: id
            }
          });
          this.props.meusProdutos.deleted = true;
          this.props.enqueueSnackbar("Relatório Deletado com Sucesso.", {
            variant: "success"
          });
          this.props.removeSelf();
          this.setState({ open: false });
        } catch (error) {
          console.log("Error Deleting your relatory:", error);
          this.props.enqueueSnackbar("Erro ao Deletar Sua Coleção.", {
            variant: "error"
          });
          this.setState({ open: false });
        }
      }
    };

    const handleClickOpen = async () => {
      this.setState({ open: true });
    };

    const handleClose = () => {
      this.setState({ open: false });
    };

    const handleShareButton = () => {
      const url = `http://album-figurinhas.somalabs.com.br/relatorio?id_relatorio=${this.props.meusProdutos.id}`;
      if (window.clipboardData && window.clipboardData.setData) {
        return window.clipboardData.setData("Text", url);
      } else if (
        document.queryCommandSupported &&
        document.queryCommandSupported("copy")
      ) {
        const textarea = document.createElement("textarea");
        textarea.textContent = url;
        textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
          this.props.enqueueSnackbar("Link Copiado!", {
            variant: "info"
          });
          return document.execCommand("copy"); // Security exception may be thrown by some browsers.
        } catch (ex) {
          console.warn("Copy to clipboard failed.", ex);
          return false;
        } finally {
          document.body.removeChild(textarea);
        }
      }
    };

    return (
      <Fragment>
        <Grid item xs={12}>
          <Grow
            in={checked}
            style={{ transformOrigin: "0 0 0" }}
            {...(checked ? { timeout: 1300 } : {})}
          >
            <Container className={classes.root}>
              <Card className={classes.card} variant="outlined">
                <CardContent>
                  <Grid container justify="space-around" direction="row" alignItems="center">
                    <Grid item xs={6}>
                      <Input
                        fullWidth
                        defaultValue={nameCardBox}
                        onChange={handleNameChange}
                        placeholder="Nome relatório"
                        className={classes.input}
                        disabled={this.state.disabled && !this.props.isNewRelatory}
                        inputProps={{
                          "aria-label": "Description"
                        }}
                        value={this.props.meusProdutos.nome_relatorio || "Nome relatório"}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      {this.state.disabled && !this.props.isNewRelatory ? (
                        <CreateIcon
                          onClick={handleInputDisable}
                          className={classes.CreateIcon}
                        />
                      ) : (
                          <CheckIcon
                            color="primary"
                            className={classes.checkSave}
                            onClick={handleEditData}
                          />
                        )}
                      <DeleteIcon
                        // color="primary"
                        className={classes.deleteIcon}
                        onClick={handleClickOpen}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} justify="flex-end">
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
                        onClick={handleShareButton}
                      >
                        Compartilhar
                      </Button>
                    </CardActions>

                    <Dialog
                      open={this.state.open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Exclusão do Relatório"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Você tem certeza que deseja excluir o relatório?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          NÃO, PERA
                        </Button>
                        <Button
                          onClick={handleDeleteCard}
                          color="primary"
                          autoFocus
                        >
                          VAMOS
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>

                  <Grid item direction="row" justify="flex-end" container>
                    {/* <CardMedia
                  className={classes.cover}
                  // image={meusProdutos.imagemJanela}
                  title="Vitrine"
                /> */}
                  </Grid>
                </CardContent>
              </Card>
            </Container>
          </Grow>
        </Grid>
      </Fragment>
    );
  }
}

MyReporstsCards.propTypes = {
  classes: PropTypes.object.isRequired
};

const wrapperComponent = withStyles(styles)(
  withSnackbar(withRouter(MyReporstsCards))
);
export default wrapperComponent;
