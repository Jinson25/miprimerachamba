import React from "react";
import { useAuth } from "../../hooks/useAuth";
import NotFound from "../NotFound/NotFound";
import AuthRoute from "./AuthRoute";

function AdminRoute({ children }) {
  const { user } = useAuth();
  return user.isAdmin ? (
    children
  ) : (
    <NotFound
      linkRoute="/dashboard"
      linkText="Ir al panel de control"
      message="No tienes acceso a esta página"
    />
  );
}

const AdminRouteExport = ({ children }) => (
  <AuthRoute>
    <AdminRoute>{children}</AdminRoute>
  </AuthRoute>
);

export default AdminRouteExport;
