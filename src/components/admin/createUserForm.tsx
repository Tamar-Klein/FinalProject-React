import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createNewUser } from "../../features/usersSlice";
import type { AppDispatch } from "../../store";
import { Link, useNavigate } from "react-router-dom";

const CreateUserForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data: any) => {
        try {
            await dispatch(createNewUser(data)).unwrap();
            alert("משתמש נוצר בהצלחה!");
            reset(); 
            navigate("/dashboard/users");

        } catch (err) {
            alert("שגיאה ביצירה");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
            <h3>יצירת משתמש חדש</h3>
            <label htmlFor="name"></label>
            <input id="name"{...register("name", { required: "שם הוא שדה חובה" })} placeholder="שם מלא" />
            {errors.name && <span style={{ color: 'red' }}>{errors.name.message as string}</span>}
            <label htmlFor="email"></label>
            <input id="email"{...register("email", { required: "אימייל הוא שדה חובה" })} placeholder="אימייל" type="email" />
            <label htmlFor="password"></label>
            <input id="password"{...register("password", { required: "סיסמה חובה", minLength: 6 })} placeholder="סיסמה" type="password" />

            <select {...register("role")}>
                <option value="customer">לקוח (Customer)</option>
                <option value="agent">נציג (Agent)</option>
                <option value="admin">מנהל (Admin)</option>
            </select>

            <button type="submit">צור משתמש</button>
            <button type="button" onClick={() => reset()}>איפוס</button>
            <Link to="/dashboard/users">
                <button >ביטול</button>
            </Link>
        </form>
    );
};
export default CreateUserForm;