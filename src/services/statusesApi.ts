import api from "../api/interceptorToken";

const API_URL = "/statuses";
export const getAllStatuses = async () => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (err) {
        console.error("שגיאה: ", err);
    }
};
export const postStatus = async (name: string) => {
    try {
        const response = await api.post(API_URL, { name });
        return response.data;
    } catch (err) {
        console.error("שגיאה: ", err);
    }
};