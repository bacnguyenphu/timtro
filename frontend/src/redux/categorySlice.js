import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllCategories } from '../services/apiCategory';

const initialState = {
    categories:[]
}

export const handleGetCategory = createAsyncThunk("Category/getCategory", async () => {
    try {
        const res = await getAllCategories()
        if(res.err===0){
            return res.categories
        }
    } catch (error) {
        console.log(error);
        return null
    }
})

export const categorySlice = createSlice({
    name: 'Category',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleGetCategory.fulfilled, (state, action) => {
                state.categories = action.payload    
            
            })
    }
})

// Action creators are generated for each case reducer function
export default categorySlice.reducer