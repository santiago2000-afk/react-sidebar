import React, { useState } from 'react';
import { Container, TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(5),
  backgroundColor: '#ffffff',
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
}));

const InputField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    dui: '',
    casa: '',
    contacto: '',
    qrKey: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.nombre = formData.nombre ? "" : "Este campo es requerido.";
    tempErrors.dui = formData.dui ? "" : "Este campo es requerido.";
    tempErrors.casa = formData.casa ? "" : "Este campo es requerido.";
    tempErrors.contacto = formData.contacto ? "" : "Este campo es requerido.";
    tempErrors.qrKey = formData.qrKey ? "" : "Este campo es requerido.";
    
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Datos del formulario:', formData);

    }
  };

  return (
    <Container maxWidth="sm">
      <FormContainer>
        <Typography variant="h4" gutterBottom>
          Formulario de Visitas
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField
                name="nombre"
                label="Nombre"
                fullWidth
                value={formData.nombre}
                onChange={handleChange}
                {...(errors.nombre && { error: true, helperText: errors.nombre })}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="dui"
                label="DUI"
                fullWidth
                value={formData.dui}
                onChange={handleChange}
                {...(errors.dui && { error: true, helperText: errors.dui })}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="casa"
                label="Casa"
                fullWidth
                value={formData.casa}
                onChange={handleChange}
                {...(errors.casa && { error: true, helperText: errors.casa })}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="contacto"
                label="Contacto"
                fullWidth
                value={formData.contacto}
                onChange={handleChange}
                {...(errors.contacto && { error: true, helperText: errors.contacto })}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="qrKey"
                label="QR Key"
                fullWidth
                value={formData.qrKey}
                onChange={handleChange}
                {...(errors.qrKey && { error: true, helperText: errors.qrKey })}
              />
            </Grid>
            <Grid item xs={12}>
              <SubmitButton type="submit" variant="contained" color="primary" fullWidth>
                Enviar
              </SubmitButton>
            </Grid>
          </Grid>
        </form>
      </FormContainer>
    </Container>
  );
};

export default Formulario;