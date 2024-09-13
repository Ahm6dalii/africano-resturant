import { createSlice } from "@reduxjs/toolkit";
const storage=JSON.parse(localStorage.getItem("card"))

const cartSlice = createSlice({
  name: "cart",
  initialState: storage?storage:[],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("card",JSON.stringify(state))
    },
    removeFromCart: (state, action) => {
    let flited=state.filter((course) => course.id !== action.payload.id)
             localStorage.setItem("card",JSON.stringify(flited))
      return flited;

    },
    clearCart: () => {
      localStorage.removeItem("card")
      return [];
    },
  },
});

export const { addToCart, removeFromCart,clearCart } = cartSlice.actions;
export let cartReducer = cartSlice.reducer;
