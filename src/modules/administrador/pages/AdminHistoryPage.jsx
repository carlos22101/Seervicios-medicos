import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../core/layout/MainLayout';
import { adminService } from '../service/adminService';// Importamos el servicio

export default function AdminHistoryPage() {
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para cargar los datos de la API
  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      setLoading(true);
      // Hacemos ambas peticiones en paralelo
      const [medicosData, pacientesData] = await Promise.all([
        adminService.getMedicos(token),
        adminService.getPacientes(token)
      ]);

      setMedicos(medicosData);
      setPacientes(pacientesData);
    } catch (error) {
      console.error("Error al cargar cuentas:", error);
      alert("Error al cargar la lista de usuarios. Revisa tu conexión.");
    } finally {
      setLoading(false);
    }
  };

  // Cargar usuarios al iniciar
  useEffect(() => {
    fetchData();
  }, []);

  // Función para eliminar
  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este usuario de la base de datos?')) {
        const token = localStorage.getItem('token');
        try {
            await adminService.deleteUsuario(id, token);
            alert('Usuario eliminado correctamente');
            // Recargamos las listas para ver los cambios
            fetchData();
        } catch (error) {
            console.error(error);
            alert('No se pudo eliminar el usuario.');
        }
    }
  };

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

        {loading ? (
            <div className="text-center py-10 text-gray-500">Cargando cuentas...</div>
        ) : (
            <>
                {/* --- LISTA DE DOCTORES --- */}
                <div className="bg-gray-100 rounded-t-lg border border-gray-300 overflow-hidden mb-8 shadow-sm">
                    {/* Encabezado Tabla */}
                    <div className="bg-gray-300 px-6 py-3 flex justify-between font-medium text-gray-700">
                        <span className="w-1/2">Doctor</span>
                        <span className="w-1/2 text-center">Correo Electrónico</span> {/* Cambiado de Expediente a Correo, más útil para médicos */}
                        <span className="w-10"></span>
                    </div>
                    {/* Cuerpo Tabla */}
                    <div className="bg-gray-50 max-h-96 overflow-y-auto">
                        {medicos.length > 0 ? medicos.map((doc) => (
                            <div key={doc.id} className="flex justify-between items-center px-6 py-4 border-b border-gray-200 last:border-0 hover:bg-gray-100 transition">
                                {/* Usamos 'nombre' y 'correo' de la API */}
                                <span className="w-1/2 font-bold text-gray-900">{doc.nombre}</span>
                                <span className="w-1/2 text-center text-gray-600 text-sm">{doc.correo}</span>
                                <button 
                                    onClick={() => handleDelete(doc.id)}
                                    className="w-10 flex justify-end text-blue-800 hover:text-red-600 transition"
                                    title="Eliminar usuario"
                                >
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
                <div className="bg-blue-50 rounded-t-lg border border-blue-200 overflow-hidden shadow-sm">
                    {/* Encabezado Tabla */}
                    <div className="bg-blue-200 px-6 py-3 flex justify-between font-medium text-blue-900">
                        <span className="w-1/2">Paciente</span>
                        <span className="w-1/2 text-center">Número de expediente</span>
                        <span className="w-10"></span>
                    </div>
                    {/* Cuerpo Tabla */}
                    <div className="bg-white max-h-96 overflow-y-auto">
                        {pacientes.length > 0 ? pacientes.map((pac) => (
                            <div key={pac.id} className="flex justify-between items-center px-6 py-4 border-b border-gray-200 last:border-0 hover:bg-gray-50 transition">
                                {/* Usamos 'nombre' y 'num_expediente' de la API */}
                                <span className="w-1/2 font-bold text-gray-900">{pac.nombre}</span>
                                <span className="w-1/2 text-center text-gray-600 font-mono">{pac.num_expediente || 'S/D'}</span>
                                <button 
                                     onClick={() => handleDelete(pac.id)}
                                     className="w-10 flex justify-end text-blue-800 hover:text-red-600 transition"
                                     title="Eliminar usuario"
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
            </>
        )}

      </div>
    </MainLayout>
  );
}