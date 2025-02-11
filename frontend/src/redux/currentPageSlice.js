import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentPage: 1,
}

export const currentPageSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        onChangCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { onChangCurrentPage } = currentPageSlice.actions

export default currentPageSlice.reducer