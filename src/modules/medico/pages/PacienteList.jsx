import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../core/layout/MainLayout';
import PacienteTable from '../components/PacienteTable';
import { pacientesService } from '../services/pacientesService';

export default function PacientesList() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPacientes = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        setLoading(true);
        // Llamada a la API Real
        const data = await pacientesService.getMisPacientes(token);
        setPacientes(data);
      } catch (error) {
        console.error("Error cargando pacientes:", error);
        // Opcional: Si falla la API, podrías dejar el array vacío o mostrar un error
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  return (
    <MainLayout>
      <div className="w-full px-10 py-8">
        
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 uppercase">
            PACIENTES
          </h1>
          
          <Link 
            to="/medico/pacientes/nuevo" 
            className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-medium px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nuevo paciente
          </Link>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
             {loading ? (
                <div className="p-10 text-center text-gray-500">Cargando pacientes...</div>
             ) : (
                <PacienteTable data={pacientes} />
             )}
        </div>

      </div>
    </MainLayout>
  );
}