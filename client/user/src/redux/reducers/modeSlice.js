import { createSlice } from "@reduxjs/toolkit";

const initialState={
    mode:localStorage.getItem('mode')?localStorage.getItem('mode'):'light'
  }
  const modeSlice=createSlice({
    name:'mode',
    initialState,
    reducers:{
      changeMode:(state,action)=>{
        localStorage.setItem("mode",action.payload)
        state.mode= action.payload        
      },
    }
  })
  
  export const {changeMode}=modeSlice.actions;
  export let modeReducer= modeSlice.reducer