import axios from 'axios';

// ⚠️ IMPORTANTE: CONFIGURACIÓN DE IP
// Si usas Emulador de Android Studio: usa 'http://10.0.2.2:8000'
// Si usas Celular Físico conectado a Wifi: usa la IP de tu PC, ej: 'http://192.168.1.15:8000'
// Si pruebas en Web (Navegador): usa 'http://127.0.0.1:8000'

const API_URL = 'http://127.0.0.1:8000'; // Configurado para Emulador por defecto

export const generarEjercicios = async (materiaUI, nivel, cantidad, onProblemaEncontrado) => {
  
  // Mapeo de materias
  let materiaApi = 'algebra';
  if (materiaUI.includes('Geometría')) materiaApi = 'geometry';
  if (materiaUI.includes('Cálculo')) materiaApi = 'calculus';

  for (let i = 0; i < cantidad; i++) {
    try {
      if (i > 0) await new Promise(r => setTimeout(r, 1000));

      const response = await axios.get(`${API_URL}/preguntas`, {
        params: { materia: materiaApi, nivel: nivel }
      });

      const nuevoProblema = {
        id: Date.now() + i,
        titulo: `Ejercicio #${i + 1}`,
        tema: materiaUI,
        contenidoCompleto: response.data.problemas
      };

      if (onProblemaEncontrado) {
        onProblemaEncontrado(nuevoProblema);
      }

    } catch (error) {
      console.error(`Error en ejercicio ${i+1}:`, error);
    }
  }
};