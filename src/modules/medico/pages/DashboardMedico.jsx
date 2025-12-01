import MainLayout from '../../../core/layout/MainLayout';
import CardMenu from '../components/CardMenu';

import iconPacientes from '/bio.png'; 
import iconRecetas from '/bio.png';   

export default function DashboardMedico() {
  return (
    <MainLayout>
      <div className='w-full min-h-screen flex items-center justify-center bg-white py-10'>
        <div className="flex flex-wrap justify-center gap-12">
          
          <CardMenu 
            title="PACIENTES" 
            icon={iconPacientes} 
            to={'/medico/pacientes'} 
          />
          
          <CardMenu 
            title="RECETAS" 
            icon={iconRecetas} 
            to={'/medico/recetas'} 
          />
          
        </div>
      </div>
    </MainLayout>
  );
}