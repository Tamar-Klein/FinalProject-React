import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { Link } from "react-router-dom";

const Header: React.FC = () => {

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return (<>
        {isAuthenticated ? (
            <header>
                <h1>Welcome, {user?.name}!</h1>
                <button onClick={() => dispatch({ type: 'auth/logout' })}>Logout</button>
                {user?.role == "admin" && (
                    <>
                        <span> (Admin) </span>
                        <span> (Admin) </span>
                        <Link to="/dashboard/users">משתמשים</Link>
                        <Link to="/dashboard/createStatuses">סטטוסים</Link>
                        <Link to="/dashboard/tickets">פניות</Link>
                    </>)
                }
                {(user?.role == "agent" || user?.role == "customer") && (<>
                    <span> (Agent) </span>
                    <Link to="/dashboard/tickets">פניות</Link>
                     </>)
                }
            </header>
        ) : (
            <header>
                <h1>Welcome, Guest!</h1>
            </header>
        )}

    </>)
}

export default Header;