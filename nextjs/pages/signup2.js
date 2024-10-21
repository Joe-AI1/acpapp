import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Paper, Box } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Link from 'next/link';  // Import Next.js Link

export default function Signup() {
  const [registerName, setRegisterName] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState(''); // Country input
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    // Password match validation
    if (registerPassword !== registerConfirmPassword) {
      setSnackbarMessage('Passwords do not match');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    // Registration logic to send data to backend API
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: registerName,
          password: registerPassword,
          email: email,
          age: parseInt(age),
          country_code: country,  // Send country code
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbarMessage('Registration successful');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      } else {
        setSnackbarMessage(data.detail || 'Registration failed');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage('Registration failed');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#1c1c1e',
        color: 'white',
      }}
    >
      <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Logo</Typography>
        <Box>
          <Link href="/login" passHref>
            <Button sx={{ color: 'white', border: '1px solid white', marginRight: '8px' }}>Sign in</Button>
          </Link>
          <Link href="/signup" passHref>
            <Button variant="contained" sx={{ backgroundColor: 'white', color: 'black' }}>Register</Button>
          </Link>
        </Box>
      </Box>

      <Grid container justifyContent="center" alignItems="center" sx={{ flexGrow: 1 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: '30px', backgroundColor: '#333', color: 'white' }}>
            <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
              Sign up
            </Typography>
            <form onSubmit={handleRegisterSubmit}>
              <TextField
                fullWidth
                label="Name"
                variant="filled"
                margin="normal"
                InputLabelProps={{ style: { color: 'white' } }}
                sx={{ input: { color: 'white' }, backgroundColor: '#1c1c1e' }}
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                variant="filled"
                margin="normal"
                type="password"
                InputLabelProps={{ style: { color: 'white' } }}
                sx={{ input: { color: 'white' }, backgroundColor: '#1c1c1e' }}
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <TextField
                fullWidth
                label="Confirm-Password"
                variant="filled"
                margin="normal"
                type="password"
                InputLabelProps={{ style: { color: 'white' } }}
                sx={{ input: { color: 'white' }, backgroundColor: '#1c1c1e' }}
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
              />
              <TextField
                fullWidth
                label="Email"
                variant="filled"
                margin="normal"
                type="email"
                InputLabelProps={{ style: { color: 'white' } }}
                sx={{ input: { color: 'white' }, backgroundColor: '#1c1c1e' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Age"
                variant="filled"
                margin="normal"
                InputLabelProps={{ style: { color: 'white' } }}
                sx={{ input: { color: 'white' }, backgroundColor: '#1c1c1e' }}
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <TextField
                fullWidth
                label="Country"
                variant="filled"
                margin="normal"
                InputLabelProps={{ style: { color: 'white' } }}
                sx={{ input: { color: 'white' }, backgroundColor: '#1c1c1e' }}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <Button variant="contained" color="primary" fullWidth type="submit" sx={{ marginBottom: '16px' }}>
                Submit
              </Button>
              <Typography variant="body2" align="center">
                Already have an account?{' '}
                <Link href="/login" sx={{ color: 'white' }} passHref>
                  Log in
                </Link>
              </Typography>
            </form>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
