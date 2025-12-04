import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../core/layout/MainLayout';

import iconTraducir from '/traducir.png'; 

// 1. IMPORTA TU VIDEO AQUÍ (Asegúrate de tener este archivo)
import videoOral from '/oral.mp4'; 

export default function TutorialOral() {
  const [isTzotzil, setIsTzotzil] = useState(false);

  // --- DATOS DEL CONTENIDO ---
  const content = {
    es: {
      definitionTitle: "Definición:",
      definitionText: "Administrar el medicamento por la boca, en forma de tabletas, cápsulas o jarabes.",
      
      stepsTitle: "Pasos:",
      steps: [
        "Lávese las manos.",
        "Tome el medicamento con agua."
      ],

      recsTitle: "Recomendaciones:",
      recs: [
        "Respete horarios exactos.",
        "No mastique a menos que el médico lo indique.",
        "No suspenda antes de tiempo.",
        "No administre más de la dosis indicada por el médico.",
        "Mantenga los medicamentos fuera del alcance de los niños.",
        "Tome según las indicaciones del médico (Antes, durante o después de las comidas, antes de acostarse, etc.)"
      ]
    },
    tz: {
      definitionTitle: "Sk’opojel:",
      definitionText: "Ta me’ ta ja’ smeltsan li medicamento, yu’un pastilla, cápsula o jarabe.",
      
      stepsTitle: "K’alan ta me’:",
      steps: [
        "Bats’pok ak’obtik.",
        "Me’ li medicamento ta jo’."
      ],

      recsTitle: "Sts’amal k’usi ya xchi’uk:",
      recs: [
        "Ta lek o’ntonal ya jich’be ta ora k’anantik.",
        "Ma xajtoj a menos li tatik/mamal (médico) ya avotik.",
        "Ma xk'albe yu’un ta yotil ach’ k’usi.",
        "Ma xme’ junuk xa li k’usi ya k’anantik li tatik/mamal.",
        "Ya jk’an ta yich’uk li medicamento ta jme’tik/ajtsel me’iletik sba yo’tan antsetik viniketik.",
        "Ya me’ sok ta yich’uk ta o’ntonal tal a’tel tatik/mamal (k’usi ora: antes, durante o después de comida)."
      ]
    }
  };

  const currentContent = isTzotzil ? content.tz : content.es;

  return (
    <MainLayout>
      <div className="w-full h-full px-8 py-6 max-w-7xl mx-auto flex flex-col">
        
        {/* --- CABECERA --- */}
        <div className="mb-4 shrink-0">
            <Link 
                to="/paciente/tutoriales" 
                className="flex items-center text-blue-900 font-bold hover:text-blue-700 transition-colors w-fit mb-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver
            </Link>

            <h1 className="text-4xl font-extrabold text-blue-900 uppercase tracking-wide">
                VÍA ORAL
            </h1>
        </div>

        {/* --- BARRA DE ACCIÓN --- */}
        <div className="flex justify-between items-center mb-6 shrink-0">
            <h2 className="text-2xl font-bold text-blue-900">
                Vías de administración
            </h2>

            <button
                onClick={() => setIsTzotzil(!isTzotzil)}
                className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-medium px-4 py-2 rounded-md flex items-center gap-2 transition-all shadow-sm"
            >
                <img 
                    src={iconTraducir} 
                    alt="Icono traducir" 
                    className="w-5 h-5 object-contain" 
                />
                {isTzotzil ? 'Traducir a Español' : 'Traducir a Tzotzil'}
            </button>
        </div>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="flex-1 flex flex-col md:flex-row gap-8 items-start overflow-hidden">
            
            {/* COLUMNA IZQUIERDA: VIDEO */}
            <div className="w-full md:w-1/3 bg-white border border-gray-200 shadow-md rounded-sm p-4 flex items-center justify-center h-full max-h-[600px]">
                <video 
                    src={videoOral} 
                    controls 
                    className="w-full h-full object-contain rounded-sm"
                >
                    Tu navegador no soporta la reproducción de video.
                </video>
            </div>

            {/* COLUMNA DERECHA: TEXTO (Con Scroll si es necesario) */}
            <div className="w-full md:w-2/3 bg-white border border-gray-200 shadow-md rounded-sm p-8 h-full overflow-y-auto max-h-[600px]">
                
                {/* Definición */}
                <div className="mb-6 text-gray-800">
                    <span className="font-bold text-lg text-blue-900 block mb-1">{currentContent.definitionTitle} </span>
                    <span className="text-lg leading-relaxed">{currentContent.definitionText}</span>
                </div>

                {/* Pasos */}
                <div className="mb-6">
                    <span className="font-bold text-lg text-blue-900 block mb-2">{currentContent.stepsTitle}</span>
                    <ol className="list-decimal list-inside space-y-2 text-gray-800 text-lg leading-relaxed">
                        {currentContent.steps.map((step, index) => (
                            <li key={index} className="pl-2">
                                {step}
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Recomendaciones (Nueva Sección) */}
                <div>
                    <span className="font-bold text-lg text-blue-900 block mb-2">{currentContent.recsTitle}</span>
                    <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg leading-relaxed">
                        {currentContent.recs.map((rec, index) => (
                            <li key={index} className="pl-2">
                                {rec}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>

      </div>
    </MainLayout>
  );
}