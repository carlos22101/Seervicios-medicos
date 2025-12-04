import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainLayout from '../../../core/layout/MainLayout';
import { pacientesService } from '../services/pacientesService';

export default function PacienteForm() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // Estado de carga para evitar doble click

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    curp: '',
    expediente: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    // 1. Validaciones básicas
    if (!formData.nombre || !formData.email || !formData.curp || !formData.expediente) {
        alert("Por favor completa todos los campos.");
        return;
    }

    // Validación expediente (mínimo 6 dígitos)
    if (formData.expediente.length < 6 || isNaN(formData.expediente)) {
        alert("El número de expediente debe contener solo números y tener al menos 6 dígitos.");
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) return alert("Sesión no válida");

    setIsSaving(true);

    try {
        // --- PREPARAR JSON DE CREACIÓN ---
        const newPacienteData = {
            nombre: formData.nombre,
            correo: formData.email,
            curp: formData.curp,
            num_expediente: formData.expediente,
            contrasena: formData.expediente, // Regla: pass = expediente
            tipo: "paciente",
            cedula_profesional: null
        };

        // --- PASO 1: CREAR PACIENTE ---
        console.log("Creando paciente...", newPacienteData);
        const pacienteCreado = await pacientesService.createPaciente(newPacienteData, token);
        
        // Verificamos que tengamos un ID válido
        if (!pacienteCreado || !pacienteCreado.id) {
            throw new Error("El paciente se creó pero la API no devolvió el ID necesario para asignarlo.");
        }

        console.log("Paciente creado, ID:", pacienteCreado.id);

        // --- PASO 2: ASIGNAR PACIENTE AL MÉDICO ---
        console.log("Asignando paciente al médico...");
        await pacientesService.asignarPaciente(pacienteCreado.id, token);

        // Si todo salió bien:
        setShowModal(true);

    } catch (error) {
        console.error(error);
        alert(`Error: ${error.message}`);
    } finally {
        setIsSaving(false);
    }
  };

  const closeModalAndRedirect = () => {
    setShowModal(false);
    navigate('/medico/pacientes');
  };

  return (
    <MainLayout>
      <div className="w-full px-4 py-8 md:px-10">
        
        <div className="max-w-5xl mx-auto">

            {/* HEADER */}
            <div className="mb-6">
                <Link to="/medico/pacientes" className="flex items-center text-blue-900 font-bold mb-2 hover:underline w-fit">
                    <span className="mr-2">←</span> Volver
                </Link>
                <h1 className="text-3xl font-bold text-blue-900 uppercase">
                    PACIENTES
                </h1>
            </div>

            {/* FORMULARIO */}
            <div className="bg-gray-50 rounded-lg shadow-lg border border-gray-200 p-8 w-full">
                
                <div className="flex justify-between items-end border-b-2 border-dashed border-gray-300 pb-4 mb-8">
                    <h2 className="text-xl font-bold text-gray-400 uppercase">Nuevo paciente</h2>
                    <span className="text-sm font-bold text-gray-400">Datos Generales</span>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    
                    {/* Nombre */}
                    <div className="flex flex-col gap-2">
                        <label className="font-bold text-gray-700">Nombre completo:</label>
                        <input 
                            type="text" 
                            name="nombre"
                            placeholder="Escribir nombre completo" 
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                            onChange={handleChange}
                            value={formData.nombre}
                        />
                    </div>

                    {/* Correo */}
                    <div className="flex flex-col gap-2">
                        <label className="font-bold text-gray-700">Correo electrónico:</label>
                        <input 
                            type="email" 
                            name="email"
                            placeholder="ejemplo@correo.com" 
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </div>

                    {/* CURP */}
                    <div className="flex flex-col gap-2">
                        <label className="font-bold text-gray-700">CURP:</label>
                        <input 
                            type="text" 
                            name="curp"
                            placeholder="18 caracteres" 
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm uppercase"
                            onChange={handleChange}
                            value={formData.curp}
                            maxLength={18}
                        />
                    </div>

                    {/* Expediente */}
                    <div className="flex flex-col gap-2">
                        <label className="font-bold text-gray-700">Número de expediente:</label>
                        <input 
                            type="text" 
                            name="expediente"
                            placeholder="Mínimo 6 dígitos (Solo números)" 
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                            onChange={handleChange}
                            value={formData.expediente}
                        />
                        <p className="text-xs text-gray-500">Este número servirá como contraseña de acceso para el paciente.</p>
                    </div>
                </form>

                {/* BOTONES */}
                <div className="flex justify-end gap-4 mt-12 pt-4">
                    <button 
                        onClick={() => navigate('/medico/pacientes')}
                        className="px-6 py-2 rounded-lg border-2 border-red-400 text-red-500 font-bold hover:bg-red-50 transition-colors"
                        disabled={isSaving}
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`px-8 py-2 rounded-lg text-white font-bold transition-colors shadow-md flex items-center gap-2 ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-900'}`}
                    >
                        {isSaving ? 'Guardando...' : 'Guardar y Asignar'}
                    </button>
                </div>
            </div>

        </div> 
      </div>

      {/* --- MODAL DE ÉXITO --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl flex flex-col items-center max-w-sm w-full animate-fadeIn">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">¡Guardado!</h3>
                <p className="text-gray-600 text-center mb-6">El paciente se registró y asignó a tu lista exitosamente.</p>
                <button 
                    onClick={closeModalAndRedirect}
                    className="w-full bg-blue-800 text-white font-bold py-2 rounded hover:bg-blue-900 transition"
                >
                    Aceptar
                </button>
            </div>
        </div>
      )}

    </MainLayout>
  );
}