import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function MainLayout({ children }) {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  // Helper para mostrar el nombre o un fallback
  const userName = user?.nombre || 'Usuario';
  const userEmail = user?.correo || '';
  const userRole = user?.tipo || 'Usuario';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b border-gray-200 h-20 px-8 flex justify-between items-center relative z-20">
        
        {/* LOGO */}
        <Link to="/medico" className="flex items-center cursor-pointer hover:opacity-90 transition-opacity">
            <img src="/logo.jpeg" alt="Logo UPA" className="h-14 object-contain" />
        </Link>

        {/* ÁREA DE USUARIO */}
        <div className="relative">
            
            <button 
                onClick={() => setShowMenu(!showMenu)}
                className="text-blue-900 hover:text-blue-700 transition-colors focus:outline-none flex items-center justify-center gap-2"
            >
                {/* Opcional: Mostrar nombre también fuera */}
                <span className="hidden md:block text-sm font-medium text-gray-600 mr-2">
                    Hola, {userName.split(' ')[0]}
                </span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>

            {/* MENÚ DESPLEGABLE */}
            {showMenu && (
                <>
                    <div 
                        className="fixed inset-0 z-10 cursor-default" 
                        onClick={() => setShowMenu(false)}
                    ></div>

                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-lg shadow-xl border border-gray-100 z-20 overflow-hidden animate-fadeIn">
                        
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                            {/* ROL DEL USUARIO */}
                            <p className="text-xs text-blue-600 uppercase font-bold tracking-wider mb-1">
                                {userRole}
                            </p>
                            
                            {/* NOMBRE REAL DE LA API */}
                            <p className="text-sm font-bold text-gray-900 truncate" title={userName}>
                                {userName}
                            </p>
                            
                            {/* CORREO REAL DE LA API */}
                            <p className="text-xs text-gray-500 truncate" title={userEmail}>
                                {userEmail}
                            </p>
                        </div>

                        <button 
                            onClick={logout} 
                            className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors font-medium"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Cerrar sesión
                        </button>
                    </div>
                </>
            )}
        </div>

      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 bg-white flex flex-col relative z-0">
        {children}
      </main>

    </div>
  )
}