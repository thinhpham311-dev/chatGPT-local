import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { apiPostCheckUser } from '@/services/UserService'
import { RootState } from "@/redux/store";

export interface userState {
    loadingAction: boolean;
    user: Object | null;
    error: string | undefined;
}

const initialState: userState = {
    loadingAction: false,
    user: null,
    error: undefined,
}

export const postCheckUser = createAsyncThunk(
    "user/checkUser",
    async (data: Object) => {
        const response: any = await apiPostCheckUser(data)
        return response.data
    }
)



export const user = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postCheckUser.pending, (state) => {
            state.loadingAction = true;
        });
        builder.addCase(postCheckUser.fulfilled, (state, action: PayloadAction<Object>) => {
            state.loadingAction = false;
            state.user = action.payload;
        });
        builder.addCase(postCheckUser.rejected, (state, action) => {
            state.loadingAction = false;
            state.user = null;
            state.error = action.error.message;
        });

    },
})

// To able to use reducers we need to export them.

export const userSelector = (state: RootState) => state.userState;
export default user.reducer