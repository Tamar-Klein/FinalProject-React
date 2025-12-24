import api from "../api/interceptorToken";

const API_URL = "/priorities";
export const getAllPriorities = async () => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (err) {
        console.error("שגיאה: ", err);
    }
};
export const postPriority = async (priorityName: string) => {
    try {
        const response = await api.post(API_URL, { priorityName });
        return response.data;
    } catch (err) {
        console.error("שגיאה: ", err);
    }
};