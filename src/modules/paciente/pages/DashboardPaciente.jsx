import MainLayout from '../../../core/layout/MainLayout';
import MenuCard from '../components/MenuCard';

// IMPORTANTE: Cambia estas rutas por los íconos reales de tu diseño
// Puedes usar '/tutoriales.png' si están en la carpeta public
import iconTutoriales from '/video 1.png'; // Pon aquí tu icono de monitor/video
import iconRecetas from '/documento 1.png';    // Pon aquí tu icono de hoja médica/receta

export default function DashboardPaciente() {
  return (
    <MainLayout>
      <div className='w-full min-h-screen flex items-center justify-center bg-white py-10'>
        {/* Contenedor flex para las tarjetas, igual que en médico */}
        <div className="flex flex-wrap justify-center gap-12">
          
          <MenuCard 
            title="TUTORIALES" 
            icon={iconTutoriales} 
            to={'/paciente/tutoriales'} 
          />
          
          <MenuCard 
            title="RECETAS" 
            icon={iconRecetas} 
            to={'/paciente/recetas'} 
          />
          
        </div>
      </div>
    </MainLayout>
  );
}