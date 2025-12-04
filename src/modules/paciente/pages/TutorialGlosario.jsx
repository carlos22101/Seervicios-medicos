import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../core/layout/MainLayout';



const iconTraducir = "/traducir.png";
const imgGlosario = "/diccionario.png"; 

export default function TutorialGlosario() {
  const [isTzotzil, setIsTzotzil] = useState(false);

  const content = {
    es: {
      mainTitle: "GLOSARIO",
      subTitle: "Terminología Médica Básica",
      terms: [
        { term: "Dosis", def: "Cantidad de medicamento a tomar." },
        { term: "Frecuencia", def: "Cada cuánto tiempo se administra (ej. cada 8 horas)." },
        { term: "Duración del tratamiento", def: "Número de días de uso." },
        { term: "Vía de administración", def: "Forma en que entra el medicamento al cuerpo." },
        { term: "Contraindicaciones", def: "Situaciones en las que no se debe usar." },
        { term: "Efectos secundarios", def: "Reacciones no deseadas." },
        { term: "Receta médica", def: "Documento con indicaciones del médico." },
        { term: "Suspender el tratamiento", def: "Dejar de usar antes de tiempo." },
        { term: "Administración", def: "Acto de aplicar el medicamento." }
      ]
    },
    tz: {
      mainTitle: "GLOSARIO (Tzotzil)",
      subTitle: "Sk’opojel sventa poxtesel",
      terms: [
        { term: "Dosis", def: "K’usi ja’ o k’usi pastilla ya me’bej." },
        { term: "Frecuencia", def: "Banti ora ya me’bej (ej. ta 8 ora)." },
        { term: "Duración del tratamiento", def: "Banti kajeb ya me’bej." },
        { term: "Vía de administración", def: "Banti sk’opojel sba ya me’bej li medicamento ta ch’ulel." },
        { term: "Contraindicaciones", def: "K’usi o’tan a ma xme’ la ya sna’ik yu’un jna." },
        { term: "Efectos secundarios", def: "K’usi ya xpas sventa ta yo’tan jk’ojobal." },
        { term: "Receta médica", def: "K’opojel ja’ te ya jts’unbe li tatik/mamal." },
        { term: "Suspender el tratamiento", def: "Ta jchapik antes ta yo’tan jk’usi." },
        { term: "Administración", def: "Banti yo’tan ya jme’ li medicamento." }
      ]
    }
  };

  const current = isTzotzil ? content.tz : content.es;

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

            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 uppercase tracking-wide">
                {current.mainTitle}
            </h1>
        </div>

        {/* --- BARRA DE ACCIÓN --- */}
        <div className="flex justify-between items-center mb-6 shrink-0">
            <h2 className="text-xl md:text-2xl font-bold text-blue-900">
                {current.subTitle}
            </h2>

            <button
                onClick={() => setIsTzotzil(!isTzotzil)}
                className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-medium px-4 py-2 rounded-md flex items-center gap-2 transition-all shadow-sm"
            >
                <img 
                    src={iconTraducir} 
                    alt="Traducir" 
                    className="w-5 h-5 object-contain" 
                />
                {isTzotzil ? 'Traducir a Español' : 'Traducir a Tzotzil'}
            </button>
        </div>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="flex-1 flex flex-col md:flex-row gap-8 items-start overflow-hidden">
            
            {/* COLUMNA IZQUIERDA: IMAGEN */}
            <div className="w-full md:w-1/3 bg-white border border-gray-200 shadow-md rounded-sm p-4 flex items-center justify-center h-full max-h-[600px]">
                <img 
                    src={imgGlosario} 
                    alt="Glosario Médico" 
                    className="w-full h-full object-contain"
                />
            </div>

            {/* COLUMNA DERECHA: LISTA DE TÉRMINOS */}
            <div className="w-full md:w-2/3 bg-white border border-gray-200 shadow-md rounded-sm p-8 h-full overflow-y-auto max-h-[600px]">
                <ul className="space-y-6">
                    {current.terms.map((item, index) => (
                        <li key={index} className="flex flex-col border-b border-gray-100 pb-4 last:border-0">
                            {/* Término (Negrita y Azul) */}
                            <span className="text-xl font-bold text-blue-900 mb-1 flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                {item.term}
                            </span>
                            {/* Definición (Texto normal) */}
                            <span className="text-lg text-gray-700 pl-5 leading-relaxed">
                                {item.def}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

        </div>

      </div>
    </MainLayout>
  );
}