import { Routes, Route } from "react-router-dom";

// Importación de las páginas del Paciente
import DashboardPaciente from "../modules/paciente/pages/DashboardPaciente";
import RecetasPage from "../modules/paciente/pages/RecetasPage";
import DoctorRecetasPage from "../modules/paciente/pages/DoctorRecetasPage";
import TutorialesPage from "../modules/paciente/pages/TutorialesPage";

// Importación de los Tutoriales específicos
import TutorialOftalmico from "../modules/paciente/pages/TutorialOftalmico";
import TutorialTopico from "../modules/paciente/pages/TutorialTopico";
import TutorialOral from "../modules/paciente/pages/TutorialOral";
import TutorialLavado from "../modules/paciente/pages/TutorialLavado";
import TutorialGlosario from "../modules/paciente/pages/TutorialGlosario";

export default function PacienteRouter() {
  return (
    <Routes>
      {/* 1. Dashboard Principal del Paciente */}
      <Route path="/" element={<DashboardPaciente />} />

      {/* 2. Sección de Recetas */}
      <Route path="/recetas" element={<RecetasPage />} />
      <Route path="/recetas/doctor/:id" element={<DoctorRecetasPage />} />

      {/* 3. Menú Principal de Tutoriales */}
      <Route path="/tutoriales" element={<TutorialesPage />} />

      {/* 4. Sub-rutas de los Tutoriales (Vías de administración) */}
      <Route path="/tutoriales/oftalmico" element={<TutorialOftalmico />} />
      <Route path="/tutoriales/topica" element={<TutorialTopico />} />
      <Route path="/tutoriales/oral" element={<TutorialOral />} />
      <Route path="/tutoriales/lavado-manos" element={<TutorialLavado />} />
      <Route path="/tutoriales/glosario" element={<TutorialGlosario />} />


    </Routes>
  );
}