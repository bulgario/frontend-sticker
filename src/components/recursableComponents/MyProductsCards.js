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

const axios = require("axios");

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
  }
});

class MyProductsCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderCard: false
    };
  }

  render() {
    const { classes, imagemJanela, nameCardBox } = this.props;

    const handleNameChange = value => {
      const nameBoxProducts = value.target.value;
      const { idUser } = this.props;
      // AQUI TEM O ID DO USUARIO SENDO PASSADO + O NOME QUE SERÁ SALVO
      // axios.get()
    };

    return (
      <Container className={classes.root}>
        <Card className={classes.card} variant="outlined">
          <CardContent>
            <Grid item className={classes.gridItem}>
              <Input
                defaultValue={nameCardBox}
                onChange={value => handleNameChange(value)}
                placeholder="Nome Coleção"
                className={classes.input}
                inputProps={{
                  "aria-label": "Description"
                }}
              />
              <CardActions className={classes.controls}>
                <Button
                  className={classes.button}
                  color="primary"
                  onClick={() => this.props.history.push(this.props.redirectTo)}
                >
                  Acessar
                </Button>
                <Button
                  className={classes.button}
                  color="primary"
                  onClick={() => this.props.history.push(this.props.redirectTo)}
                >
                  Compartilhar
                </Button>
              </CardActions>
              <Grid item>
                <CardMedia
                  className={classes.cover}
                  image={imagemJanela}
                  title="Vitrine"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

const wrapperComponent = withStyles(styles)(
  withSnackbar(withRouter(MyProductsCards))
);
export default wrapperComponent;
