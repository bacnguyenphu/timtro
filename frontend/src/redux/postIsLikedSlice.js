import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPostLikeOfUser } from '../services/apiPost'

const initialState = {
    postIsLiked:[]
}


export const handleGetPostLikeOfUser = createAsyncThunk("PostIsLiked/getPostIsLiked", async (idUser) => {
    try {
        const res = await getPostLikeOfUser(idUser)
        if(res.err===0){
            return res.data
        }
    } catch (error) {
        console.log(error);
        return null
    }
})

export const postIsLikedSlice = createSlice({
    name: 'PostIsLiked',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleGetPostLikeOfUser.fulfilled, (state, action) => {
                state.postIsLiked = action.payload    
            })
    }
})

// Action creators are generated for each case reducer function
export default postIsLikedSlice.reducer