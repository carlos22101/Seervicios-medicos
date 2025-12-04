import React from 'react';
import { Link } from 'react-router-dom';

export default function DoctorTable({ data }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-300 text-gray-800 font-medium">
          <tr>
            <th className="py-4 px-6 w-1/2">Doctor</th>
            <th className="py-4 px-6 w-1/2">Especialidad</th>
            <th className="py-4 px-6 w-16"></th> {/* Columna vacía para el icono */}
          </tr>
        </thead>
        
        <tbody className="bg-gray-50/50">
          {data.length > 0 ? (
            data.map((doctor) => (
              <tr key={doctor.id} className="border-b border-gray-200 hover:bg-white transition-colors">
                {/* Nombre del Doctor */}
                <td className="py-5 px-6 font-bold text-gray-900">
                  {doctor.nombre}
                </td>
                {/* Especialidad */}
                <td className="py-5 px-6 text-gray-600">
                  {doctor.especialidad}
                </td>
                
                <td className="py-5 px-6 text-right">
                  <Link 
                    to={`/paciente/recetas/doctor/${doctor.id}`} 
                    className="inline-block text-blue-800 hover:text-blue-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5h.008v.008H9V13.5zm3 0h.008v.008H12V13.5zm3 0h.008v.008H15V13.5zm-6 3h.008v.008H9V16.5zm3 0h.008v.008H12V16.5zm3 0h.008v.008H15V16.5z" />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-8 text-center text-gray-500">
                No se encontraron doctores.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}