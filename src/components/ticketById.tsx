import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../store";
import { fetchAllStatuses, fetchTicketById, getComments, postComments, removeTicket, updateTicketAsync } from "../features/ticketsSlice";
import { useEffect, useState } from "react";
import type { TicketComment } from "../models/comments";
import { useForm } from "react-hook-form";
import type { Status } from "../models/status";
import { fetchAllUsers } from "../features/usersSlice";

export interface AddComment {
  content: string;
}

const TicketById: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const ticket = useSelector((state: RootState) => state.tickets.selectedTicket)
  const comments = useSelector((state: RootState) => state.tickets.currentComments)
  const role = useSelector((state: RootState) => state.auth.user?.role)
  const statuses = useSelector((state: RootState) => state.tickets.statuses)
  const allUsers = useSelector((state: RootState) => state.users.allUsers)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddComment>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(fetchTicketById(Number(id)));
      dispatch(getComments(Number(id)));
    }
    dispatch(fetchAllStatuses());
    if (role === "admin") {
    dispatch(fetchAllUsers());
    }
  }, [dispatch, id]);



  const onSubmit = async (data: AddComment) => {
    if (id) {
      try {
        await dispatch(postComments({ id: Number(id), comment: data.content })).unwrap();
        reset();
        setIsFormOpen(false)
      }
      catch (err) {
        console.log(err);

      }

    }
  };
  const handleUpdateTicket = async (fields: { status_id?: number, priority_id?: number, assigned_to?: number }) => {
    try {
      await dispatch(updateTicketAsync({ id: Number(id), data: fields })).unwrap();
      alert("העדכון בוצע בהצלחה");
    } catch (err) {
      console.error("נכשל העדכון", err);
    }
  };


  const deleteT = async () => {
    try {
      await dispatch(removeTicket(Number(id))).unwrap();
      navigate("/dashboard/tickets")
    }
    catch (err) {
      console.log(err, ",המחיקה נכשלה");

    }
  }
  return (<>
    <h1>{ticket?.subject}</h1>
    <h3>{ticket?.description}</h3>
    {comments.map((comment: TicketComment) => (
      <div key={comment.id}>
        <span>{comment.content}</span>
        <div>{comment.author_name}</div>
      </div>
    ))
    }

    {ticket?.status_id == 1 &&
      !isFormOpen && (
        <button onClick={() => setIsFormOpen(true)}>הוסף תגובה</button>)}

    {isFormOpen &&
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="content"></label>
        <textarea
          {...register("content", { required: "יש להזין תגובה " })}
          placeholder="כתוב כאן..." rows={4}
        />
        {errors.content && <p>{errors.content.message}</p>}
        <button type="submit">שלח תגובה </button> <button type="button" onClick={() => setIsFormOpen(false)}>ביטול</button> </form>}
    {
      (role === "agent" || role === "admin") && (
        <div> <label>עדכן סטטוס פנייה: </label> <select value={ticket?.status_id ?? ""} onChange={(e) => handleUpdateTicket({ status_id: Number(e.target.value) })} > <option value="" disabled>בחר סטטוס...</option> {statuses.map((s: Status) => (<option key={s.id} value={s.id}> {s.name} </option>))} </select> </div>)}
    {role === "admin" && <button onClick={() => deleteT()}>מחיקת פניה</button>}
    {role === "admin" && (
      <>
        <div>
          <label>הקצאה לנציג: </label>
          <select 
            value={ticket?.assigned_to ?? ""} 
            onChange={(e) => handleUpdateTicket({ assigned_to: Number(e.target.value) })}
          >
            <option value="">-- ללא הקצאה --</option>
            {allUsers.filter(u => u.role === "agent").map(agent => (
              <option key={agent.id} value={agent.id}>{agent.name}</option>
            ))}
          </select>
        </div>

        <div >
          <label>עדיפות: </label>
          <select 
            value={ticket?.priority_id ?? ""} 
            onChange={(e) => handleUpdateTicket({ priority_id: Number(e.target.value) })}
          >
            <option value="1">נמוכה</option>
            <option value="2">בינונית</option>
            <option value="3">גבוהה</option>
            <option value="4">דחופה</option>
          </select>
        </div>
  </>
  )
}  </>);
};

export default TicketById;