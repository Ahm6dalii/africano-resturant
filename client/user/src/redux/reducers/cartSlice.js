import { createSlice } from "@reduxjs/toolkit";
const storage=JSON.parse(localStorage.getItem("card"))

const cartSlice = createSlice({
  name: "cart",
  initialState: {num:storage?storage:0},
  reducers: {
    addToCart: (state, action) => {
      
      state.num=action.payload
      localStorage.setItem("card",JSON.stringify(state.num))
    },
    clearCart: (state) => {
      localStorage.removeItem("card")
      state.num=0
    },
  },
});

export const { addToCart,clearCart } = cartSlice.actions;
export let cartReducer = cartSlice.reducer;
