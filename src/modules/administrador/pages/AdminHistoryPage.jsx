import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../core/layout/MainLayout';

export default function AdminHistoryPage() {
  const [users, setUsers] = useState([]);

  // Cargar usuarios al iniciar
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('app_users_mock')) || [];
    setUsers(storedUsers);
  }, []);

  // Función para eliminar
  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este usuario?')) {
        const newUsers = users.filter(user => user.id !== id);
        setUsers(newUsers);
        localStorage.setItem('app_users_mock', JSON.stringify(newUsers));
    }
  };

  // Filtramos por rol
  const medicos = users.filter(u => u.role === 'medico');
  const pacientes = users.filter(u => u.role === 'paciente');

  return (
    <MainLayout>
      <div className="w-full px-8 py-10 max-w-5xl mx-auto">
        
        {/* CABECERA: Volver y Título */}
        <div className="flex items-center gap-4 mb-8">
            <Link to="/admin" className="text-blue-900 font-bold hover:underline flex items-center">
                <span className="mr-1">←</span> Volver
            </Link>
            <h1 className="text-3xl font-extrabold text-blue-900 uppercase">
                CUENTAS
            </h1>
        </div>

        {/* --- LISTA DE DOCTORES --- */}
        <div className="bg-gray-100 rounded-t-lg border border-gray-300 overflow-hidden mb-8">
            {/* Encabezado Tabla */}
            <div className="bg-gray-300 px-6 py-3 flex justify-between font-medium text-gray-700">
                <span className="w-1/2">Doctor</span>
                <span className="w-1/2 text-center">Número de expediente</span>
                <span className="w-10"></span>
            </div>
            {/* Cuerpo Tabla */}
            <div className="bg-gray-50">
                {medicos.length > 0 ? medicos.map((doc) => (
                    <div key={doc.id} className="flex justify-between items-center px-6 py-4 border-b border-gray-200 last:border-0">
                        <span className="w-1/2 font-bold text-gray-900">{doc.name}</span>
                        <span className="w-1/2 text-center text-gray-600">{doc.expediente}</span>
                        <button 
                            onClick={() => handleDelete(doc.id)}
                            className="w-10 flex justify-end text-blue-800 hover:text-red-600 transition"
                        >
                            {/* Icono Basura */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                )) : (
                    <div className="p-6 text-center text-gray-400">No hay doctores registrados</div>
                )}
            </div>
        </div>
        
        {/* SEPARADOR PUNTEADO */}
        <div className="border-t-2 border-dashed border-gray-400 my-8"></div>

        {/* --- LISTA DE PACIENTES --- */}
        <div className="bg-gray-100 rounded-t-lg border border-gray-300 overflow-hidden">
            {/* Encabezado Tabla */}
            <div className="bg-gray-300 px-6 py-3 flex justify-between font-medium text-gray-700">
                <span className="w-1/2">Paciente</span>
                <span className="w-1/2 text-center">Número de expediente</span>
                <span className="w-10"></span>
            </div>
            {/* Cuerpo Tabla */}
            <div className="bg-gray-50">
                {pacientes.length > 0 ? pacientes.map((pac) => (
                    <div key={pac.id} className="flex justify-between items-center px-6 py-4 border-b border-gray-200 last:border-0">
                        <span className="w-1/2 font-bold text-gray-900">{pac.name}</span>
                        <span className="w-1/2 text-center text-gray-600">{pac.expediente}</span>
                        <button 
                             onClick={() => handleDelete(pac.id)}
                             className="w-10 flex justify-end text-blue-800 hover:text-red-600 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                )) : (
                    <div className="p-6 text-center text-gray-400">No hay pacientes registrados</div>
                )}
            </div>
        </div>

      </div>
    </MainLayout>
  );
}