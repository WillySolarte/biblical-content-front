import { Navigate, Outlet, useLocation } from "react-router-dom";

import { routes } from "../common/constants/routes";
import useAuth from "@/features/auth/hooks/useAuth";

interface LocationState {
    from?: {
        pathname?: string;
    };
}


export default function PublicRoute() {

    const { data, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return null;
    }

    if (data) {

        const state = location.state as LocationState | null;

        const from = state?.from?.pathname || routes.app.panel;

        return <Navigate to={from} replace />;
    }

    return <Outlet />;
}
