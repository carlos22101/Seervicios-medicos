const API_URL = 'http://34.198.88.1';

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

  // --- PASO 1: CREAR PACIENTE ---
  // Ruta: /pacientes/
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

    // Esperamos que la API devuelva el objeto creado con su ID (ej: { id: 5, nombre: ... })
    return await response.json(); 
  },

  // --- PASO 2: ASIGNAR PACIENTE AL MÉDICO ---
  // Ruta: /pacientes/asignar
  async asignarPaciente(idPaciente, token) {
    const payload = { id_paciente: idPaciente };
    
    const response = await fetch(`${API_URL}/pacientes/asignar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Error al asignar paciente al médico');
    }

    return await response.json();
  }
};