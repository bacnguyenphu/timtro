import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPrice } from '../services/apiPrice'

const initialState = {
    price:[]
}

export const handleGetPrice = createAsyncThunk("Price/getPrice", async () => {
    try {
        const res = await getPrice()
        if(res.err===0){
            return res.price
        }
    } catch (error) {
        console.log(error);
        return null
    }
})

export const priceSlice = createSlice({
    name: 'Price',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleGetPrice.fulfilled, (state, action) => {
                state.price = action.payload    
            
            })
    }
})

// Action creators are generated for each case reducer function
export default priceSlice.reducer