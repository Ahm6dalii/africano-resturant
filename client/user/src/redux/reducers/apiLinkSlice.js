import { createSlice } from "@reduxjs/toolkit";

let apiLinkSlice = createSlice({
    name: 'apiLink',
    initialState: {
        link: 'https://e-learning-api-amber.vercel.app'
    },
    reducers: {
    }
})

export let apiLinkReducer = apiLinkSlice.reducer;
