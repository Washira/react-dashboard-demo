import React, { useState, useEffect, useRef } from 'react'
// import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
// import FieldError from '../../modules/TM/src/components/FieldError';
// import { AppContext } from '../../contexts/AppStore';
// import { AuthProvider } from '../../contexts/AuthProvider';
import queryString from 'query-string';
import base64 from 'base-64';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../apis/axios';

const LOGIN_URL = '/auth';

// The bypass user object for auto sign-in.
let bypassUser = {
  username: process.env.REACT_APP_USERNAME || '',
  password: process.env.REACT_APP_PASSWORD || '',
  extension: process.env.REACT_APP_EXTENSION || '',
}

// Parse URL query string into an object.
let urlParamObject = queryString.parse(window.location.search);

// Detect is auto sign-in via Cisco Finesse?
const isAutoSignInByFinesse = urlParamObject.token && urlParamObject.extension;

// Decoding the simple base64 authentication.
if (isAutoSignInByFinesse) {
  const decodedToken = base64.decode(urlParamObject.token);
  const [username, password] = decodedToken.split(':');
  bypassUser.username = username;
  bypassUser.password = password;
  bypassUser.extension = urlParamObject.extension;
}

// Spliting login images based on build target.
const imageLogo = `${process.env.PUBLIC_URL}/${process.env.REACT_APP_BUILD_TARGET}/image-logo.jpg`
const imageWallpaper = `${process.env.PUBLIC_URL}/wallpaper.jpg`

// Material-UI style of the component
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${imageWallpaper})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
  unauthorized: {
    color: '#ff4e4e',
    textAlign: 'center',
    paddingLeft: '4px',
    fontWeight: '500',
  },
}));

const LoginPage = (props) => {
  const { setAuth, persist, setPersist } = useAuth();
  // const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  // const { setLoginUser } = useContext(AppContext)
  // const [errorReason, setErrorReason] = useState('');
  // const loginButtonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  // Perform click login button if auto sign-in.
  // useEffect(() => {
  //   if (isAutoSignInByFinesse) {
  //     loginButtonRef.current.click();
  //     bypassUser.username = '';
  //     bypassUser.password = '';
  //     bypassUser.extension = '';
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 404) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  }

  // const togglePersist = () => {
  //   setPersist(!persist);
  // }

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist])

  return (
    <Grid container component="main" className={classes.root}>

      {/* Left */}
      <Grid item xs={false} sm={false} md={9} className={classes.image} />

      {/* Right */}
      <Grid item xs={12} sm={12} md={3} component={Paper} elevation={6} square>
        <div className={classes.paper}>

          {/* Logo */}
          <img src={imageLogo} height="100" alt="" />

          {/* Form */}
          <form
            className={classes.form}
            onSubmit={handleSubmit}
          >

            {/* Error Reason */}
            {errMsg && (
              <span ref={errRef} className={classes.unauthorized}>{errMsg}</span>
            )}

            <TextField
              label={t('Username')}
              fullWidth
              margin="normal"
              variant="outlined"
              value={user}
              ref={userRef}
              id="username"
              onChange={(e) => setUser(e.target.value)}
            />

            <TextField
              label={t('Password')}
              fullWidth
              type="password"
              margin="normal"
              variant="outlined"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
                
            {/* SignIn Button */}
            <Button
              // ref={loginButtonRef}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {t('Login')}
            </Button>
            <div>
              <input
                  type="checkbox"
                  id="persist"
                  onChange={props.togglePersist}
                  checked={persist}
              />
              <label htmlFor="persist">Trust This Device</label>
            </div>

          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default LoginPage;