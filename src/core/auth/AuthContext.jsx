import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../../modules/auth/services/authservice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // LLAMADA A LA API (/auth/me)
          // Esto asegura que el token es válido y trae datos frescos
          const userData = await authService.checkSession(token);
          
          setUser({ ...userData, token }); 
          localStorage.setItem('user_data', JSON.stringify(userData));
        } catch (error) {
          console.error("Sesión inválida:", error);
          logout(); // Si el token no sirve, sacamos al usuario
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (correo, contrasena) => {
    try {
      const data = await authService.login(correo, contrasena);
      // Login devuelve { access_token: "...", user: {...} }
      if (data.access_token && data.user) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user_data', JSON.stringify(data.user));
        setUser({ ...data.user, token: data.access_token });
        return { success: true, user: data.user };
      }
      return { success: false, error: "Respuesta incompleta" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);