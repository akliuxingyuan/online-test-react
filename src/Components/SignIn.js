/*
 * @Author: akliuxingyuan
 * @Date: 2021-03-13 14:37:12
 * @Description: SignIn Page
 */
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import history from '../utils/history';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://onlinetest.liuxingyuan.cc/">
        onlinetest.liuxingyuan.cc
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.post(process.env.REACT_APP_API + 'signin/', {
      username: event.target.username.value,
      password: event.target.password.value
    }, {
      responseType: 'json',
      withCredentials: true
    })
      .then(response => {
        // 使用浏览器本地存储保存token
        if (event.target.remember.checked) {
          // 记住登录
          sessionStorage.clear();
          localStorage.token = response.data.token;
          localStorage.user_id = response.data.user_id;
          localStorage.username = response.data.username;
        } else {
          // 未记住登录
          localStorage.clear();
          sessionStorage.token = response.data.token;
          sessionStorage.user_id = response.data.user_id;
          sessionStorage.username = response.data.username;
        }
        // 跳转页面
        history.push('/MainPage');
      })
      .catch(error => {
        if (error.response.status === 400) {
          this.error_pwd_message = '用户名或密码错误';
        } else {
          this.error_pwd_message = '服务器错误';
        }
        this.error_pwd = true;
        alert("error")
      })
  }

  checkStatus() {
    if (localStorage.token || sessionStorage.token) {
      setTimeout(() => {
        history.push('/MainPage')
      }, 500);
    }
  }

  render() {
    const { classes } = this.props;
    this.checkStatus();
    return (
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" id="remember" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
              </Link>
              </Grid>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withStyles(useStyles)(SignIn)