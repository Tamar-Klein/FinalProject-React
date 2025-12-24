import { Link } from "react-router-dom";

const CustomerView = () => {



    return (
        <>
            <Link to="/dashboard/tickets">
              <button> ראה את הפניות</button>
              </Link>
            <Link to="/dashboard/tickets/new">
                <button >הוסף פניה</button>
            </Link>
        </>
    )
}

export default CustomerView;