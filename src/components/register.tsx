import React from 'react';
import { useForm } from 'react-hook-form';
import { postLogin, postRegister } from '../services/authenticationApi';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../features/authSlice";
export interface FormValuesRegister {
    name: string;
    email: string;
    password: string;
}
const Register: React.FC = () => {
    const { register, handleSubmit,reset, formState: { errors } } = useForm<FormValuesRegister>();
const dispatch = useDispatch(); 
    const nav = useNavigate(); 
    const onSubmit = async (data: FormValuesRegister) => {
        const response = await postRegister(data);
        if (response) 
          {const loginResponse = await postLogin({ 
            email: data.email, 
            password: data.password 
        });

        if (loginResponse && loginResponse.token) {
            dispatch(setCredentials({
                user: loginResponse.user,
                token: loginResponse.token
            }));
            nav('/dashboard');
        }
        reset();
          } 
        else {
            if(response && response.response?.status === 409)
                alert("ההרשמה נכשלה: האימייל כבר קיים במערכת.");
            else
                alert("ההרשמה נכשלה: שגיאה בשרת.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* שדה שם */}
            <label htmlFor="name"></label>
            <input
                {...register("name", { required: "יש להזין שם" })}
                placeholder="שם מלא"
            />
            {errors.name && <p>{errors.name.message}</p>}

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
                {...register("password", { required: "יש להזין סיסמה", pattern: { value: /^(?=.*[A-Za-z])(?=.*\d).{6,16}$/, message: "הסיסמה חייבת לכלול אותיות ומספרים (6-16 תווים)" } })}
                placeholder="סיסמה"
            />
            {errors.password && <p>{errors.password.message}</p>}

            <button type="submit">שלח</button>
        </form>
    );
};

export default Register;