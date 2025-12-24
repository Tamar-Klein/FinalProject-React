import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../features/usersSlice";
import type { AppDispatch } from "../../store";
import { Link } from "react-router-dom";

const Users = () => {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: any) => state.users.allUsers);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);
    return <><div>
        {users.length === 0 ? (
            <p>לא נמצאו פניות להצגה.</p>
        ) : (
            users.map((user: any) => (
                <div key={user.id}>
                    <h3>{user.name}</h3>
                </div>
            ))
        )}
    </div>

        <Link to="create">
            <button>הוספת משתמש</button>
        </Link>
    </>
}
export default Users;