import React, { Fragment } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";

import BoxCompany from "./recursableComponents/BoxCompany";
import CardActions from "@material-ui/core/CardActions";

import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

import Fab from "@material-ui/core/Fab";

import { signIn } from "../actions";
import { programacoes } from "../consts";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const styles = theme => ({
  margin: {
    margin: theme.spacing(1)
    // maxWidth: 345,
  },
  media: {
    height: 400,
    width: 280
  },
  card: {
    maxWidth:400,
    height: 420,
    minWidth: 300,
    margin: theme.spacing(1),
    padding:0,
    backgroundColor:'#fafafa'
    // marginLeft:0
  },
  mediaCard: {
    height: 420,
    width: 180,
    contain:'size'
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
      programacoes,
      expanded: false
    };
  }
  renderProgramacoes() {
    const { programacoes } = this.state;
    const { classes } = this.props;
    return programacoes.map(data => {
      return (
        <Grid item direction="column">
          <Typography variant="h5" className={classes.dateText}>
            {data.date}
          </Typography>
          <Divider variant="middle" className={classes.divider}></Divider>

          {/* {this.renderProductsInstaView(data)} */}
          {this.state.expanded?this.renderProductsCardsViewWithOutInfo(data):this.renderProductsCardsView(data)}
        </Grid>
      );
    });
  }

  // handleChange() {
  //   this.setState({expanded:!this.state.expanded})
  // };

  renderProductsCardsView({ produtos, date }) {
    const { classes } = this.props;
    return (
      <Grid className={classes.horizontalScroll}>
        {produtos.map(produto => {
          return (
            <Card className={classes.card}>
              <Grid container direction="row" justify="flex-start">
                <Grid>
                  <CardMedia
                    className={classes.mediaCard}
                    image={produto.fotos[0].link}
                    title="Produto"
                  />
                                <CardActions disableSpacing>
                                <Typography>opa</Typography>

              </CardActions>
                  
                </Grid>
                <Grid
                  direction="column"
                >
 

               <Typography>opa</Typography>
                </Grid>
              </Grid>
              <Grid></Grid>
            </Card>
          );
        })}
      </Grid>
    );
  }
  renderProductsCardsViewWithOutInfo({ produtos, date }) {
    const { classes } = this.props;
    return (
      <Grid className={classes.horizontalScroll}>
        {produtos.map(produto => {
          return (
            <Card className={classes.margin}>
              <Grid container direction="row" justify="flex-start">
                <Grid>
                  <CardMedia
                    className={classes.media}
                    image={produto.fotos[0].link}
                    title="Produto"
                  />
                                <CardActions disableSpacing>
                                <Typography>opa</Typography>

              </CardActions>
                  
                </Grid>
              </Grid>
              <Grid></Grid>
            </Card>
          );
        })}
      </Grid>
    );
  }

  renderProductsInstaView({ produtos, date }) {
    const { classes } = this.props;
    return (
      <Grid className={classes.horizontalScroll}>
        {produtos.map(produto => {
          return (
            <Card className={classes.margin}>
              <CardMedia
                className={classes.media}
                image={produto.fotos[0].link}
                title="Produto"
              />

              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
      </Grid>
    );
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
          <FormControlLabel
            control={
              <Switch
                checked={this.state.expanded}
                onChange={() =>
                  this.setState({ expanded: !this.state.expanded })
                }
              />
            }
            label="Show"
          />

          <div className={classes.margin}>
            <Grid container direction="column" spacing={2}>
              {this.renderProgramacoes()}
            </Grid>
          </div>
        </Container>
        <Grid container justify="center">
          <Fab aria-label={"Add"} className={classes.fab} color={"primary"}>
            <AddIcon />
          </Fab>
        </Grid>
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
