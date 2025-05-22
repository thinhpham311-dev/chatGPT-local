import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'layout',
    initialState: {
        isShow: false,
        isShowInput: false,
        inputSend: "",
        id: NaN
    },
    reducers: {
        toggleLayout: (state) => {
            state.isShow = !state.isShow
        },
        openInput: (state) => {
            state.isShowInput = true
        },
        closeInput: (state) => {
            state.isShowInput = false
        },
        handleEnterSend: (state, action) => {
            state.inputSend = action.payload
        },

    },
})

export const {
    toggleLayout,
    openInput,
    closeInput,
    handleEnterSend,
} = stateSlice.actions

export default stateSlice.reducer