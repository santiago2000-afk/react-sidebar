import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Avatar,
  CssBaseline,
  Paper,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../api';

const theme = createTheme();

interface IFormInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { handleSubmit, control, formState: { errors } } = useForm<IFormInput>();
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (data: IFormInput) => {
    try {
      const response = await api.post('/api/login', data);

      if (response.status === 200) {
        setLoginError(null);
        // Navegación después del inicio de sesión exitoso
        // Ejemplo usando useHistory de react-router-dom:
        // history.push('/dashboard/home');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setLoginError('Credenciales inválidas');
      } else {
        setLoginError('Error al iniciar sesión. Intente nuevamente.');
      }
      console.error('Error al iniciar sesión:', error.response?.data || error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#0F4C75',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Paper
            elevation={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              borderRadius: '10px',
              backgroundImage: 'linear-gradient(to right, #0F4C75, #3282B8)',
              color: 'white',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#1B262C' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sesión
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: 'El correo electrónico es obligatorio',
                  pattern: {
                    value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                    message: 'Correo electrónico no válido',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Correo Electrónico"
                    autoComplete="email"
                    autoFocus
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                    InputProps={{ style: { color: 'white' } }}
                    InputLabelProps={{ style: { color: 'white' } }}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: 'La contraseña es obligatoria' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Contraseña"
                    type="password"
                    autoComplete="current-password"
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ''}
                    InputProps={{ style: { color: 'white' } }}
                    InputLabelProps={{ style: { color: 'white' } }}
                  />
                )}
              />
              {loginError && <Alert severity="error">{loginError}</Alert>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: '#1B262C', color: 'white' }}
              >
                Iniciar Sesión
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;