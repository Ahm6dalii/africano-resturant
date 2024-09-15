import { createSlice } from "@reduxjs/toolkit";

let apiLinkSlice = createSlice({
    name: 'apiLink',
    initialState: {
        link: 'http://localhost:3000'
    },
    reducers: {
    }
})

export let apiLinkReducer = apiLinkSlice.reducer;
