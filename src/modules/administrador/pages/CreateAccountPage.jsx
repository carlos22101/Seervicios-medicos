import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../../../core/layout/MainLayout';

export default function CreateAccountPage() {
  const navigate = useNavigate();

  // Estados para los formularios
  const [doctorForm, setDoctorForm] = useState({ usuario: '', expediente: '' });
  const [pacienteForm, setPacienteForm] = useState({ usuario: '', expediente: '' });

  // Función genérica para guardar usuarios en "Base de Datos" (LocalStorage)
  const saveUser = (data, role) => {
    if (!data.usuario || !data.expediente) return alert("Llena todos los campos");

    // 1. Obtenemos usuarios existentes
    const existingUsers = JSON.parse(localStorage.getItem('app_users_mock')) || [];

    // 2. Creamos el nuevo objeto
    const newUser = {
      id: Date.now(),
      name: data.usuario,
      expediente: data.expediente,
      role: role // 'medico' o 'paciente'
    };

    // 3. Guardamos y limpiamos
    localStorage.setItem('app_users_mock', JSON.stringify([...existingUsers, newUser]));
    alert(`${role === 'medico' ? 'Doctor' : 'Paciente'} creado exitosamente.`);
    
    // Limpiar inputs
    if (role === 'medico') setDoctorForm({ usuario: '', expediente: '' });
    else setPacienteForm({ usuario: '', expediente: '' });
  };

  return (
    <MainLayout>
      <div className="w-full px-8 py-10 max-w-5xl mx-auto">
        
        {/* --- HEADER SUPERIOR --- */}
        <div className="flex justify-end mb-6">
            <Link 
                to="/admin/historial" 
                className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
            >
                {/* Icono de Historial/Cambio */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Historial
            </Link>
        </div>

        {/* --- FORMULARIO 1: CREAR DOCTOR --- */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 shadow-sm mb-8">
            <div className="border-b-2 border-dashed border-gray-300 pb-4 mb-6">
                <h2 className="text-xl font-bold text-gray-500">Crear cuenta - Doctor</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                    <label className="block font-bold text-gray-800 mb-2">Usuario:</label>
                    <input 
                        type="text" 
                        placeholder="Escribir" 
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={doctorForm.usuario}
                        onChange={(e) => setDoctorForm({...doctorForm, usuario: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block font-bold text-gray-800 mb-2">Número de expediente:</label>
                    <input 
                        type="text" 
                        placeholder="Escribir" 
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={doctorForm.expediente}
                        onChange={(e) => setDoctorForm({...doctorForm, expediente: e.target.value})}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <button 
                    onClick={() => setDoctorForm({usuario:'', expediente:''})}
                    className="px-6 py-1.5 border border-red-400 text-red-500 font-bold rounded hover:bg-red-50 transition"
                >
                    Cancelar
                </button>
                <button 
                    onClick={() => saveUser(doctorForm, 'medico')}
                    className="px-8 py-1.5 bg-blue-800 text-white font-bold rounded hover:bg-blue-900 transition"
                >
                    Crear
                </button>
            </div>
        </div>

        {/* --- FORMULARIO 2: CREAR PACIENTE --- */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 shadow-sm">
            <div className="border-b-2 border-dashed border-gray-300 pb-4 mb-6">
                <h2 className="text-xl font-bold text-gray-500">Crear cuenta - Paciente</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                    <label className="block font-bold text-gray-800 mb-2">Usuario:</label>
                    <input 
                        type="text" 
                        placeholder="Escribir" 
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={pacienteForm.usuario}
                        onChange={(e) => setPacienteForm({...pacienteForm, usuario: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block font-bold text-gray-800 mb-2">Número de expediente:</label>
                    <input 
                        type="text" 
                        placeholder="Escribir" 
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={pacienteForm.expediente}
                        onChange={(e) => setPacienteForm({...pacienteForm, expediente: e.target.value})}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <button 
                    onClick={() => setPacienteForm({usuario:'', expediente:''})}
                    className="px-6 py-1.5 border border-red-400 text-red-500 font-bold rounded hover:bg-red-50 transition"
                >
                    Cancelar
                </button>
                <button 
                    onClick={() => saveUser(pacienteForm, 'paciente')}
                    className="px-8 py-1.5 bg-blue-800 text-white font-bold rounded hover:bg-blue-900 transition"
                >
                    Crear
                </button>
            </div>
        </div>

      </div>
    </MainLayout>
  );
}