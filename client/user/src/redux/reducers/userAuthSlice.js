import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

// Async thunk to handle decoding JWT and setting user info
export const setUserAsync = createAsyncThunk(
  'userAuth/setUserAsync',
  async (user, { rejectWithValue }) => {
    try {
      const decoded = await jwtDecode(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userInfo', JSON.stringify(decoded));
      return { user, decoded };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

let userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
  },
  reducers: {
    logOutUser: (state) => {
        
      localStorage.removeItem('user');
      localStorage.removeItem('userInfo');
      state.user = null;
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUserAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userInfo = action.payload.decoded;
      })
      .addCase(setUserAsync.rejected, (state, action) => {
        console.log("Error decoding token:", action.payload);
      });
  },
});

export const userAuthReducer = userAuthSlice.reducer;
export const { logOutUser } = userAuthSlice.actions;
export const setUser = setUserAsync;
