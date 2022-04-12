import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios.info";
import cookie from "cookie";


export const fetchLogin = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    
    try {
      const res = await axios.post("/auth/local", user);
      
      if (!res.data) {
        throw new Error()
      }
      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

export  const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:null,
  },
  reducers: {
    addCookie: (state,action)=>{
      
      let data = cookie.parse(document.cookie);

      if (Object.keys(data).length !== 0 && "user" in data) {
        data = JSON.parse(data?.user);// if data{user}
      }
      else{
        data = null
      }
      state.user = data
    },
    out: (state,action) => {
      state.user= action.payload
    }
  },
  extraReducers: {
    [fetchLogin.pending] : (state) => {
      state.loading = 'loading';
    },
    [fetchLogin.fulfilled] : (state,action) =>{

      state.loading = 'complete';
      
      state.user = {
       
        token: action.payload.jwt,
        ...action.payload.user
      }
    },
    [fetchLogin.rejected] : (state) => {
      state.login = 'loading'
    }
  },
});
export const {addCookie,out} = authSlice.actions;


