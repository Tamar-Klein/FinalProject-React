import { Link } from "react-router-dom";
const AdminView = () => {

   

return (
    <>
        <h1>Agent</h1>
        <Link to="/dashboard/tickets">
            <button> ראה את הפניות</button>
        </Link>

     
            <Link to="/dashboard/users">
                <button>משתמשים</button>
            </Link>

            <Link to="/dashboard/createStatuses">
                <button>צור סטטוס</button>
            </Link>
    </>
)
}

export default AdminView;