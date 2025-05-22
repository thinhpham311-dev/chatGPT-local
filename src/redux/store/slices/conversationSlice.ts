import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { apiGetConversations, apiCreateConversation, apiDeleteConversation, apiUpdateConversation } from '@/services/ConversationService'
import { RootState } from "@/redux/store";
import { Conversation } from "@prisma/client";

export interface conversationState {
    loadingList: boolean;
    loadingAction: boolean;
    loadingActionEdit: boolean;
    conversations: Conversation[] | undefined;
    conversationId: number | null;
    error: string | undefined;
}

const initialState: conversationState = {
    loadingList: false,
    loadingAction: false,
    loadingActionEdit: false,
    conversations: [],
    conversationId: null,
    error: undefined,
}

export const getConversationsList = createAsyncThunk(
    "conversation/listConversations",
    async () => {
        const response: any = await apiGetConversations()
        return response.data
    }
)


export const postAddConversation = createAsyncThunk(
    "conversation/addConversation",
    async (data: Conversation) => {
        const response: any = await apiCreateConversation(data)
        return response.data
    }
)


export const deleteRemoveConversation = createAsyncThunk(
    "conversation/removeConversation",
    async (data: Conversation) => {
        const response: any = await apiDeleteConversation(data)
        return response.data
    }
)


export const putUpdateConversation = createAsyncThunk(
    "conversation/updateConversation",
    async (data: Conversation) => {
        const response: any = await apiUpdateConversation(data)
        return response.data
    }
)


export const conversation = createSlice({
    name: "conversation",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getConversationsList.pending, (state) => {
            state.loadingList = true;
        });
        builder.addCase(getConversationsList.fulfilled, (state, action: PayloadAction<Array<Conversation>>) => {
            state.loadingList = false;
            state.conversations = action.payload;
        });
        builder.addCase(getConversationsList.rejected, (state, action) => {
            state.loadingList = false;
            state.conversations = [];
            state.error = action.error.message;
        });
        builder.addCase(postAddConversation.pending, (state) => {
            state.loadingAction = true;
        });
        builder.addCase(postAddConversation.fulfilled, (state, action: PayloadAction<Conversation>) => {
            state.loadingAction = false;
            state.conversations?.unshift(action.payload);
        });
        builder.addCase(postAddConversation.rejected, (state, action) => {
            state.loadingAction = false;
            state.conversations = [];
            state.error = action.error.message;
        });
        builder.addCase(deleteRemoveConversation.pending, (state) => {
            state.loadingAction = true;
        });
        builder.addCase(deleteRemoveConversation.fulfilled, (state, action: PayloadAction<Conversation>) => {
            state.loadingAction = false;
            state.conversations = state.conversations?.filter((item) => item.id !== action.payload.id);
        });
        builder.addCase(deleteRemoveConversation.rejected, (state, action) => {
            state.loadingAction = false;
            state.conversations = [];
            state.error = action.error.message;
        });
        builder.addCase(putUpdateConversation.pending, (state) => {
            state.loadingActionEdit = true;
        });
        builder.addCase(putUpdateConversation.fulfilled, (state, action: PayloadAction<Conversation>) => {
            state.loadingActionEdit = false;
            state.conversations = state.conversations?.map((item) => item.id === action.payload.id ? action.payload : item);
        });
        builder.addCase(putUpdateConversation.rejected, (state, action) => {
            state.loadingActionEdit = false;
            state.conversations = [];
            state.error = action.error.message;
        });
    },
})

// To able to use reducers we need to export them.

export const conversationsSelector = (state: RootState) => state.conversationsState;
export default conversation.reducer