import React, { Fragment } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import { Redirect } from "react-router-dom";
import BoxCompany from "./recursableComponents/BoxCompany";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import logoSoma from "../img/logo_grupo_soma_PRETO.png";

import { signIn } from "../actions";

const styles = theme => ({
  margin: {
      margin:theme.spacing(1)
    // maxWidth: 345,
  },
  media: {
    height: 400,
    width: 280
    // paddingTop: '56.25%', // 16:9
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
      recoveryShow: false
    };
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
            {[0, 1, 2, 3].map(a => {
              return (
                <Card className={classes.margin}>
                  <CardMedia
                    className={classes.media}
                    image="http://soma-images.somalabs.com.br/image/6000-produto_estilo-6000_1.jpg/300/500"
                    title="Paella dish"
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
            })}
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
