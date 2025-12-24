import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { createStatus } from "../../features/ticketsSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createNewUser } from "../../features/usersSlice";

const CreateStatusesCo = () => {
    const role = useSelector((state: RootState) => state.auth.user?.role);
    const dispatch = useDispatch<AppDispatch>();
    const [newStatusName, setNewStatusName] = useState("");
        const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data: any) => {
        try {
          await dispatch(createStatus(newStatusName)).unwrap(); setNewStatusName("");
            alert("סטטוס נוצר בהצלחה!");
            reset(); 
            navigate("/dashboard/");

        } catch (err) {
            alert("שגיאה ביצירה");
        }
    };

    return <>
        {role == "admin" &&
        <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="nameStatus"></label>
                <input name="nameStatus" type="text" placeholder="שם סטטוס חדש..." value={newStatusName} onChange={(e) => setNewStatusName(e.target.value)} />
                <button type="submit"> הוסף סטטוס  </button>
            </form>}

    </>

}

export default CreateStatusesCo;