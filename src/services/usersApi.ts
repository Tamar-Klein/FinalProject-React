import api from "../api/interceptorToken";
import type { FormValuesRegister } from "../components/register";
const API_URL = "/users";

export const getUsers = async () => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (err) {
        console.error("שגיאה: ", err);
    }
};

export const getUserById = async (id: number) => {
    try {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    } catch (err) {
        console.error("שגיאה: ", err);
    }
};

export const createUser = async (userData: FormValuesRegister) => {
    try {
        const response = await api.post(API_URL, userData);
        return response.data;
    } catch (err) {
        console.error("שגיאה: ", err);
    }
};