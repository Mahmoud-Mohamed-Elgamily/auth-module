import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Link,
  Snackbar,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { signUp } from '../../apis/auth';

const defaultTheme = createTheme();

export default function Register() {
  const [open, setOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const [FormData, setFormData] = useState({
    email: '',
    password: '',
    verifyPassword: '',
    name: '',
  });

  const updateFormData = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (FormData.password == FormData.verifyPassword)
      signUp(FormData.email, FormData.password, FormData.name);
    else {
      setSnackBarMessage('Password and verify Password not matching');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  value={FormData.name}
                  onChange={updateFormData}
                  required
                  fullWidth
                  id="name"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={FormData.email}
                  onChange={updateFormData}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={FormData.password}
                  onChange={updateFormData}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="verifyPassword"
                  value={FormData.verifyPassword}
                  onChange={updateFormData}
                  label="Verify Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={snackBarMessage}
      />
    </ThemeProvider>
  );
}
