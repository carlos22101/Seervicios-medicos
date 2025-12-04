const API_URL = 'http://34.198.88.1';

export const pacientesService = {
  
  // --- OBTENER MIS PACIENTES ---
  // Ruta: GET /pacientes/mis-pacientes
  async getMisPacientes(token) {
    try {
      const response = await fetch(`${API_URL}/pacientes/mis-pacientes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener la lista de pacientes');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // --- CREAR PACIENTE (Médico) ---
  // Ruta: POST /pacientes/ (La reutilizamos si el médico también crea)
  async createPaciente(data, token) {
    try {
      const response = await fetch(`${API_URL}/pacientes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || 'Error al crear paciente');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }
};