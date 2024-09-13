import { createSlice } from "@reduxjs/toolkit";

let userAuthSlice=createSlice({
    name:'userAuth',
    initialState:{
        user:JSON.parse(localStorage.getItem('user'))||null
    },
    reducers:{
        setUser:(state,action)=>{
            localStorage.setItem('user',JSON.stringify(action.payload))
           state.user=action.payload
        },
        logOutUser:(state,action)=>{
            localStorage.removeItem('user')
            
           state.user=null
        },
      
    }
})

export let userAuthReducer=userAuthSlice.reducer;
export let {setUser,logOutUser}=userAuthSlice.actions;