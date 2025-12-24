import { useForm } from "react-hook-form";
import { createNewTicket } from "../features/ticketsSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import {useNavigate } from "react-router-dom";

export interface AddTicketValues {
    subject: string;
    description: string;
}
const NewTicketForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit,reset, formState: { errors } } = useForm<AddTicketValues>();
    const navigate = useNavigate();
    const onSubmit = async (data: AddTicketValues) => {
        const resultAction = await dispatch(createNewTicket(data));
        if (createNewTicket.fulfilled.match(resultAction)) {
            alert("הפנייה נוספה בהצלחה");
            navigate("/dashboard")
            reset();
        } else {
            alert(resultAction.payload || "הוספת הפנייה נכשלה");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* שדה נושא */}
                <label htmlFor="subject"></label>
                <input
                    type="text"
                    {...register("subject", { required: "יש להזין נושא" })}
                    placeholder="נושא"
                />
                {errors.subject && <p>{errors.subject.message}</p>}

                {/* שדה תיאור  */}
                <label htmlFor="description"></label>
                <input
                    type="text"
                    {...register("description", { required: "יש להזין תיאור" })}
                    placeholder="תיאור"
                />
                {errors.description && <p>{errors.description.message}</p>}
                <button type="submit">שלח</button>
            </form>
        </>
    )
}
export default NewTicketForm;