import { createSlice } from "@reduxjs/toolkit";
import { Ar } from "../../language/Arabic";
import { En } from "../../language/English";


const storageLang =JSON.parse(localStorage.getItem("lang"))
const storageTrans =JSON.parse(localStorage.getItem("trans"))
const translation={
    ar:Ar,
    en:En
    
}
const  initialState={
    language:storageLang?storageLang:'en',
    translation:storageTrans?storageTrans:translation[storageLang?storageLang:'en']
} 
const languageSlice=createSlice({
    name:"language",
    initialState,
    reducers:{
        changeLang:(state,action)=>{
            localStorage.setItem('lang', JSON.stringify(action.payload))
            localStorage.setItem('trans', JSON.stringify(translation[action.payload]))
            state.language=action.payload
            state.translation=translation[action.payload]
        }
    }
})

export let languageReducer= languageSlice.reducer;
export const {changeLang}=languageSlice.actions;