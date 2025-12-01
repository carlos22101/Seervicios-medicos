import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../core/layout/MainLayout';
import PacienteTable from '../components/PacienteTable';

export default function PacientesList() {
  

  const initialMocks = [
    { id: 1, nombre: 'Juan Pérez Pérez', curp: 'GRTS124567VIL8SLZA', email: 'juan123@gmail.com', expediente: '233679016' },
    { id: 2, nombre: 'Maria Lopez Garcia', curp: 'MLPS987654MDFRNN09', email: 'maria.log@hotmail.com', expediente: '233679017' },
    { id: 3, nombre: 'Pedro Ramirez', curp: 'PRMR112233HDFRNS05', email: 'pedro.ram@yahoo.com', expediente: '233679018' },
  ];

  const [pacientes, setPacientes] = useState(initialMocks);

  
  useEffect(() => {
    const storedPacientes = JSON.parse(localStorage.getItem('pacientesMock')) || [];
    if (storedPacientes.length > 0) {
      setPacientes([...initialMocks, ...storedPacientes]);
    }
  }, []);

  return (
    <MainLayout>
      <div className="w-full px-10 py-8">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 uppercase">
            PACIENTES
          </h1>
          
          <Link 
            to="/medico/pacientes/nuevo" 
            className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-medium px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nuevo paciente
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
             <PacienteTable data={pacientes} />
        </div>

      </div>
    </MainLayout>
  );
}