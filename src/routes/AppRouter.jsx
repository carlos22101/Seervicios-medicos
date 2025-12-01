import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../modules/auth/pages/LoginPage";
import { RoleGuard } from "../core/auth/roleGuard";
import MedicoRouter from "./MedicoRouter";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas del médico */}
        <Route
          path="/medico/*"
          element={
            <RoleGuard allow={["medico"]}>
              <MedicoRouter />
            </RoleGuard>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
