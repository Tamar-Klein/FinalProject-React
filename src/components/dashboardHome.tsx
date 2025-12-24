import CustomerView from "./customerView";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import AdminView from "./admin/adminView";
import AgentView from "./agentView";

const DashboardHome = () => {

    const role = useSelector((state: RootState) => state.auth.user?.role)
    switch (role) {
        case "admin":
            return <AdminView />
            case "agent":
            return <AgentView/>
            default:
                return <CustomerView/>

    }
}

export default DashboardHome;