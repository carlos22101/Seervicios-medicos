import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../core/layout/MainLayout';
import MenuCard from '../components/MenuCard';

// --- IMPORTA TUS IMÁGENES AQUÍ ---
import iconOftalmico from '/oftalmico.png'; 
import iconTopica from '/unguento.png';
import iconOral from '/pastillas.png';
import iconLavado from '/manos.png';
import iconGlosario from '/vocabulario.png'; 

export default function TutorialesPage() {
  return (
    <MainLayout>
      <div className="w-full h-full px-8 py-6 max-w-6xl mx-auto flex flex-col justify-center">
        
        {/* --- CABECERA --- */}
        <div className="mb-8 shrink-0">
            <Link 
                to="/paciente" 
                className="flex items-center text-blue-900 font-bold hover:text-blue-700 transition-colors w-fit mb-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver
            </Link>

            <h1 className="text-3xl font-extrabold text-blue-900 uppercase tracking-wide">
                TUTORIALES
            </h1>
            <h2 className="text-xl font-bold text-blue-900">
                Vías de administración
            </h2>
        </div>

        {/* --- GRID PRINCIPAL --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0 justify-between">
            
            {/* --- FILA 1 --- */}
            <MenuCard 
                title="OFTÁLMICO" 
                icon={iconOftalmico} 
                to="/paciente/tutoriales/oftalmico" 
            />

            <MenuCard 
                title="TÓPICA" 
                icon={iconTopica} 
                to="/paciente/tutoriales/topica" 
            />

            <MenuCard 
                title="ORAL" 
                icon={iconOral} 
                to="/paciente/tutoriales/oral" 
            />

            {/* --- FILA 2 --- */}
            
            {/* 1. LAVADO DE MANOS (Ocupa 2 columnas) */}
            <Link 
                to="/paciente/tutoriales/lavado-manos" 
                className="md:col-span-2 w-full"
            >
                <div className="
                    w-full h-72
                    bg-white 
                    border border-gray-200 
                    rounded-sm 
                    shadow-sm 
                    hover:shadow-xl hover:-translate-y-1 hover:border-blue-600
                    transition-all duration-300
                    flex items-center justify-between
                    px-10                    
                    cursor-pointer
                    group
                ">
                    {/* Texto Izquierda (Columna flexible) */}
                    <div className="flex flex-col items-start">
                        {/* Título Grande */}
                        <span className="text-blue-900 font-bold text-3xl tracking-wide uppercase mb-2">
                            ¿SABÍAS QUÉ?
                        </span>
                        {/* Subtítulo Más Pequeño */}
                        <span className="text-blue-900 font-bold text-xl tracking-wide uppercase opacity-90 group-hover:opacity-100">
                            Lavado de manos
                        </span>
                    </div>

                    {/* Imagen Derecha */}
                    <div className="mr-4">
                        <img 
                            src={iconLavado} 
                            alt="Lavado de manos" 
                            className="w-40 h-40 object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                </div>
            </Link>

            {/* 2. GLOSARIO */}
            <MenuCard 
                title="GLOSARIO" 
                icon={iconGlosario} 
                to="/paciente/tutoriales/glosario" 
            />

        </div>

      </div>
    </MainLayout>
  );
}