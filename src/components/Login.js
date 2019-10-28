import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Error from '@material-ui/icons/Error'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import withStyles from '@material-ui/core/styles/withStyles'
import Container from '@material-ui/core/Container'
import { Redirect } from 'react-router-dom'

import logoSoma from '../img/logo_grupo_soma_PRETO.png'
import altLogoSoma from '../img/logo_grupo_soma_final_BRANCO.png'

import { signIn } from '../actions'

const styles = theme => ({})

const USER_EMPTY = 'Usuário não preenchido!'
const PASS_EMPTY = 'Senha não preenchida!'
const CREDENTIALS_ERROR = 'Usuário ou senha incorretos!'

const addDefault = eve => {
  let srcSoma = logoSoma
  let src = eve.target.src
  src !== true ? src = srcSoma : eve.target.alt = src
}
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

  handleSignIn = (eve) => {
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

  componentDidUpdate() {
    if (!this.state.usernameError && this.props.error && this.state.recoverySubmitted) {
      this.setState(() => ({
        usernameError: this.props.error,
        recoverySubmitted: false,
      }))
    }
  }

  handleKeyPress = (eve) => {
    if (eve.key === 'Enter') {
      this.handleSignIn()
    }
  }

  getErrorMessage = () => {
    if (this.state.loginSubmitted) {
      return (
        <Fragment>
          <Error color={'error'} fontSize={'small'} />
          <Typography variant={'body2'} gutterBottom color={'error'}>
            {CREDENTIALS_ERROR}
          </Typography>
        </Fragment>
      )
    }
    return null
  }

  render() {
    const { classes, authToken } = this.props

    if (authToken) {
      return (
        <Redirect from={'/login'} to={'/search'} />
      );
    }
    
   return (
      <Fragment>
        {this.getErrorMessage()}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div >
          <img
            onError={addDefault}
            src={logoSoma}
            alt={altLogoSoma}
          >
          </img>
          <form noValidate>
            <TextField
              id={'username'}
              variant={'outlined'}
              margin="normal"
              required
              fullWidth
              autoComplete="user"
              autoFocus
              label={'Usuário'}
              onChange={this.handleChange('username')}
            />
            <TextField
              id={'password'}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoComplete="current-password"
              autoFocus
              label={'Senha'}
              onChange={this.handleChange('password')}
              onKeyUp={this.handleKeyPress}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.handleSignIn}
            >
              Entrar
          </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu sua senha?
              </Link>''
            </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container>
      </Fragment>
    )
  }
}

const wrappedLogin = withStyles(styles)(Login)

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  recoverySuccess: state.auth.recovery,
  authToken: state.auth.authToken,
})

const mapDispatchToProps = dispatch => ({
  signIn: (username, password) => dispatch(signIn(username, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(wrappedLogin)