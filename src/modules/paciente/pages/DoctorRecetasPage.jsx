import React from 'react';
import { Link, useParams } from 'react-router-dom';
import MainLayout from '../../../core/layout/MainLayout';
import jsPDF from 'jspdf';

const emptyStateImage = "/icon1.png"; 

export default function DoctorRecetasPage() {
  const { id } = useParams();

  const doctorInfo = {
    id: id,
    nombre: 'Juan Pérez Pérez',
    especialidad: 'Gastroenterólogo'
  };

  const recetasData = id === '1' ? [
    {
      fecha: '01/12/2025',
      medicamentos: [
        { nombre: 'Paracetamol 500 gr', dosis: 'Tabletas - 12 tabletas', via: 'Vía Oral' },
        // Puedes agregar más para probar
      ]
    }
  ] : [];

  const hasRecetas = recetasData.length > 0;

  // --- 2. FUNCIÓN PARA GENERAR Y DESCARGAR EL PDF ---
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Configuración de fuente y colores
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40); // Gris oscuro

    // TÍTULO (Nombre de la clínica o encabezado)
    doc.text("UPA - Receta Médica", 20, 20);

    // LÍNEA SEPARADORA
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    // DATOS DEL DOCTOR
    doc.setFontSize(14);
    doc.setTextColor(30, 58, 138); // Azul oscuro (como tu diseño)
    doc.text(`Dr. ${doctorInfo.nombre}`, 20, 40);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(100); // Gris
    doc.text(doctorInfo.especialidad, 20, 48);

    // FECHA (Alineada a la derecha aprox)
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text(`Fecha: ${recetasData[0].fecha}`, 140, 40);

    // TÍTULO MEDICAMENTOS
    doc.setFontSize(12);
    doc.text("MEDICAMENTOS PRESCRITOS:", 20, 70);

    // ITERAR SOBRE LOS MEDICAMENTOS
    let yPosition = 85; // Posición vertical inicial para los medicamentos

    recetasData[0].medicamentos.forEach((med, index) => {
        doc.setFont("helvetica", "bold");
        doc.text(`${index + 1}. ${med.nombre}`, 25, yPosition);
        
        doc.setFont("helvetica", "normal");
        yPosition += 7; // Bajamos un poco para la dosis
        doc.text(`   Dosis: ${med.dosis}`, 25, yPosition);
        
        yPosition += 7; // Bajamos para la vía
        doc.text(`   Vía: ${med.via}`, 25, yPosition);

        yPosition += 15; // Espacio extra entre medicamentos
    });

    // PIE DE PÁGINA
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Este documento es informativo - UP-Ayotik", 20, 280);

    // 3. GUARDAR EL ARCHIVO
    doc.save(`Receta_${doctorInfo.nombre}_${recetasData[0].fecha}.pdf`);
  };

  return (
    <MainLayout>
      <div className="w-full px-8 py-8 max-w-6xl mx-auto">
        
        <div className="flex justify-between items-start mb-6">
            <Link 
                to="/paciente/recetas" 
                className="flex items-center text-blue-900 font-bold hover:text-blue-700 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver
            </Link>

            {hasRecetas && (
                <button 
                    onClick={handleDownloadPDF} // <--- 4. VINCULAMOS LA FUNCIÓN AL CLIC
                    className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-medium px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Descargar pdf
                </button>
            )}
        </div>

        {/* ... (El resto del contenido visual sigue igual) ... */}
        {hasRecetas ? (
            <div className="bg-blue-50/80 rounded-lg p-8 md:p-12 shadow-sm border border-blue-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-blue-900 mb-1">{doctorInfo.nombre}</h2>
                        <h3 className="text-xl font-bold text-blue-900">{doctorInfo.especialidad}</h3>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <span className="font-bold text-black text-lg">Fecha: {recetasData[0].fecha}</span>
                    </div>
                </div>

                <div>
                    <h4 className="font-extrabold text-black uppercase tracking-wide mb-6">MEDICAMENTOS</h4>
                    <div className="space-y-6">
                        {recetasData[0].medicamentos.map((med, index) => (
                            <div key={index} className="text-gray-900 font-medium text-lg leading-relaxed">
                                <p>{med.nombre}</p>
                                <p>{med.dosis}</p>
                                <p>Vía de administración: {med.via}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ) : (
            <div className="w-full">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-blue-900 mb-1">{doctorInfo.nombre}</h2>
                    <h3 className="text-xl font-bold text-blue-900">{doctorInfo.especialidad}</h3>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg h-96 flex flex-col items-center justify-center shadow-sm p-8">
                    <img src={emptyStateImage} alt="Sin recetas" className="w-48 h-48 object-contain mb-4 opacity-80"/>
                    <h4 className="text-xl font-bold text-blue-900 mb-1">No se encontraron recetas del día</h4>
                    <p className="text-gray-500 font-medium">Aún no tienes recetas</p>
                </div>
            </div>
        )}
      </div>
    </MainLayout>
  );
}