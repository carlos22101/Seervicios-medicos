import React from 'react';

export default function RecetasTable({ data }) {
  const API_URL = 'http://98.94.250.137:8000';

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        {/* ENCABEZADO */}
        <thead className="bg-blue-50 text-blue-900 font-bold uppercase">
          <tr>
            <th className="py-4 px-6">Fecha Emisión</th>
            <th className="py-4 px-6">Médico Asignado</th>
            <th className="py-4 px-6">Correo Médico</th>
            <th className="py-4 px-6 text-center">Receta</th>
          </tr>
        </thead>
        
        {/* CUERPO */}
        <tbody className="text-gray-700">
          {data && data.length > 0 ? (
            data.map((receta) => (
              <tr key={receta.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                
                {/* Fecha */}
                <td className="py-4 px-6 font-medium">
                   {receta.fecha_emision}
                </td>
                
                {/* Nombre del Médico (Viene dentro del objeto 'medico') */}
                <td className="py-4 px-6 font-bold text-gray-900">
                   Dr. {receta.medico?.nombre || 'Desconocido'}
                </td>
                
                {/* Correo del Médico */}
                <td className="py-4 px-6 text-gray-500">
                   {receta.medico?.correo}
                </td>
                
                {/* Acciones: Ver PDF */}
                <td className="py-4 px-6 text-center">
                   <a 
                      href={`${API_URL}/uploads/${receta.archivo_pdf}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-md font-bold hover:bg-blue-200 transition-colors text-xs uppercase tracking-wide"
                   >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      Ver PDF
                   </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-10 text-center text-gray-400">
                No se encontraron recetas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}