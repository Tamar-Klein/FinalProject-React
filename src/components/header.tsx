import "../style/header.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";

const Header: React.FC = () => {

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return (<>
        {isAuthenticated ? (
            <header>
                <h1>Welcome, {user?.name}!</h1>
                <button onClick={() => dispatch({ type: 'auth/logout' })}>Logout</button>
            </header>
        ) : (
            <header>
                <h1>Welcome, Guest!</h1>
            </header>
        )}

    </>)
}

export default Header;