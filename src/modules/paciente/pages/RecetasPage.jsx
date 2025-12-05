import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../core/layout/MainLayout';
import RecetasTable from '../components/DoctorTable';
import { recetasService } from '../services/recetasService';

export default function MisRecetas() {
  
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Cargar datos de la API al iniciar
  useEffect(() => {
    const fetchRecetas = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        setLoading(true);
        // Llamada a la ruta /recetas/mis-recetas/hoy
        const data = await recetasService.getMisRecetas(token);
        setRecetas(data);
      } catch (error) {
        console.error("Error al cargar recetas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecetas();
  }, []);

  // 2. Filtrado por Nombre del Médico o Fecha
  const filteredRecetas = recetas.filter(receta => 
    (receta.medico?.nombre || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (receta.fecha_emision || '').includes(searchTerm)
  );

  return (
    <MainLayout>
      <div className="w-full px-8 py-10 max-w-7xl mx-auto">
        
        {/* --- BOTÓN VOLVER --- */}
        <div className="mb-4">
            <Link 
                to="/paciente" 
                className="flex items-center text-blue-900 font-bold hover:text-blue-700 transition-colors w-fit"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver
            </Link>
        </div>

        {/* --- HEADER: Título y Buscador --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          
          <h1 className="text-3xl font-extrabold text-blue-900 uppercase tracking-wide">
            MIS RECETAS
          </h1>

          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Buscar por médico..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

        </div>

        {/* --- TABLA --- */}
        {loading ? (
            <div className="p-10 text-center text-gray-500">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-900 mx-auto mb-2"></div>
                Cargando recetas...
            </div>
        ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <RecetasTable data={filteredRecetas} />
            </div>
        )}

      </div>
    </MainLayout>
  );
}