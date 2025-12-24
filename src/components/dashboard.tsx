import { Outlet } from "react-router-dom";
import Header from "./header";
const Dashboard = () => {


    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Dashboard;