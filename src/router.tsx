import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { routes } from "./common/constants/routes";
import LandingPageLayout from "./layouts/LandingPageLayout";
import LandingPageView from "./views/LandingPage/LandingPageView";
import PublicRoute from "./routes/PublicRoute";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./features/auth/views/LoginView";
import RegisterView from "./features/auth/views/RegisterView";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import PanelView from "./features/panel/views/PanelView";
import SettingsView from "./features/panel/views/SettingsView";
import ProjectsListView from "./features/projects/views/ProjectsListView";
import CreateProjectView from "./features/projects/views/CreateProjectView";
import ProjectDetailView from "./features/projects/views/ProjectDetailView";
import DefaultError404 from "./features/error/views/DefaultError404";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Page */}
        <Route element={<LandingPageLayout />}>
          <Route path={routes.public.home} element={<LandingPageView />} index />
        </Route>

        {/* Auth Routes */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path={routes.auth.login} element={<LoginView />} />
            <Route path={routes.auth.register} element={<RegisterView />} />
          </Route>
        </Route>

        {/* Private / Protected App Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path={routes.app.panel} element={<PanelView />} />
            <Route path={routes.app.projects} element={<ProjectsListView />} />
            <Route path={routes.app.createProject} element={<CreateProjectView />} />
            <Route path={routes.app.projectDetail} element={<ProjectDetailView />} />
            <Route path={routes.app.settings} element={<SettingsView />} />
            {/* Redirect /app to /app/panel */}
            <Route path="/app" element={<Navigate to={routes.app.panel} replace />} />
          </Route>
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<DefaultError404 />} />
      </Routes>
    </BrowserRouter>
  );
}
