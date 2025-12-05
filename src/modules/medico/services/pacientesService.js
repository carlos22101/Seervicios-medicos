const API_URL = 'http://98.94.250.137:8000';

export const pacientesService = {
  
  // --- OBTENER MIS PACIENTES ---
  async getMisPacientes(token) {
    const response = await fetch(`${API_URL}/pacientes/mis-pacientes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) throw new Error('Error al obtener la lista de pacientes');
    return await response.json();
  },

  // --- CREAR PACIENTE ---
  async createPaciente(data, token) {
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
  },

  // --- ASIGNAR PACIENTE ---
  async asignarPaciente(idPaciente, token) {
    const response = await fetch(`${API_URL}/pacientes/asignar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id_paciente: idPaciente }),
    });

    if (!response.ok) throw new Error('Error al asignar paciente');
    return await response.json();
  },

  // --- NUEVO: ELIMINAR (REMOVER) PACIENTE DE MI LISTA ---
  // Ruta: DELETE /pacientes/{id}
  async removePaciente(id, token) {
    const response = await fetch(`${API_URL}/pacientes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Error al remover el paciente');
    return true;
  },

  // --- NUEVO: CARGAR RECETA (PDF) ---
  // Ruta: POST /recetas/cargar/{paciente_id}
  async uploadReceta(idPaciente, file, token) {
    const formData = new FormData();
    formData.append('file', file); // Asumimos que el campo se llama 'file'

    const response = await fetch(`${API_URL}/recetas/cargar/${idPaciente}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
        // NOTA: No poner 'Content-Type': 'multipart/form-data', el navegador lo pone solo con el boundary
      },
      body: formData
    });

    if (!response.ok) throw new Error('Error al subir la receta');
    return await response.json();
  },

  // --- NUEVO: OBTENER HISTORIAL DE RECETAS ---
  // Ruta: GET /recetas/paciente/{paciente_id}
  async getHistorialRecetas(idPaciente, token) {
    const response = await fetch(`${API_URL}/recetas/paciente/${idPaciente}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Error al obtener el historial de recetas');
    return await response.json();
  }
};