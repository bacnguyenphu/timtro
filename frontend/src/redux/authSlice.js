import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handleLogin } from '../services/apiAuth'
import { toast } from 'react-toastify'
import { blobToBase64 } from '../utils/convertBase64'

const initialState = {
    isAuthenticate: false,
    token: null,
    id: '',
    name: '',
    phone: '',
    zalo: '',
    avatar: null,
    role: ''
}


export const login = createAsyncThunk("AuthenUser/login", async (payload) => {
    try {
        const res = await handleLogin(payload)
        if (res.err !== 0) {
            toast.error(res.mess)
            return {
                isAuthenticate: false,
                token: null,
                id: '',
                name: '',
                phone: '',
                zalo: '',
                avatar: null,
                role: ''
            }
        }
        toast.success(res.mess)
        return {
            isAuthenticate: true,
            token: res.token,
            name: res.name,
            avatar: blobToBase64(res.avatar),
            phone: res.phone,
            id: res.id,
            zalo: res.zalo,
            role: res.role,
        }
    } catch (error) {
        console.log(error);
        return null
    }
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
        logout: (state) => {
            state.isAuthenticate = false
            state.token = null
            state.id = ''
            state.name = ''
            state.phone = ''
            state.zalo = ''
            state.avatar = null
            state.role = ''
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticate = action.payload.isAuthenticate
                state.name = action.payload.name
                state.token = action.payload.token
                state.phone = action.payload.phone
                state.id = action.payload.id
                state.zalo = action.payload.zalo
                state.avatar = action.payload.avatar
                state.role = action.payload.role
            })
    }
})

// Action creators are generated for each case reducer function
export const { loginUser, logout } = authSlice.actions

export default authSlice.reducer