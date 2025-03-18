import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    phone: '',
    name: '',
    zalo: '',
    avatar: null,
}

export const posterSlice = createSlice({
    name: 'poster',
    initialState,
    reducers: {
        poster:(state,action)=>{
            state.phone = action.payload.phone
            state.name = action.payload.name
            state.avatar = action.payload.avatar
            state.zalo = action.payload.zalo
        }
    },
})

// Action creators are generated for each case reducer function
export const { poster } = posterSlice.actions

export default posterSlice.reducer