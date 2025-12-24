import { useEffect, useState, } from "react";
import type { Ticket } from "../models/tickets";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchAllStatuses, fetchAllTickets } from "../features/ticketsSlice";
import { Link } from "react-router-dom";
import type { Status } from "../models/status";


const GetTickets = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list: tickets, loading, error, statuses } = useSelector((state: RootState) => state.tickets);
    const currentUser = useSelector((state: RootState) => state.auth.user);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [sortOrder, setSortOrder] = useState<string>("desc");

    useEffect(() => {
        dispatch(fetchAllTickets());
        dispatch(fetchAllStatuses());
    }, [dispatch]);

    const filteredTickets = tickets.filter((ticket: Ticket) => {
        if (!currentUser) return false;

        let hasPermission = false;
        if (currentUser.role === "admin") hasPermission = true;
        else if (currentUser.role === "agent") hasPermission = ticket.assigned_to === currentUser.id;
        else if (currentUser.role === "customer") hasPermission = ticket.created_by === currentUser.id;
        if (!hasPermission) return false;
        const matchesStatus = selectedStatus === "all" || ticket.status_id === Number(selectedStatus);
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = ticket.subject.toLowerCase().includes(searchLower) ||
            (ticket.description?.toLowerCase().includes(searchLower));

        return matchesStatus && matchesSearch;
    });

   
    const sortedTickets = [...filteredTickets].sort((a, b) => {
      const priorityA = a.priority_id != null ? Number(a.priority_id) : 0;
    const priorityB = b.priority_id != null ? Number(b.priority_id) : 0;

        if (sortOrder === "desc") {
            return priorityB - priorityA;
        } else {
            return priorityA - priorityB; 
        }
    });
    if (loading) {
        return <div>טוען נתונים מהשרת...</div>;
    }

    if (error) {
        return <div style={{ color: "red" }}>שגיאה: {error}</div>;
    }
    return (
        <>
            <input type="text" placeholder="חיפוש פנייה לפי כותרת או תוכן..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>

            <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            >
                <option value="all">כל הסטטוסים</option>
                {statuses.map((s: Status) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                ))}
            </select>
            <div>
                    <label>מיין לפי עדיפות:</label>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="desc">מהגבוה לנמוך</option>
                        <option value="asc">מהנמוך לגבוה</option>
                    </select>
                </div>
            <div key={`${sortOrder}-${searchTerm}-${selectedStatus}`}>
                <h2>הפניות שלי</h2>
                {sortedTickets.length === 0 ? (
                    <p>לא נמצאו פניות להצגה.</p>
                ) : (
                    sortedTickets.map((ticket: Ticket) => (
                        <Link to={`/dashboard/tickets/${ticket.id}`} key={ticket.id}>
                            <button>
                                <strong>{ticket.subject}</strong>
                                <p>{ticket.description}</p>
                                <small>סטטוס: {ticket.status_name}</small>
                                <small>עדיפות: <strong>{ticket.priority_name || ticket.priority_id}</strong></small>
                                <div>{ticket.assigned_to}</div>
                            </button>
                        </Link>
                    ))
                )}
            </div></>
    );

}
export default GetTickets;