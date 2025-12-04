import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../core/layout/MainLayout';

import iconTraducir from '/traducir.png'; 

// 1. IMPORTA TU IMAGEN DE DETALLE AQUÍ
import imgLavado from '/lavado.jpeg'; 

export default function TutorialLavado() {
  const [isTzotzil, setIsTzotzil] = useState(false);

  // --- CONTENIDO (ESPAÑOL / TZOTZIL) ---
  const content = {
    es: {
      titleMain: "LAVADO DE MANOS",
      introTitle: "Definición e Importancia",
      introText: "El lavado de manos es la medida más simple, económica y efectiva para prevenir una gran cantidad de enfermedades, como las Enfermedades Diarreicas Agudas (EDAS) e Infecciones Respiratorias Agudas (IRAS). Actúa como una barrera que elimina los microorganismos que recogemos del entorno. La correcta higiene de manos es esencial para garantizar un uso seguro de los medicamentos y mejorar la comprensión de las vías de administración.",
      
      impactTitle: "Impacto en las Vías de Administración",
      impactText: "El proceso de administrar un medicamento debe ser seguro y limpio. La falta de higiene en las manos puede llevar gérmenes directamente al organismo o al área de aplicación, comprometiendo el tratamiento.",
      
      sections: [
        {
          title: "1. Vía Oral",
          text: "Si las manos no están limpias, puedes transferir bacterias, virus o suciedad directamente al comprimido, cápsula, o a la boca mientras tomas el medicamento. Lávate las manos antes de sacar el medicamento del envase, antes de medir líquidos (como jarabes) y, por supuesto, antes de ingerir el medicamento."
        },
        {
          title: "2. Vía Tópica",
          text: "Si aplicas un medicamento tópico con las manos sucias, puedes introducir gérmenes en la herida o área afectada, provocando una infección secundaria o irritación. Lávate las manos antes y después de aplicar cualquier producto tópico. Esto es crucial para la curación y para evitar la contaminación del resto del envase."
        },
        {
          title: "3. Vía Oftálmica",
          text: "Los ojos son extremadamente sensibles. La suciedad o los gérmenes de las manos pueden causar infecciones graves (como conjuntivitis) al tocar el párpado o la punta del envase de las gotas. Lávate las manos rigurosamente con agua y jabón antes de aplicar cualquier tratamiento oftálmico. Asegúrate de que las manos no toquen la punta del gotero para mantener la esterilidad del medicamento."
        }
      ],

      preventTitle: "Prevención de Enfermedades",
      preventions: [
        {
          title: "1. Prevención de EDAS (Enfermedades Diarreicas Agudas)",
          text: "Las EDAS se transmiten a menudo por la vía fecal-oral. La falta de lavado de manos después de ir al baño, cambiar pañales o antes de manipular alimentos, permite que bacterias y virus pasen de las manos a la comida o directamente a la boca. Lavarse las manos reduce significativamente su incidencia."
        },
        {
          title: "2. Prevención de IRAS (Infecciones Respiratorias Agudas)",
          text: "Las IRAS incluyen el resfriado común, la gripe y otras infecciones. Los virus se propagan al toser, estornudar o tocar superficies contaminadas y luego tocarse la cara. Lavarse las manos corta la cadena de transmisión."
        }
      ],

      momentsTitle: "Momentos Clave para la Higiene",
      moments: [
        "Antes de administrar cualquier medicamento (oral, tópico u oftálmico).",
        "Después de manipular un medicamento o dispositivo de aplicación.",
        "Antes de preparar alimentos.",
        "Después de usar el baño.",
        "Después de toser o estornudar."
      ]
    },
    
    // --- TRADUCCIÓN TZOTZIL ---
    tz: {
      titleMain: "LAVADO DE MANOS (Jpok’ ta vinik bahtik)",
      introTitle: "Jpok’ ta vinik bahtik",
      introText: "Jpok’ ta vinik bahtik jna’ik ta melel, ja’ no’ox ta jtak’inbil ta smelts’an ta jk’opoj li ch’ulel ja’uk ta ik’otik ta jk’usiibal. Lekuk xa ta jk’opoj ta jk’usiibal ta smelts’an ta stsak tak’in ta jk’ayemel melel ta jk’usiibal sna’ ta jich’ ta sk’opoj.",
      
      impactTitle: "Sk’opoj sna’ jk’usiibal ta medikamento",
      impactText: "Ta jk’opoj sventa medikamento, jich’uk melel ta jna’bil ta jmuk’ jpoxtesel. Komel ta jk’usiibal vinik bahtik xa mutik sna’ jteklumel, puede ok sventa smelts’an gérmenes ta jniluk ja’uk ta sna’ jk’usiibal.",
      
      sections: [
        {
          title: "1. Vía Oral — Ta xchi’uk",
          text: "Riesgo: Ta jbak’tesel te smelts’an me vinik bahtik, puede ok sventa smelts’an ta sti’uk o ta ja’uk xa sts’unbil te medikamento. Prevención: Jpok’ ta vinik bahtik ja’uk ta sts’unel te medikamento o ta jñaxal ja’ (jarabe)."
        },
        {
          title: "2. Vía Tópica — Ta jch’ulel/ta jbankil ta skin",
          text: "Riesgo: Ta smelts’an crema, pomada o gel ta jtot’ ta vinik bahtik puede sk’uch’el smelts’an ta jbankil. Prevención: Jpok’ ta vinik bahtik antes y después ta sts’unel te medikamento ta jch’ulel."
        },
        {
          title: "3. Vía Oftálmica — Ta jmet ta ich’el (ojos)",
          text: "Riesgo: Ta smelts’an vinik bahtik ta jich’el mutik sna’ jchopol bilal ta ich’el, ja’uk puede sk’uch’el enfermedades como conjuntivitis. Prevención: Jpok’ ta vinik bahtik sventa lekuk, ja’uk sts’unel gota o pomada ta ich’el; muk’ ta jtot’ ta t’unel te gotero."
        }
      ],

      preventTitle: "Sventa ta jk’elal enfermedades",
      preventions: [
        {
          title: "Prevención de EDAS",
          text: "Te EDAS me lek ok smelts’antik ta fecal-oral. Conexión: Ta aytik ta baño ja’uk ta jich’mil pañal y ta jk’anbil ja’, ta jmuk’ jpoxtesel puede spixtes smelts’an ta sti’uk vinik. Solución: Jpok’ ta vinik bahtik puede sbajubtas ta jk’elal melel ta enfermedades."
        },
        {
          title: "Prevención de IRAS",
          text: "Enfermedades respiratorias. Conexión: Te virus respiratorios ok oksts’an cha’uk ta ich’el, ta chikin o ta sti’uk ta ok’el ta jtot’ob, teclados, juguetes y sna’ ta jtot’ ta sba. Solución: Jpok’ ta vinik bahtik ta smelts’an y ta avta me avañel cha’uk ta jtikinbil."
        }
      ],

      momentsTitle: "Momentos clave — K’opoj sna’ jk’usiibal",
      moments: [
        "Ja’uk ta sts’unel medikamento (oral, tópico u oftálmico).",
        "Después ta smelts’an medikamento.",
        "Antes ta jk’anbil ja’.",
        "Después ta aytik ta baño.",
        "Después ta cha’uk o ta ich’kotik."
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
                {current.titleMain}
            </h1>
        </div>

        {/* --- BARRA DE ACCIÓN --- */}
        <div className="flex justify-between items-center mb-6 shrink-0">
            <h2 className="text-xl md:text-2xl font-bold text-blue-900">
                Información detallada
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

        {/* --- CONTENIDO PRINCIPAL (DIVIDIDO) --- */}
        <div className="flex-1 flex flex-col md:flex-row gap-8 items-start overflow-hidden">
            
            {/* 1. COLUMNA IZQUIERDA: IMAGEN */}
            <div className="w-full md:w-1/3 bg-white border border-gray-200 shadow-md rounded-sm p-4 flex items-center justify-center h-full max-h-[600px]">
                <img 
                    src={imgLavado} 
                    alt="Lavado de manos" 
                    className="w-full h-full object-contain"
                />
            </div>

            {/* 2. COLUMNA DERECHA: TEXTO (CON SCROLL) */}
            <div className="w-full md:w-2/3 bg-white border border-gray-200 shadow-md rounded-sm p-8 h-full overflow-y-auto max-h-[600px] text-gray-800">
                
                {/* Introducción */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">{current.introTitle}</h3>
                    <p className="text-lg leading-relaxed text-justify">{current.introText}</p>
                </div>

                {/* Impacto */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">{current.impactTitle}</h3>
                    <p className="text-lg leading-relaxed mb-4 text-justify">{current.impactText}</p>
                    
                    {/* Lista de Vías */}
                    <div className="space-y-4">
                        {current.sections.map((section, idx) => (
                            <div key={idx} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h4 className="font-bold text-lg text-blue-800">{section.title}</h4>
                                <p className="text-base leading-relaxed">{section.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Prevención */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-3">{current.preventTitle}</h3>
                    <div className="space-y-4">
                         {current.preventions.map((prev, idx) => (
                            <div key={idx}>
                                <h4 className="font-bold text-lg text-gray-900">• {prev.title}</h4>
                                <p className="text-lg leading-relaxed pl-4">{prev.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Momentos Clave */}
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">{current.momentsTitle}</h3>
                    <ul className="list-disc list-inside space-y-2 text-lg">
                        {current.moments.map((moment, idx) => (
                            <li key={idx} className="pl-2">{moment}</li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>

      </div>
    </MainLayout>
  );
}