import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../../../core/layout/MainLayout';
import { adminService } from '../service/adminService';

export default function CreateAccountPage() {
  const navigate = useNavigate();

  // Estados actualizados con campo 'email'
  // Doctor: nombre, email, contraseña
  const [doctorForm, setDoctorForm] = useState({ nombre: '', email: '', password: '' });
  
  // Paciente: nombre, email, expediente
  const [pacienteForm, setPacienteForm] = useState({ nombre: '', email: '', expediente: '' });

  const handleCreate = async (role) => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("No tienes sesión activa");
        return;
    }

    try {
        if (role === 'medico') {
            // VALIDACIÓN BÁSICA
            if (!doctorForm.nombre || !doctorForm.email || !doctorForm.password) {
                return alert("Por favor llena todos los campos del médico");
            }

            // PREPARAR JSON SEGÚN TUS REGLAS
            const payload = {
                nombre: doctorForm.nombre,
                correo: doctorForm.email,
                contrasena: doctorForm.password,
                tipo: "medico",
                cedula_profesional: null,
                curp: null,
                num_expediente: null
            };

            await adminService.createUsuario(payload, token);
            alert("Médico creado exitosamente");
            setDoctorForm({ nombre: '', email: '', password: '' });
        } 
        else if (role === 'paciente') {
            // VALIDACIÓN BÁSICA
            if (!pacienteForm.nombre || !pacienteForm.email || !pacienteForm.expediente) {
                return alert("Por favor llena todos los campos del paciente");
            }

            // PREPARAR JSON PACIENTE
            const payload = {
                nombre: pacienteForm.nombre,
                correo: pacienteForm.email,
                num_expediente: pacienteForm.expediente,
                contrasena: pacienteForm.expediente,
                tipo: "paciente"
            };

            await adminService.createPaciente(payload, token);
            alert("Paciente creado exitosamente");
            setPacienteForm({ nombre: '', email: '', expediente: '' });
        }

    } catch (error) {
        console.error(error);
        alert(`Error: ${error.message}`);
    }
  };

  return (
    <MainLayout>
      {/* Cambié max-w-6xl a max-w-full para que ocupe todo el ancho de la pantalla */}
      <div className="w-full px-8 py-10 max-w-full mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-end mb-6">
            <Link 
                to="/admin/historial" 
                className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Historial
            </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* --- FORMULARIO 1: CREAR DOCTOR --- */}
            {/* Agregué lg:col-span-2 para que en pantallas grandes ocupe ambas columnas (ancho completo) */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 shadow-sm h-fit lg:col-span-2">
                <div className="border-b-2 border-dashed border-gray-300 pb-4 mb-6">
                    <h2 className="text-xl font-bold text-gray-500 uppercase tracking-wide">Alta de Médico</h2>
                </div>

                <div className="flex flex-col gap-5 mb-8">
                    {/* Nombre */}
                    <div>
                        <label className="block font-bold text-gray-800 mb-1">Nombre completo:</label>
                        <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={doctorForm.nombre}
                            onChange={(e) => setDoctorForm({...doctorForm, nombre: e.target.value})}
                        />
                    </div>

                    {/* Correo (NUEVO) */}
                    <div>
                        <label className="block font-bold text-gray-800 mb-1">Correo electrónico:</label>
                        <input 
                            type="email" 
                            className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={doctorForm.email}
                            onChange={(e) => setDoctorForm({...doctorForm, email: e.target.value})}
                        />
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="block font-bold text-gray-800 mb-1">Contraseña:</label>
                        <input 
                            type="password" 
                            className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={doctorForm.password}
                            onChange={(e) => setDoctorForm({...doctorForm, password: e.target.value})}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button 
                        onClick={() => setDoctorForm({nombre:'', email:'', password:''})}
                        className="px-4 py-2 border border-red-400 text-red-500 font-bold rounded hover:bg-red-50 transition"
                    >
                        Limpiar
                    </button>
                    <button 
                        onClick={() => handleCreate('medico')}
                        className="px-6 py-2 bg-blue-800 text-white font-bold rounded hover:bg-blue-900 transition shadow-md"
                    >
                        Crear Médico
                    </button>
                </div>
            </div>

        </div>
      </div>
    </MainLayout>
  );
}