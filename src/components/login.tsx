import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../services/authenticationApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/authSlice';

export interface FormValues {
    email: string;
    password: string;
}
const Login: React.FC = () => {
    const { register, handleSubmit,reset, formState: { errors } } = useForm<FormValues>();
    const nav= useNavigate();
    const dispatch = useDispatch();

   const onSubmit = async (data: FormValues) => {
    const response = await postLogin(data);
    if (response) {
        dispatch(setCredentials({
                user: response.user, 
                token: response.token
            }));
        nav('/dashboard');
        reset();
    } else {
        alert("ההתחברות נכשלה: אימייל או סיסמה שגויים.");
    }
    };

    const registerFromLogin=()=>{ 
        nav('/register');
    }

    return (<>
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* שדה אימייל */}
            <label htmlFor="email"></label>
            <input
                type="email"
                {...register("email", { required: "יש להזין אימייל", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "כתובת אימייל לא תקינה" } })}
                placeholder="אימייל"
            />
            {errors.email && <p>{errors.email.message}</p>}

            {/* שדה סיסמה */}
            <label htmlFor="password"></label>
            <input
                type="password"
                // pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,,  message: "הסיסמה חייבת לכלול אותיות ומספרים (מינימום 6)" }
                {...register("password", { required: "יש להזין סיסמה", minLength: { value: 6, message: "הסיסמה חייבת להיות לפחות 6 תווים" }, maxLength: { value: 16, message: "הסיסמה לא יכולה להיות יותר מ-16 תווים" } })}
                placeholder="סיסמה"
            />
            {errors.password && <p>{errors.password.message}</p>}

            <button type="submit">שלח</button>
        </form>
        <button onClick={registerFromLogin}>אם לא יצרת חשבון, לחץ כאן להרשמה</button>
        </>
    );
};

export default Login;