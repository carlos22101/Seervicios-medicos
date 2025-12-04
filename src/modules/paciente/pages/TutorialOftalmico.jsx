import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../core/layout/MainLayout';

import iconTraducir from '/traducir.png'; 

// 1. IMPORTA TU VIDEO AQUÍ
import videoOftalmico from '/oftal1.mp4'; 

export default function TutorialOftalmico() {
  const [isTzotzil, setIsTzotzil] = useState(false);

  const content = {
    es: {
      definitionTitle: "Definición:",
      definitionText: "Aplicación de gotas en los ojos.",
      stepsTitle: "Pasos:",
      steps: [
        "Lávese las manos.",
        "Incline la cabeza hacia atrás y mire hacia arriba.",
        "Coloque el dedo índice en la inferior del párpado inferior y tire hacia abajo suavemente",
        "Coloque la punta del frasco cerca del ojo, pero sin tocarlo.",
        "Presione suavemente el frasco para liberar una gota en el espacio entre el párpado inferior y el ojo .",
        "Cierre suavemente el ojo durante 1-2 minutos para permitir que el medicamento se absorba.",
        "Limpie suavemente el exceso de medicamento con un paño limpio",
        "Espere 5 minutos entre medicamentos diferentes y no lo comparta con otra persona."
      ]
    },
    tz: {
      definitionTitle: "Sk’opojel:",
      definitionText: "Ya jel sbak’etik ta ja’ sbetik (“gotas”) ta sbich’.",
      stepsTitle: "K’alan ta me’:",
      steps: [
        "Bats’bal ak’obtik.",
        "Ya jlux lu’um ta jch’un, ya lejel smeltsan.",
        "Ya jbat’il smeltsan ya jk’oxol sbich’ yu’un ay sba jch’un.",
        "Ya jch’ieltik li frasco k’usi ta sna’ sbich’, pero ma k’usi xkutuk sbich’.",
        "Ya jts’uts’be jun ja’ sbak’ yu’un ay sba jch’un.",
        "Ya jchapik sbich’ ta 1–2 minuto yu’un ta ya xjel li medicamento.",
        "Ya jlejel sventa li k’usi ya jnatík yu’un lats’ k’opojel.",
        "Ya kuxlej 5 minuto ta jk’an me’ otro ja’ sbak’, yu’un ma xkompartir sbak’ yo’ntonal junuk vinik."
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
                VÍA OFTÁLMICA
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
            
            {/* 2. COLUMNA IZQUIERDA: AHORA ES UN VIDEO */}
            <div className="w-full md:w-1/3 bg-white border border-gray-200 shadow-md rounded-sm p-4 flex items-center justify-center h-full max-h-[600px]">
                {/* Etiqueta VIDEO */}
                <video 
                    src={videoOftalmico} 
                    controls          // Muestra los botones de Play/Pausa/Volumen
                    className="w-full h-full object-contain rounded-sm"
                >
                    Tu navegador no soporta la reproducción de video.
                </video>
            </div>

            {/* COLUMNA DERECHA: TEXTO (Sin cambios) */}
            <div className="w-full md:w-2/3 bg-white border border-gray-200 shadow-md rounded-sm p-8 h-full overflow-y-auto max-h-[600px]">
                <div className="mb-4 text-gray-800">
                    <span className="font-bold text-lg">{currentContent.definitionTitle} </span>
                    <span className="text-lg">{currentContent.definitionText}</span>
                </div>

                <div>
                    <span className="font-bold text-lg block mb-2">{currentContent.stepsTitle}</span>
                    <ol className="list-decimal list-inside space-y-2 text-gray-800 text-lg leading-relaxed">
                        {currentContent.steps.map((step, index) => (
                            <li key={index} className="pl-2">
                                {step}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>

      </div>
    </MainLayout>
  );
}