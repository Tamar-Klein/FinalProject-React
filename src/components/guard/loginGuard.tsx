import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { Navigate, Outlet } from "react-router-dom";

const LoginGuard:React.FC=() => {
  const { isAuthenticated, isInitialized } = useSelector((state: RootState) => state.auth);
    const token = localStorage.getItem("token");
if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (!isInitialized) {
    return <div className="loading-screen">טוען...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
    return ( <Outlet /> );
}
 
export default LoginGuard;