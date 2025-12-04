import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../../../core/auth/AuthContext'; // Ajusta la ruta si es necesario
import { useNavigate } from 'react-router-dom';
import fondoImg from '/fondo.png'; 
import logo from '/logo.jpeg'; 

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (form) => {
    setErrorMsg(''); // Limpiar errores previos
    console.log("1. Enviando formulario...", form);

    try {
      // --- IMPORTANTE: Usamos 'await' porque login conecta a la API ---
      const result = await login(form.email, form.password);
      
      console.log("2. Respuesta recibida:", result);

      if (result.success && result.user) {
        // Obtenemos el tipo y lo convertimos a minúsculas para evitar errores (Ej: "Medico" vs "medico")
        const tipoUsuario = (result.user.tipo || "").toLowerCase().trim();
        
        console.log("3. Tipo de usuario detectado:", tipoUsuario);

        // Lógica de redirección
        switch(tipoUsuario) {
          case 'administrador':
          case 'admin':
            console.log("-> Redirigiendo a /admin");
            navigate('/admin');
            break;

          case 'medico':
          case 'médico': // Por si la API manda acento
            console.log("-> Redirigiendo a /medico");
            navigate('/medico');
            break;

          case 'paciente':
            console.log("-> Redirigiendo a /paciente");
            navigate('/paciente');
            break;

          default:
            console.warn("-> Tipo de usuario no reconocido:", tipoUsuario);
            setErrorMsg(`Usuario identificado como "${tipoUsuario}", pero no tiene ruta asignada.`);
        }
      } else {
        // Si success es false
        setErrorMsg('Error: Credenciales incorrectas o fallo en el servidor.');
      }
    } catch (error) {
      console.error("Error crítico en handleSubmit:", error);
      setErrorMsg('Ocurrió un error inesperado al intentar ingresar.');
    }
  }

  return (
    <div 
      className="w-full h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${fondoImg})` }}
    >
      <div className="bg-white/95 p-8 rounded-xl shadow-2xl w-[420px] border border-gray-100">
        
        <div className="flex justify-center mb-6">
             <img src={logo} alt="Logo UPA" className="h-20 object-contain" />
        </div>
        
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
            ¡Bienvenido a UP-Ayotik!
        </h2>
        
        {/* Muestra errores en rojo si existen */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded text-center border border-red-200 font-medium">
            {errorMsg}
          </div>
        )}

        <LoginForm onSubmit={handleSubmit} />
        
        <p className="mt-4 text-xs text-center text-gray-500">
           Ingresa tu No. de Expediente (sólo números) si eres paciente.
        </p>

      </div>
    </div>
  )
}