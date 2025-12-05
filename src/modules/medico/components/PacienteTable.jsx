import React, { useState } from 'react';
import { pacientesService } from '../services/pacientesService';

export default function PacienteTable({ data }) {
  // Estados para controlar Modales
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  
  // Estado para subida de archivos
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Estado para historial
  const [recetasHistory, setRecetasHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const token = localStorage.getItem('token');

  // --- LÓGICA: ELIMINAR PACIENTE ---
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar a este paciente de tu lista?')) {
      try {
        await pacientesService.removePaciente(id, token);
        alert("Paciente eliminado correctamente. Recarga la página para ver los cambios.");
        // Idealmente aquí llamarías a una prop onRefresh() para actualizar la lista sin F5
        window.location.reload(); 
      } catch (error) {
        alert("Error al eliminar: " + error.message);
      }
    }
  };

  // --- LÓGICA: ABRIR MODAL SUBIR ---
  const openUploadModal = (paciente) => {
    setSelectedPaciente(paciente);
    setSelectedFile(null);
    setUploadSuccess(false);
    setUploadModalOpen(true);
  };

  // --- LÓGICA: SUBIR ARCHIVO ---
  const handleUpload = async () => {
    if (!selectedFile || !selectedPaciente) return;

    try {
      setIsUploading(true);
      await pacientesService.uploadReceta(selectedPaciente.id, selectedFile, token);
      setUploadSuccess(true); // Mostrar mensaje de éxito
      
      // Resetear después de 2 segundos y cerrar
      setTimeout(() => {
        setUploadModalOpen(false);
        setUploadSuccess(false);
        setSelectedFile(null);
      }, 2000);

    } catch (error) {
      alert("Error al subir receta: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  // --- LÓGICA: ABRIR HISTORIAL ---
  const openHistoryModal = async (paciente) => {
    setSelectedPaciente(paciente);
    setHistoryModalOpen(true);
    setLoadingHistory(true);
    try {
        const historial = await pacientesService.getHistorialRecetas(paciente.id, token);
        setRecetasHistory(historial);
    } catch (error) {
        console.error(error);
        alert("No se pudo cargar el historial.");
    } finally {
        setLoadingHistory(false);
    }
  };

  return (
    <div className="overflow-x-auto relative">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-300 text-gray-700 font-medium uppercase">
          <tr>
            <th className="py-4 px-6">Paciente</th>
            <th className="py-4 px-6">CURP</th>
            <th className="py-4 px-6">Correo</th>
            <th className="py-4 px-6">No. Expediente</th>
            <th className="py-4 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        
        <tbody className="text-gray-600">
          {data && data.length > 0 ? (
            data.map((item) => {
              const paciente = item.paciente || item;
              return (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-6 font-bold text-gray-900">{paciente.nombre}</td>
                  <td className="py-4 px-6 font-bold text-gray-800">{paciente.curp || 'S/D'}</td>
                  <td className="py-4 px-6 text-gray-500">{paciente.correo || 'Sin correo'}</td>
                  <td className="py-4 px-6 font-bold text-gray-900">{paciente.num_expediente}</td>
                  
                  {/* --- ACCIONES --- */}
                  <td className="py-4 px-6">
                    <div className="flex justify-center gap-4">
                      
                      {/* 1. Subir Receta (Icono Nube/Flecha) */}
                      <button 
                        onClick={() => openUploadModal(paciente)}
                        className="text-blue-600 hover:text-blue-800 transition-colors tooltip" 
                        title="Subir Receta PDF"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      </button>

                      {/* 2. Ver Historial (Icono Ojo/Lista) */}
                      <button 
                        onClick={() => openHistoryModal(paciente)}
                        className="text-indigo-600 hover:text-indigo-800 transition-colors" 
                        title="Ver Historial de Recetas"
                      >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </button>

                      {/* 3. Eliminar (Icono Basura) */}
                      <button 
                        onClick={() => handleDelete(paciente.id)}
                        className="text-red-500 hover:text-red-700 transition-colors" 
                        title="Eliminar paciente"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>

                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="py-8 text-center text-gray-500">No tienes pacientes asignados.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ================= MODAL SUBIR RECETA ================= */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md animate-fadeIn overflow-hidden">
                {/* Header Modal */}
                <div className="bg-blue-900 px-6 py-4 flex justify-between items-center">
                    <h3 className="text-white font-bold text-lg">Subir Receta Médica</h3>
                    <button onClick={() => setUploadModalOpen(false)} className="text-white hover:text-gray-300">
                        ✕
                    </button>
                </div>

                <div className="p-8">
                    {uploadSuccess ? (
                        <div className="flex flex-col items-center justify-center py-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-gray-800">¡Receta Subida!</h4>
                            <p className="text-gray-500 mt-2 text-center">El archivo se guardó correctamente en el expediente de {selectedPaciente.nombre}.</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-gray-600 mb-4 text-sm">
                                Selecciona el archivo PDF de la receta para <strong>{selectedPaciente?.nombre}</strong>.
                            </p>

                            {/* Área de Drop / Input */}
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-blue-50 transition-colors cursor-pointer relative">
                                <input 
                                    type="file" 
                                    accept=".pdf"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                />
                                {selectedFile ? (
                                    <div className="text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 2H7a2 2 0 00-2 2v15a2 2 0 002 2z" />
                                        </svg>
                                        <p className="font-bold text-gray-700 break-all">{selectedFile.name}</p>
                                        <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                        <p className="text-gray-500 font-medium">Haz click o arrastra tu PDF aquí</p>
                                        <p className="text-xs text-gray-400 mt-1">Solo archivos .pdf</p>
                                    </div>
                                )}
                            </div>

                            <button 
                                onClick={handleUpload}
                                disabled={!selectedFile || isUploading}
                                className={`w-full mt-6 py-3 rounded-lg font-bold text-white transition-all shadow-md
                                    ${!selectedFile || isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-900'}
                                `}
                            >
                                {isUploading ? 'Subiendo...' : 'Subir Receta'}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
      )}

      {/* ================= MODAL HISTORIAL ================= */}
      {historyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl animate-fadeIn overflow-hidden flex flex-col max-h-[80vh]">
                {/* Header Modal */}
                <div className="bg-indigo-900 px-6 py-4 flex justify-between items-center">
                    <div>
                        <h3 className="text-white font-bold text-lg">Historial de Recetas</h3>
                        <p className="text-indigo-200 text-sm">Paciente: {selectedPaciente?.nombre}</p>
                    </div>
                    <button onClick={() => setHistoryModalOpen(false)} className="text-white hover:text-gray-300">
                        ✕
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
                    {loadingHistory ? (
                        <div className="text-center py-10">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-900 mx-auto"></div>
                            <p className="mt-2 text-gray-500">Cargando historial...</p>
                        </div>
                    ) : recetasHistory.length > 0 ? (
                        <div className="space-y-3">
                            {recetasHistory.map((receta, index) => (
                                <div key={receta.id || index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-red-100 p-2 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 2H7a2 2 0 00-2 2v15a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800">{receta.nombre_archivo || `Receta #${receta.id}`}</p>
                                            <p className="text-xs text-gray-500">
                                                {/* Ajusta según el campo de fecha de tu API */}
                                                Subida el: {receta.fecha_creacion ? new Date(receta.fecha_creacion).toLocaleDateString() : 'Fecha desconocida'}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Botón Ver PDF (Asumiendo que receta.url o similar trae el link, si no, usa un link genérico o el endpoint de descarga) */}
                                    <a 
                                        href={receta.url || '#'} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md font-medium hover:bg-indigo-200 transition-colors text-sm"
                                    >
                                        Ver PDF
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p>No hay recetas registradas para este paciente.</p>
                        </div>
                    )}
                </div>
                
                <div className="bg-gray-100 px-6 py-4 flex justify-end">
                    <button 
                        onClick={() => setHistoryModalOpen(false)}
                        className="px-4 py-2 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-medium"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}