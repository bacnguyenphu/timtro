import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handleLogin } from '../services/apiAuth'
import { toast } from 'react-toastify'

const initialState = {
    isAuthenticate: false,
    token: null,
    name: '',
    phone:'',
    avatar: null
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
        return {
            isAuthenticate: true,
            token: res.token,
            name: res.name,
            avatar: res.avatar,
            phone: res.phone,
        }
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
                console.log('check ection>>>', action.payload);
                state.isAuthenticate = action.payload.isAuthenticate
                state.name = action.payload.name
                state.token = action.payload.token
                state.phone = action.payload.phone
            })
    }
})

// Action creators are generated for each case reducer function
export const { loginUser } = authSlice.actions

export default authSlice.reducer