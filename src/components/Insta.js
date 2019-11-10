import React, { Fragment } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import BoxCompany from "./recursableComponents/BoxCompany";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

import logoSoma from "../img/logo_grupo_soma_PRETO.png";

import { signIn } from "../actions";
import { programacoes } from "../consts";

const styles = theme => ({
  margin: {
    margin: theme.spacing(1)
    // maxWidth: 345,
  },
  media: {
    height: 400,
    width: 280
    // paddingTop: '56.25%', // 16:9
  },
  dateText: {
    textAlign:'center'
  }
});

class Insta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false,
      usernameError: false,
      passwordError: false,
      recoveryError: false,
      recoverySubmitted: false,
      recoveryShow: false,
      programacoes
    };
  }
  renderProgramacoes() {
    const { programacoes, } = this.state;
    const { classes } = this.props
    return (
        programacoes.map(data => {
          return (
            <Grid item direction="column">
              <Typography variant="h5" className={classes.dateText} >{data.date}</Typography>
              {this.renderProductsByDate(data)}
            </Grid>
          );
        })
    );
  }

  renderProductsByDate({ produtos, date }) {
    const { classes } = this.props
    return <Grid container direction="row" justify="center">
              {produtos.map(produto => {    return                <Card className={classes.margin}>
                    <CardMedia
                      className={classes.media}
                      image={produto.fotos[0].link}
                      title="Produto"
                    />

                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>

              })}

    </Grid>
  }

  render() {
    const { classes, authToken } = this.props;

    // if (authToken) {
    //   return (
    //     <Redirect to={'/Login'} />
    //   );
    // }

    return (
      <Fragment>
        <BoxCompany insta={true} />

        <Container>
          <div className={classes.margin}>
            <Grid container direction="row" flexWrap="wrap">
              <Grid container direction='column' spacing={2}>

              
              {this.renderProgramacoes()}
              </Grid>
              {/* {this.state.programacoes.map(a => {
                return (
                  <Card className={classes.margin}>
                    <CardMedia
                      className={classes.media}
                      image="http://soma-images.somalabs.com.br/image/6000-produto_estilo-6000_1.jpg/300/500"
                      title="Produto"
                    />

                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                );
              })} */}
            </Grid>
          </div>
        </Container>
      </Fragment>
    );
  }
}

const wrappedInsta = withStyles(styles)(Insta);

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  recoverySuccess: state.auth.recovery,
  authToken: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  signIn: (username, password) => dispatch(signIn(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrappedInsta);
