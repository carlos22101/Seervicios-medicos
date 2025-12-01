import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainLayout from '../../../core/layout/MainLayout';

export default function PacienteForm() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

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

  const handleSave = () => {
    // 1. Guardamos en localStorage
    const storedPacientes = JSON.parse(localStorage.getItem('pacientesMock')) || [];
    
    const newPaciente = {
      id: Date.now(),
      nombre: formData.nombre || 'Nuevo Paciente',
      curp: formData.curp || 'S/D',
      email: formData.email || 'sin@correo.com',
      expediente: formData.expediente || '0000'
    };

    localStorage.setItem('pacientesMock', JSON.stringify([...storedPacientes, newPaciente]));

    // 2. Mostramos el modal
    setShowModal(true);
  };

  const closeModalAndRedirect = () => {
    setShowModal(false);
    navigate('/medico/pacientes');
  };

  return (
    <MainLayout>
      <div className="w-full px-4 py-8 md:px-10"> {/* Ajusté padding para móviles */}
        
        {/* --- CONTENEDOR CENTRADO --- */}
        {/* Aquí está la magia: max-w-5xl limita el ancho y mx-auto lo centra */}
        <div className="max-w-5xl mx-auto">

            {/* ENCABEZADO SUPERIOR: VOLVER Y TÍTULO */}
            <div className="mb-6">
                <Link to="/medico/pacientes" className="flex items-center text-blue-900 font-bold mb-2 hover:underline w-fit">
                    <span className="mr-2">←</span> Volver
                </Link>
                <h1 className="text-3xl font-bold text-blue-900 uppercase">
                    PACIENTES
                </h1>
            </div>

            {/* TARJETA DEL FORMULARIO */}
            <div className="bg-gray-50 rounded-lg shadow-lg border border-gray-200 p-8 w-full">
                
                {/* Cabecera de la tarjeta */}
                <div className="flex justify-between items-end border-b-2 border-dashed border-gray-300 pb-4 mb-8">
                    <h2 className="text-xl font-bold text-gray-400">Nuevo paciente</h2>
                    <span className="text-xl font-bold text-gray-500">1/4</span>
                </div>

                {/* GRID DEL FORMULARIO */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    
                    {/* Campo: Nombre */}
                    <div className="flex flex-col gap-2">
                        <label className="font-bold text-gray-700">Nombre(s):</label>
                        <input 
                            type="text" 
                            name="nombre"
                            placeholder="Escribir" 
                            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Campo: Correo */}
                    <div className="flex flex-col gap-2">
                        <label className="font-bold text-gray-700">Correo electrónico:</label>
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Escribir" 
                            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Campo: CURP */}
                    <div className="flex flex-col gap-2">
                        <label className="font-bold text-gray-700">CURP:</label>
                        <input 
                            type="text" 
                            name="curp"
                            placeholder="Escribir" 
                            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Campo: Expediente */}
                    <div className="flex flex-col gap-2">
                        <label className="font-bold text-gray-700">Número de expediente:</label>
                        <input 
                            type="text" 
                            name="expediente"
                            placeholder="Escribir" 
                            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                            onChange={handleChange}
                        />
                    </div>
                </form>

                {/* BOTONES DE ACCIÓN */}
                <div className="flex justify-end gap-4 mt-12 pt-4">
                    <button 
                        onClick={() => navigate('/medico/pacientes')}
                        className="px-6 py-2 rounded-lg border-2 border-red-400 text-red-500 font-bold hover:bg-red-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={handleSave}
                        className="px-8 py-2 rounded-lg bg-blue-800 text-white font-bold hover:bg-blue-900 transition-colors shadow-md"
                    >
                        Guardar
                    </button>
                </div>
            </div>

        </div> 
        {/* Fin del contenedor centrado */}

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
                <p className="text-gray-600 text-center mb-6">El paciente se ha registrado exitosamente.</p>
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