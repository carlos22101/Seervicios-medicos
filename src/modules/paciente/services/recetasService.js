const API_URL = 'http://98.94.250.137:8000';

export const recetasService = {
  
  // --- OBTENER RECETAS DE HOY (O DEL PACIENTE) ---
  // Ruta: GET /recetas/mis-recetas/hoy
  async getMisRecetas(token) {
    try {
      const response = await fetch(`${API_URL}/recetas/mis-recetas/hoy`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener tus recetas');
      }

      const data = await response.json();
      // Aseguramos devolver siempre un array, aunque la API devuelva un solo objeto
      return Array.isArray(data) ? data : [data];
    } catch (error) {
      throw error;
    }
  },

  // --- DESCARGAR PDF (Helper para construir la URL) ---
  // Si tu API sirve estáticos, ajusta esta URL. Si no, usamos el nombre del archivo.
  getPdfUrl(nombreArchivo) {
    if (!nombreArchivo) return '#';
    // Ejemplo: Si el backend sirve archivos en /static/ o /uploads/
    // Ajusta esto según donde tu backend guarde los archivos públicos
    return `${API_URL}/uploads/${nombreArchivo}`; 
  }
};