import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios.info";

export const fetchLogin = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    
    try {
      const res = await axios.post("/auth/local", user);
      console.log(res.data);
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
    user:{},
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
export const {} = authSlice.actions;


