import { Link } from "react-router-dom";


const AgentView = () => {

return (
    <>
        <h1>Agent</h1>
        <Link to="/dashboard/tickets">
            <button> ראה את הפניות</button>
        </Link>

    </>
)
}

export default AgentView;