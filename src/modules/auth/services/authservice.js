const API_URL = 'http://34.198.88.1';

export const authService = {
  // --- LOGIN (Ya lo tenías, lo dejo igual) ---
  async login(email, inputSecret) {
    const isPaciente = /^\d+$/.test(inputSecret);
    const endpoint = isPaciente 
      ? `${API_URL}/auth/login-paciente` 
      : `${API_URL}/auth/login`;

    const payload = isPaciente
      ? { correo: email, expediente: inputSecret }  
      : { correo: email, contrasena: inputSecret };   

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.detail || 'Error en autenticación');
    }
    return await response.json(); 
  },

  // --- NUEVO: OBTENER PERFIL (/auth/me) ---
  async checkSession(token) {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Importante: Bearer Token
      },
    });

    if (!response.ok) {
      throw new Error('Sesión expirada');
    }

    // Tu API devuelve el objeto usuario directamente: { nombre: "...", ... }
    return await response.json(); 
  }
};