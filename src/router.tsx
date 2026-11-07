import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import DefaultError404 from "./features/error/views/DefaultError404";


export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LandingPageLayout />}>
                    <Route path={routes.public.home} element={<LandingPageView />} index />
                </Route>

                <Route element={<PublicRoute />}>
                    <Route element={<AuthLayout />}>
                        <Route path={routes.auth.login} element={<LoginView />} />
                        <Route path={routes.auth.register} element={<RegisterView />} />
                    </Route>
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                        <Route path={routes.app.panel} element={<PanelView />} />
                        
                    </Route>
                </Route>

                <Route path="*" element={<DefaultError404 />} />
            </Routes>
        </BrowserRouter>
    )
}
