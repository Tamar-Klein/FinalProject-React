import { createSlice,type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../models/user';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
}
const initialState: AuthState = {
    user: null, 
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    isInitialized :false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state:AuthState, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.isInitialized = true;
        },
        logout: (state:AuthState) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token'); 
            state.isInitialized = true;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;