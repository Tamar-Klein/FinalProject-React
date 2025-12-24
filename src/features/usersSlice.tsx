import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, createUser } from "../services/usersApi";
import type { User } from "../models/user";

interface UsersState {
    allUsers: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    allUsers: [],
    loading: false,
    error: null,
};

export const fetchAllUsers = createAsyncThunk("users/fetchAllUsers",
    async (_, { rejectWithValue }) => {
        try {
            const data = await getUsers(); return data;
        } catch (err: any) {
            return rejectWithValue("נכשל טעינת המשתמשים");
        }
    });

export const createNewUser = createAsyncThunk(
    "users/createNewUser",
    async (userData: any, { dispatch, rejectWithValue }) => {
        try {
            const response = await createUser(userData); 
            dispatch(fetchAllUsers()); 
            return response;
        } catch (err: any) {
            return rejectWithValue("יצירת המשתמש נכשלה");
        }
    }
);

const usersSlice = createSlice(
    {
        name: "users",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(fetchAllUsers.pending, (state) => { state.loading = true; state.error = null; })
                .addCase(fetchAllUsers.fulfilled, (state, action) => { state.loading = false; state.allUsers = action.payload; })
                .addCase(fetchAllUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
                .addCase(createNewUser.fulfilled, (state, action) => {state.loading = false;  state.allUsers.push(action.payload); })
                .addCase(createNewUser.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
    
  

            },
    });

export default usersSlice.reducer;