//React

//Libraries
import { Navigate, Outlet, useLocation } from "react-router-dom";

//My resources
import { routes } from "../common/constants/routes";
import Spinner from "@/common/components/spinner/Spinner";
import type { TUserActive } from "@/features/user/types/user.types";
import useAuth from "@/features/auth/hooks/useAuth";



export default function ProtectedRoute() {

    const { data, isError, isLoading } = useAuth();
    const location = useLocation();

    const userDataShare: TUserActive = {
        id: data?.id || '',
        name: data?.name || '',
        email: data?.email || '',
        role: data?.role || '',
        photo: data?.photo || undefined
        
    }

    if (isLoading) {
        return <Spinner />;
    }

    if (isError || !data) {
        return <Navigate to={routes.auth.login} state={{ from: location }} replace />;
    }
    
    return <Outlet context={userDataShare} />;
}
