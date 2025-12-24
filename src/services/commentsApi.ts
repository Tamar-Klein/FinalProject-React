import api from "../api/interceptorToken";
const API_URL = "/tickets";
export const getCommentsByPostId = async (postId: number) => {
    try {
        const response = await api.get(`${API_URL}/${postId}/comments`);
        return response.data;
    } catch (err) {
        console.error("שגיאה: ", err);
        throw err;
    }
};

export const postComment = async (postId: number, commentData: string) => {
    try {
        const response = await api.post(`${API_URL}/${postId}/comments`, {content:commentData});
        return response.data;
    } catch (err) {
        console.error("שגיאה: ", err);
        throw err;
    }
} ;