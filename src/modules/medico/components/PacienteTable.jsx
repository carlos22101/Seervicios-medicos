import React from 'react';

export default function PacienteTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        {/* ENCABEZADO DE LA TABLA */}
        <thead className="bg-gray-300 text-gray-700 font-medium uppercase">
          <tr>
            <th className="py-4 px-6">Paciente</th>
            <th className="py-4 px-6">CURP</th>
            <th className="py-4 px-6">Correo electrónico</th>
            <th className="py-4 px-6">No. Expediente</th>
            <th className="py-4 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        
        {/* CUERPO DE LA TABLA */}
        <tbody className="text-gray-600">
          {data && data.length > 0 ? (
            data.map((paciente) => (
              <tr key={paciente.id} className="border-b border-gray-200 hover:bg-gray-50">
                {/* Nombre */}
                <td className="py-4 px-6 font-bold text-gray-900">
                  {paciente.nombre}
                </td>
                
                {/* CURP - Usamos fallback por si viene null */}
                <td className="py-4 px-6 font-bold text-gray-800">
                  {paciente.curp || 'S/D'}
                </td>
                
                {/* Email - API usa 'correo' */}
                <td className="py-4 px-6 text-gray-500">
                  {paciente.correo || paciente.email || 'Sin correo'}
                </td>
                
                {/* Expediente - API usa 'num_expediente' */}
                <td className="py-4 px-6 font-bold text-gray-900">
                  {paciente.num_expediente || paciente.expediente}
                </td>
                
                {/* Acciones */}
                <td className="py-4 px-6">
                  <div className="flex justify-center gap-4">
                    
                    {/* Botón Ver (Documento) */}
                    <button className="text-blue-600 hover:text-blue-800 transition-colors" title="Ver expediente">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>

                    {/* Botón Eliminar (Papelera) */}
                    {/* Nota: Verificar si el médico puede eliminar o solo el admin */}
                    <button className="text-blue-600 hover:text-red-600 transition-colors" title="Eliminar de mi lista">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>

                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-8 text-center text-gray-500">
                No tienes pacientes asignados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}