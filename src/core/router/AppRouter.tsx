import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "@/features/auth/presentation/pages/LoginPage";
import { RegisterPage } from "@/features/auth/presentation/pages/RegisterPage";
import { PrivateRoute } from "./PrivateRoute";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { AllProjectsPage } from "@/features/project/presentation/pages/AllProjectsPage";
import { MyProjectsPage } from "@/features/project/presentation/pages/MyProjectsPage";
import { ForgotPasswordPage } from "@/features/auth/presentation/pages/ForgotPasswordPage";
import { DetailProjectPage } from "@/features/project/presentation/pages/DetailProjectPage";

export const AppRouter = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <BrowserRouter>
        <Routes>
          {/* Ruta principal con el layout para todas las páginas */}
          <Route element={<MainLayout />}>
            {/* Públicas */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/proyectos" element={<AllProjectsPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Detalle de proyecto */}
            <Route
              path="/proyectos/:projectId"
              element={<DetailProjectPage />}
            />

            {/* Privadas */}
            <Route
              path="/perfil"
              element={
                <PrivateRoute>
                  <MyProjectsPage />
                </PrivateRoute>
              }
            />

            {/* Redirección por defecto */}
            <Route path="*" element={<AllProjectsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
