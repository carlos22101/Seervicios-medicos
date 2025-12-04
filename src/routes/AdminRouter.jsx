import { Routes, Route } from "react-router-dom";
import CreateAccountPage from "../modules/administrador/pages/CreateAccountPage";
import AdminHistoryPage from "../modules/administrador/pages/AdminHistoryPage";

export default function AdminRouter() {
  return (
    <Routes>
      <Route path="/" element={<CreateAccountPage />} />
      <Route path="/historial" element={<AdminHistoryPage />} />
    </Routes>
  );
}