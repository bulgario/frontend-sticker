import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Error from '@material-ui/icons/Error'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
import { Redirect } from 'react-router-dom'
import RecoveryCheck from '@material-ui/icons/CheckCircleOutline';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';


import { signIn } from '../actions'
import User from "../services/User";


const USER_EMPTY = 'Usuário não preenchido!'
const PASS_EMPTY = 'Senha não preenchida!'
const CREDENTIALS_ERROR = 'Usuário ou senha incorretos!'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 'auto',
  },
  grid: {
    marginTop: theme.spacing(2),
  },
  loadingCircle: {
    padding: theme.spacing(3),
    textAlign: 'center',
  },
  main: {
    marginTop: theme.spacing(6),
  },
  button: {
    margin: theme.spacing(2),
  },
  pointer: {
    cursor: 'pointer',
  },
  logo: {
    width: 180,
    margin: theme.spacing(2),
  },
  margin:{
    margin: theme.spacing(2)
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      showPassword: false,
      usernameError: false,
      passwordError: false,
      recoveryError: false,
      recoverySubmitted: false,
      recoveryShow: false,

    }
  }

  resetErrors = () => {
    this.setState({
      usernameError: false,
      passwordError: false,
      recoveryError: false,
    })
  }

  handleChange = (prop) => eve => {
    this.setState({ [prop]: eve.target.value })
    this.resetErrors()
  }
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSignIn = (eve) => {
    // eve.preventDefault()
    const { username, password } = this.state

    if(username && password) {
      this.setState({ loginSubmitted: true })
      return this.props.signIn(username, password)
    }

    if (!username && !password) {
      return this.setState({
        usernameError: USER_EMPTY,
        passwordError: PASS_EMPTY,
      })
    }

    if(!username) {
      return  this.setState({ usernameError: USER_EMPTY })
    }

    return this.setState({ passwordError: PASS_EMPTY })
  }


  handleKeyPress = (eve) => {
    if (eve.key === 'Enter') {
      this.handleSignIn()
    }
  }

  getErrorMessage() {
    if (this.state.loginSubmitted) {
      return (
        <Fragment>
          <Error color={'error'} fontSize={'small'} />
          <Typography variant={'body2'} gutterBottom color={'error'}>
            {CREDENTIALS_ERROR}
          </Typography>
        </Fragment>
      );
    }
    return null;
  }

  getRecovery() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Grid item xs={1}>
          <RecoveryCheck color={'primary'} fontSize={'large'} />
        </Grid>
        <Grid item xs={9}>
          <Typography>
            Enviamos um e-mail com instruções para acessar sua conta.
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            fullWidth
            onClick={this.handleGoBack}
          >
            Voltar
          </Button>
        </Grid>
      </Fragment>
    );
  }

  getLoginForm() {
    if (this.props.recoverySuccess) {
      return this.getRecovery();
    }

    const { classes, loading } = this.props;
    const { usernameError, passwordError, showPassword, username, password } = this.state;

    if (loading) {
      return (
        <Grid item xs={10} className={classes.loadingCircle}>
          <CircularProgress />
        </Grid>
      );
    }

    return (
      <Fragment>
        {this.getErrorMessage()}
        <Grid item xs={10}>
          <TextField
            id={'username'}
            error={!!usernameError}
            className={classes.margin}
            variant={'outlined'}
            fullWidth
            autoFocus
            label={'Usuário'}
            value={username}
            onChange={this.handleChange('username')}
            helperText={usernameError}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            id={'password'}
            error={!!passwordError}
            className={classes.margin}
            variant={'outlined'}
            fullWidth
            label={'Senha'}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={this.handleChange('password')}
            onKeyUp={e => this.handleKeyPress(e)}
            helperText={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Mostrar senha"
                    onClick={this.handleClickShowPassword}
                    color={'primary'}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            fullWidth
            onClick={this.handleSignIn}
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography
            align="center"
            gutterBottom
            onClick={this.handleForgotPassword}
          >
            <span className={classes.pointer}>
              Esqueceu sua senha?
            </span>
          </Typography>
        </Grid>
      </Fragment>
    );
  }

  getContent() {
    const { classes } = this.props;

    return (
      <Grid item xs={12} sm={4} className={classes.grid}>
        <Paper className={classes.main}>
          <Grid container item justify={'center'}>
            <CardMedia
              component={'img'}
              src={'http://desenvolvimento.somagrupo.com.br/img/soma_trans.png'}
              title="Grupo Soma"
              height={'45'}
              className={classes.logo}
            />
          </Grid>

          <Grid container justify={'center'} spacing={24}>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>
            {this.getLoginForm()}
          </Grid>
        </Paper>
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;
    const user = new User()

    if (user.getUser()) {
      return (
        <Redirect from={'/login'} to={'/'} />
      );
    }

    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Grid container justify={'center'} alignItems={'center'} className={classes.grid}>
            {this.getContent()}
          </Grid>
        </div>
      </Fragment>
    );
  }
}
const wrappedLogin = withStyles(styles)(Login)

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  recoverySuccess: state.auth.recovery,
  authToken: state.auth.token,
})

const mapDispatchToProps = dispatch => ({
  signIn: (username, password) => dispatch(signIn(username, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(wrappedLogin)