import { useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";


interface RoleGuardProps {
    allowedRoles: ("customer" | "agent" | "admin")[];
}

const RoleGuard: FC<RoleGuardProps> = ({ allowedRoles }) => {
    const  isInitialized  = useSelector((state: RootState) => state.auth.isInitialized);
        const userRole = useSelector((state: RootState) => state.auth.user?.role);

    if (!isInitialized) {
        return <div>טוען נתונים...</div>; 
    }
    const hasAccess = userRole && allowedRoles.includes(userRole);

    
    if (!hasAccess)
        return <Navigate to="/dashboard" replace />;
    return (<Outlet />)


}
export default RoleGuard;