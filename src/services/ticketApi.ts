import api from "../api/interceptorToken";

const API_URL = "/tickets";
export const getAllTickets = async () => {
    try {
        const response = await api.get(API_URL)
        return response.data;
    } catch (err) {
        console.error("שגיאה: ", err);
        throw err;
    }
}
export const postTicket = async (subject: string, description: string) => {
    try {
        const response = await api.post(API_URL, { subject, description });
        return response.data;
    } catch (err) {
        console.error("שגיאה: ", err);
        throw err;
    }
};
export const deleteTicket = async (id: number) => {
    try {
        const response = await api.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (err) {
        console.error("שגיאה: ", err);
        throw err;
    }
};      

export const getTicketById = async (id: number) => {
    try {
        const response = await api.get(`${API_URL}/${id}`); 
        return response.data;
    } catch (err) {
        console.error("שגיאה: ", err);
        throw err;
    }   
};

export const updateTicketFields = async (
    id: number, 
    updateData: { 
        status_id?: number; 
        priority_id?: number; 
        assigned_to?: number; 
    }
) => {
    try {
        const response = await api.patch(`${API_URL}/${id}`, updateData);
        return response.data;
    } catch (err) {
        console.error("שגיאה בעדכון שדות הפנייה: ", err);
        throw err;
    }
};