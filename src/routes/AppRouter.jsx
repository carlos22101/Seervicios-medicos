import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../modules/auth/pages/LoginPage";
import { RoleGuard } from "../core/auth/roleGuard";
import MedicoRouter from "./MedicoRouter";
import PacienteRouter from "./PacienteRouter";
// IMPORTAR EL ROUTER DE ADMIN (Asegúrate de crear este archivo, paso 2)
import AdminRouter from "./AdminRouter"; 

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Ruta del Médico */}
        <Route path="/medico/*" element={
            <RoleGuard allow={["medico"]}> <MedicoRouter /> </RoleGuard>
        } />

        {/* Ruta del Paciente */}
        <Route path="/paciente/*" element={
            <RoleGuard allow={["paciente"]}> <PacienteRouter /> </RoleGuard>
        } />

        {/* --- CORRECCIÓN AQUÍ --- */}
        {/* Cambiado 'admin' por 'administrador' para coincidir con tu API */}
        <Route path="/admin/*" element={
            <RoleGuard allow={["administrador"]}> 
              <AdminRouter /> 
            </RoleGuard>
        } />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}