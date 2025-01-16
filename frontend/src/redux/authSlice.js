import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handleLogin } from '../services/apiAuth'
import { toast } from 'react-toastify'

const initialState = {
    isAuthenticate: false,
    token: null,
    name: ''
}

export const login = createAsyncThunk("AuthenUser/login", async (payload) => {
    try {
        const res = await handleLogin(payload)
        if (res.err !== 0) {
            toast.error(res.mess)
            return {
                isAuthenticate: false,
                token: null,
                name: ''
            }
        }
        toast.success(res.mess)
        return res
    } catch (error) {
        console.log(error);
        return null
    }
    // let dataAuth ={
    //     name: res.name,
    //     token: res.token,
    // }
})

export const authSlice = createSlice({
    name: 'AuthenUser',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.token = action.payload.token
            state.name = action.payload.name
            state.isAuthenticate = true
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload.token
                state.name = action.payload.name
                state.isAuthenticate = action.payload.isAuthenticate
            })
    }
})

// Action creators are generated for each case reducer function
export const { loginUser } = authSlice.actions

export default authSlice.reducer