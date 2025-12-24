import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import "../../style/guard/loginGuard.css";
import { Navigate, Outlet } from "react-router-dom";

const LoginGuard:React.FC=() => {
  const { isAuthenticated, isInitialized } = useSelector((state: RootState) => state.auth);
    const token = localStorage.getItem("token");
   if (!isInitialized) {
        return <div className="loading-screen">בודק הרשאות גישה...</div>;
    }
    if (!token ||!isAuthenticated) {
      return <Navigate to="/login"  replace/>;       
    }
    return ( <Outlet /> );
}
 
export default LoginGuard;