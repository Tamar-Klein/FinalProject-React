import { createSlice, createAsyncThunk, type PayloadAction, type UnknownAction } from "@reduxjs/toolkit";
import * as ticketService from "../services/ticketApi";
import { type Ticket } from "../models/tickets";
import type { TicketComment } from "../models/comments";
import * as commentsServices from "../services/commentsApi";
import * as statusesService from "../services/statusesApi"
import type { Status } from "../models/status";

interface TicketsState {
    list: Ticket[];
    currentComments: TicketComment[];
    statuses: Status[];
    selectedTicket: Ticket | null;
    loading: boolean;
    error: string | null;

}

const initialState: TicketsState = {
    list: [],
    currentComments: [],
    statuses: [],
    selectedTicket: null,
    loading: false,
    error: null,
};

// --- Thunks ---
export const fetchAllTickets = createAsyncThunk<Ticket[], void>(
    "tickets/fetchAll",
    async (_, { rejectWithValue }) => {
        try { return await ticketService.getAllTickets(); }
        catch (err: any) { return rejectWithValue("נכשלה טעינת הפניות"); }
    }
);

export const createNewTicket = createAsyncThunk<Ticket, { subject: string; description: string }>(
    "tickets/create",
    async (payload, { rejectWithValue }) => {
        try { return await ticketService.postTicket(payload.subject, payload.description); }
        catch (err: any) { return rejectWithValue("נכשלה יצירת הפנייה"); }
    }
);

export const removeTicket = createAsyncThunk<number, number>(
    "tickets/delete",
    async (id, { rejectWithValue }) => {
        try { await ticketService.deleteTicket(id); return id; }
        catch (err: any) { return rejectWithValue("מחיקה נכשלה"); }
    }
);

export const updateTicketStatus = createAsyncThunk<Ticket, { id: number, statusId: number }>(
    "tickets/updateStatus",
    async (payload: { id: number; statusId: number }, { rejectWithValue }) => {
        try { return await ticketService.updateTicketFields(payload.id, { status_id: payload.statusId }); }
        catch (err: any) { return rejectWithValue("עדכון הסטטוס נכשל"); }
    }
);
export const fetchTicketById = createAsyncThunk<Ticket, number>(
    "tickets/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            return await ticketService.getTicketById(id);
        } catch (err: any) {
            return rejectWithValue("נכשלה טעינת פרטי הפנייה");
        }
    }
);
export const getComments = createAsyncThunk<TicketComment[], number>(
    "comments/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            return await commentsServices.getCommentsByPostId(id);
        }
        catch (err: any) {
            return rejectWithValue("נכשלה טעינת הערות  הפנייה");
        }
    }
);
export const postComments = createAsyncThunk<TicketComment, { id: number, comment: string }>(
    "postcomments/fetchById",
    async (payload, { rejectWithValue }) => {
        try {
            return await commentsServices.postComment(payload.id, payload.comment);
        }
        catch (err: any) {
            return rejectWithValue("הוספת הערה נכשלה");
        }
    }
)
export const fetchAllStatuses = createAsyncThunk("tickets/fetchAllStatuses",
    async (_, { rejectWithValue }) => {
        try {
            return await statusesService.getAllStatuses();
        }
        catch (err: any) { return rejectWithValue("נכשלה טעינת הסטטוסים"); }
    });
export const createStatus = createAsyncThunk("tickets/createStatus", async (statusName: string, { rejectWithValue }) => { try { return await statusesService.postStatus(statusName); } catch (err: any) { return rejectWithValue("יצירת הסטטוס נכשלה"); } });

export const updateTicketAsync = createAsyncThunk(
    "tickets/updateTicket",
    async ({ id, data }: { id: number; data: any }, { rejectWithValue }) => {
        try {
            const response = await ticketService.updateTicketFields(id, data);
            return response; // השרת מחזיר את הטיקט המעודכן
        } catch (err: any) {
            return rejectWithValue("העדכון נכשל");
        }
    }
);
// --- Slice ---
const ticketSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        clearComments: (state: TicketsState) => {
            state.currentComments = [];
        },
        clearTicketError: (state: TicketsState) => {
            state.error = null;
        },
        clearSelectedTicket: (state: TicketsState) => {
            state.currentComments = [];
            state.selectedTicket = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTicketById.fulfilled, (state, action: PayloadAction<Ticket>) => {
            state.loading = false;
            state.selectedTicket = action.payload;
        })
            .addCase(fetchAllTickets.fulfilled, (state: TicketsState, action: PayloadAction<Ticket[]>) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(createNewTicket.fulfilled, (state: TicketsState, action: PayloadAction<Ticket>) => {
                state.loading = false;
                state.list.unshift(action.payload);
            })
            .addCase(removeTicket.fulfilled, (state: TicketsState, action: PayloadAction<number>) => {
                state.loading = false;
                state.list = state.list.filter(t => t.id !== action.payload);
            })
            .addCase(updateTicketStatus.fulfilled, (state: TicketsState, action: PayloadAction<Ticket>) => {
                state.loading = false;
                const index = state.list.findIndex(t => t.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(getComments.fulfilled, (state, action: PayloadAction<TicketComment[]>) => {
                state.loading = false;
                state.currentComments = action.payload;
            })
            .addCase(getComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(postComments.fulfilled, (state, action: PayloadAction<TicketComment>) => {
                state.loading = false;
                state.currentComments.push(action.payload)

            })
            .addCase(fetchAllStatuses.fulfilled, (state, action) => {
                state.loading = false;
                state.statuses = action.payload;
            })
            .addCase(createStatus.fulfilled, (state, action: PayloadAction<Status>) => { state.loading = false; state.statuses.push(action.payload); })
            .addCase(updateTicketAsync.fulfilled, (state, action) => {
                state.selectedTicket = action.payload;
                state.loading = false;
            })
            .addMatcher(
                (action: UnknownAction) => action.type.endsWith('/pending'),
                (state: TicketsState) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action: UnknownAction): action is PayloadAction<string> => action.type.endsWith('/rejected'),
                (state: TicketsState, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.error = action.payload || "שגיאה לא ידועה";
                }
            );
    }
});

export const { clearComments, clearTicketError } = ticketSlice.actions;
export default ticketSlice.reducer;