import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getArea } from '../services/apiArea'

const initialState = {
    area:[]
}

export const handleGetArea = createAsyncThunk("Area/getArea", async () => {
    try {
        const res = await getArea()
        if(res.err===0){
            return res.area
        }
    } catch (error) {
        console.log(error);
        return null
    }
})

export const areaSlice = createSlice({
    name: 'Area',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleGetArea.fulfilled, (state, action) => {
                state.area = action.payload    
            })
    }
})

// Action creators are generated for each case reducer function
export default areaSlice.reducer