import { useState } from "react";
import {
  TextField,
  Button,
  LinearProgress,
  Box,
  Container,
  Typography,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

const FormularioProgreso = () => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    genero: "",
    equipo: "",
    hobbies: "",
    satisfaccion: "",
  });

  // Estado para mostrar el mensaje de éxito
  const [enviado, setEnviado] = useState(false);

  // Calcular progreso
  const camposTotales = Object.keys(formData).length;
  const camposLlenos = Object.values(formData).filter(
    (val) => val.trim() !== ""
  ).length;
  const progreso = (camposLlenos / camposTotales) * 100;

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejo de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (camposLlenos < camposTotales) {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }

    // Mostrar mensaje de éxito
    setEnviado(true);

    // Reiniciar el formulario después de 5 segundos
    setTimeout(() => {
      setFormData({
        nombre: "",
        genero: "",
        equipo: "",
        hobbies: "",
      });
      setEnviado(false);
    }, 5000);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h5">Formulario</Typography>

        {/* Barra de progreso */}
        <Box sx={{ width: "100%", my: 2 }}>
          <LinearProgress variant="determinate" value={progreso} />
          <Typography variant="body2" sx={{ mt: 1 }}>
            {Math.round(progreso)}% completado
          </Typography>
        </Box>

        {/* Mensaje de enviado */}
        {enviado && (
          <Alert severity="success" sx={{ mb: 2 }}>
            ¡Formulario enviado con éxito!
          </Alert>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            variant="outlined"
            margin="normal"
            value={formData.nombre}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Género"
            name="genero"
            variant="outlined"
            margin="normal"
            value={formData.genero}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Equipo Favorito"
            name="equipo"
            variant="outlined"
            margin="normal"
            value={formData.equipo}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Hobbies"
            name="hobbies"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={formData.hobbies}
            onChange={handleChange}
          />

          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Nivel de satisfacción</FormLabel>
            <RadioGroup
              name="satisfaccion"
              value={formData.satisfaccion}
              onChange={handleChange}
            >
              <FormControlLabel
                value="muy_satisfecho"
                control={<Radio />}
                label="Muy satisfecho"
              />
              <FormControlLabel
                value="satisfecho"
                control={<Radio />}
                label="Satisfecho"
              />
              <FormControlLabel
                value="neutral"
                control={<Radio />}
                label="Neutral"
              />
              <FormControlLabel
                value="insatisfecho"
                control={<Radio />}
                label="Insatisfecho"
              />
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={camposLlenos < camposTotales}
          >
            Enviar
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default FormularioProgreso;
