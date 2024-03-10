import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return(
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={username}
              onChange={e=>setUsername(e.target.value)}
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={e=>setPassword(e.target.value)}
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            
          </Box>
        </Box>
      </Container>

  )

  
  // return (
  //       <form className="formPanel" onSubmit={login}>
  //       <h2>Login</h2>
  //       {errors.loginMessage && (
  //         <h3 className="alert" role="alert">
  //           {errors.loginMessage}
  //         </h3>
  //       )}
  //       <div>
  //         <label htmlFor="username">
  //           Username:
  //           <input
  //             type="text"
  //             name="username"
  //             required
  //             value={username}
  //             onChange={(event) => setUsername(event.target.value)}
  //           />
  //         </label>
  //       </div>
  //       <div>
  //         <label htmlFor="password">
  //           Password:
  //           <input
  //             type="password"
  //             name="password"
  //             required
  //             value={password}
  //             onChange={(event) => setPassword(event.target.value)}
  //           />
  //         </label>
  //       </div>
  //       <div>
  //         <input className="btn" type="submit" name="submit" value="Log In" />
  //       </div>
  //     </form>
    
  // );
}

export default LoginForm;
