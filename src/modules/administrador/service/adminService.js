const API_URL = 'http://34.198.88.1';

export const adminService = {
  
  // --- CREAR USUARIO (Médico o Admin) ---
  async createUsuario(data, token) {
    try {
      const response = await fetch(`${API_URL}/usuarios/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || 'Error al crear usuario');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // --- CREAR PACIENTE ---
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
  },

  // --- NUEVO: OBTENER LISTA DE MÉDICOS ---
  // Ruta: GET /usuarios/medicos
  async getMedicos(token) {
    const response = await fetch(`${API_URL}/usuarios/medicos`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Error al obtener médicos');
    return await response.json(); // Retorna array de usuarios
  },

  // --- NUEVO: OBTENER LISTA DE PACIENTES ---
  // Ruta: GET /usuarios/pacientes
  async getPacientes(token) {
    const response = await fetch(`${API_URL}/usuarios/pacientes`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Error al obtener pacientes');
    return await response.json();
  },

  // --- NUEVO: ELIMINAR USUARIO ---
  // Ruta: DELETE /usuarios/{id}
  async deleteUsuario(id, token) {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Error al eliminar usuario');
    return true; 
  }
};