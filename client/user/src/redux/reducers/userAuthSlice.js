import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import socket from './../../socket.io/socket';

// Async thunk to handle decoding JWT and setting user info
export const setUserAsync = createAsyncThunk(
  'userAuth/setUserAsync',
  async (user, { rejectWithValue }) => {
    try {
      const decoded = await jwtDecode(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userInfo', JSON.stringify(decoded));
      socket.emit('register', decoded?.userId)
      return { user, decoded };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

let userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    isLogin:!!JSON.parse(localStorage.getItem('user')) || null
  },
  reducers: {
    logOutUser: (state) => {

      localStorage.removeItem('user');
      localStorage.removeItem('userInfo');
      state.user = null;
      state.userInfo = null;
    },
    changeProfileImg: (state, action) => {
      console.log(state.userInfo)
      state.userInfo.image = action.payload
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },
    changeProfileInfo: (state, action) => {
      console.log({ ...state.userInfo, ...action.payload })
      state.userInfo = { ...state.userInfo, ...action.payload }
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },
    setLogin: (state,action) => {
      state.isLogin = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUserAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userInfo = action.payload.decoded;
      })
      .addCase(setUserAsync.rejected, (state, action) => {
      });
  },
});

export const userAuthReducer = userAuthSlice.reducer;

export const { logOutUser ,changeProfileImg,changeProfileInfo,setLogin} = userAuthSlice.actions;
export const setUser = setUserAsync;
