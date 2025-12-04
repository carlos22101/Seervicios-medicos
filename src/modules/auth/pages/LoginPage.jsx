import React from 'react';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../../../core/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import fondoImg from '/fondo.png'; 

import logo from '/logo.jpeg'; 

export default function LoginPage(){
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    const { user } = login(form);
    if(user.role === 'medico') navigate('/medico');
    else if(user.role === 'admin') navigate('/admin');
    else navigate('/paciente');
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
        
        <LoginForm onSubmit={handleSubmit} />
      </div>

    </div>
  )
}