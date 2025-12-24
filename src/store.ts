import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice'; 
import ticketReducer from './features/ticketsSlice';
import usersReducer from './features/usersSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        tickets: ticketReducer,
        users: usersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;