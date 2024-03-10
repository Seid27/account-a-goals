import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        f_name: firstName,
        l_name: lastName
      },
    });
  }; // end registerUser

  return(

    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
            <AppRegistrationIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={registerUser} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={firstName}
              onChange={e=>setFirstName(e.target.value)}
              id="firstName"
              label="First Name"
              name="firstName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={lastName}
              onChange={e=>setLastName(e.target.value)}
              name="lastName"
              label="Last Name"
              type="text"
              id="lastName"
            />
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
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
  )

  // return (
  //   <form className="formPanel" onSubmit={registerUser}>
  //     <h2>Register User</h2>
  //     {errors.registrationMessage && (
  //       <h3 className="alert" role="alert">
  //         {errors.registrationMessage}
  //       </h3>
  //     )}
  //     <div>
  //       <label htmlFor="username">
  //         Username:
  //         <input
  //           type="text"
  //           name="username"
  //           value={username}
  //           required
  //           onChange={(event) => setUsername(event.target.value)}
  //         />
  //       </label>
  //     </div>
  //     <div>
  //       <label htmlFor="firstName">
  //         First Name:
  //         <input
  //           type="text"
  //           name="firstName"
  //           value={firstName}
  //           required
  //           onChange={(event) => setFirstName(event.target.value)}
  //         />
  //       </label>
  //     </div>
  //     <div>
  //       <label htmlFor="lastName">
  //         Last Name:
  //         <input
  //           type="text"
  //           name="lastName"
  //           value={lastName}
  //           required
  //           onChange={(event) => setLastName(event.target.value)}
  //         />
  //       </label>
  //     </div>
  //     <div>
  //       <label htmlFor="password">
  //         Password:
  //         <input
  //           type="password"
  //           name="password"
  //           value={password}
  //           required
  //           onChange={(event) => setPassword(event.target.value)}
  //         />
  //       </label>
  //     </div>

  //     <div>
  //       <label htmlFor="phone">
  //         Phone Number:
  //         <input
  //           type='phone'
  //           name="phone"
  //         />
  //       </label>
  //     </div>
  //     <div>
  //       <input className="btn" type="submit" name="submit" value="Register" />
  //     </div>
  //   </form>
  // );
}

export default RegisterForm;
