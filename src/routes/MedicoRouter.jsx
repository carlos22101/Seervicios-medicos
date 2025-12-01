import { Routes, Route } from "react-router-dom";
import DashboardMedico from "../modules/medico/pages/DashboardMedico";
import PacientesList from "../modules/medico/pages/Pacientelist";
import PacienteForm from "../modules/medico/pages/PacienteForm";

export default function MedicoRouter() {
  return (
    <Routes>
      <Route path="/" element={<DashboardMedico />} />
      <Route path="/pacientes" element={<PacientesList />} />
      <Route path="/pacientes/nuevo" element={<PacienteForm />} />
      <Route path="/pacientes/editar/:id" element={<PacienteForm />} />
    </Routes>
  );
}
