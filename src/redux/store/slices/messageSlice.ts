import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { apiGetMessageChatsByConversationCode, apiCreateMessageChat, apiCreateMessageChatBot } from '@/services/MessageService'
import { RootState } from "@/redux/store";
import { Message } from "@prisma/client";


export interface messageState {
    loadingMessage: boolean;
    messageChats: Message[] | undefined;
    error: string | undefined;
}

const initialState: messageState = {
    loadingMessage: false,
    messageChats: [],
    error: undefined,
}


export const getMessageChatsListByConversationCode = createAsyncThunk(
    "message/listMessageChats",
    async (data: Message) => {
        const response: any = await apiGetMessageChatsByConversationCode(data)
        return response.data
    }
)

export const postAddMessageChat = createAsyncThunk(
    "message/addMessageChat",
    async (data: Message) => {
        const response: any = await apiCreateMessageChat(data)
        return response.data
    }
)

export const postAddMessageChatBot = createAsyncThunk(
    "message/addMessageChatBot",
    async (data: Message) => {
        const response: any = await apiCreateMessageChatBot(data)
        return response.data

    }
)



export const messageChat = createSlice({
    name: "messageChat",
    initialState,
    reducers: {
        resetLoadingMessage(state) {
            state.loadingMessage = false
        },
        resetError(state) {
            state.error = undefined
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMessageChatsListByConversationCode.pending, (state) => {
            state.loadingMessage = true;
        });
        builder.addCase(getMessageChatsListByConversationCode.fulfilled, (state, action: PayloadAction<Array<Message>>) => {
            state.loadingMessage = false;
            state.messageChats = action.payload;
        });
        builder.addCase(getMessageChatsListByConversationCode.rejected, (state, action) => {
            state.loadingMessage = false;
            state.messageChats = [];
            state.error = action.error.message;
        });
        builder.addCase(postAddMessageChat.pending, (state) => {
            state.loadingMessage = true;
        });
        builder.addCase(postAddMessageChat.fulfilled, (state, action: PayloadAction<Message>) => {
            state.messageChats?.push(action.payload);
        });
        builder.addCase(postAddMessageChat.rejected, (state, action) => {
            state.messageChats = [];
            state.error = action.error.message;
        });
        builder.addCase(postAddMessageChatBot.pending, (state) => {
            state.loadingMessage = true;
        });

        builder.addCase(postAddMessageChatBot.fulfilled, (state, action: PayloadAction<Message>) => {
            state.loadingMessage = false;
            state.messageChats?.push(action.payload);
        });

        builder.addCase(postAddMessageChatBot.rejected, (state, action) => {
            state.loadingMessage = false;
            state.error = action.error.message;
        });


    },
})

// To able to use reducers we need to export them.

export const messageChatsSelector = (state: RootState) => state.messageChatsState;
export const { resetLoadingMessage, resetError } = messageChat.actions
export default messageChat.reducer