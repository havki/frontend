import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios.info";

export const profileFetch = createAsyncThunk(
  "recipes/get",
  async(id,{rejectWithValue,}) => {
    try {
      const res = await axios.get(`/profiles/${id}?populate=*`);
      if(!res?.data){
        throw new Error();

      }
      console.log(res.data);
      return res.data;
    }
    catch(error){
      return rejectWithValue(error.res.data)
    }
  }
)


export const recipePut = createAsyncThunk(
  "recipe/put",
  async ({id,data},{ rejectWithValue,getState }) => {
    try {
      let token =  getState().auth.user.token
      await axios.put(`/recipes/${id}`, {data} , {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const recipeDel = createAsyncThunk(
  "recipe/del",
  async (id,{ rejectWithValue,getState }) => {
    console.log(id);
    try {
      let token =  getState().auth.user.token
      await axios.delete(`/recipes/${id}`,  {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    loading: "",
    userData: null,
    deleted: ""
   
  },
  reducers: {
    doSome: (state, action) => {
      
    },
    clearDeleted: (state, action) => {
      state.deleted = ""
    },
  },
  extraReducers: {
    [profileFetch.pending]: (state) => {
      state.loading= "loading"

  },
  [profileFetch.fulfilled]: (state,action) => {
    state.loading= "complete"
    state.userData = action.payload.data
   

  },
  [profileFetch.rejected]: (state) => {
  state.loading= "loading"

  },


  [recipePut.pending]: (state) => {
    state.loading= "loading"

  },
  [recipePut.fulfilled]: (state) => {
  state.loading= "complete"
  

  },
  [recipePut.rejected]: (state) => {
  state.loading= "loading"

  },

  [recipeDel.pending]: (state) => {
    state.deleted= "loading"

  },
  [recipeDel.fulfilled]: (state) => {
  state.deleted= "complete"
  

  },
  [recipeDel.rejected]: (state) => {
  state.deleted= "loading"

  },

},

});

export const {doSome,clearDeleted } = profileSlice.actions