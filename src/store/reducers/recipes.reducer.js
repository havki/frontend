import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios.info";

export const recipesPost = createAsyncThunk(
  "recipes/post",
  async (order, { rejectWithValue,getState }) => {
    try {
      let token =  getState().auth.user.token
      console.log(order);
      await axios.post("/recipes", order, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const categoriesFetch = createAsyncThunk(
  "categories/fetch",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get(`/categories?fields=title`);
      if (!res?.data) {
        throw new Error();
      }

      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

export const recipesFetch = createAsyncThunk(
  "recipes/fetch",
  async (id, { rejectWithValue,}) => {
   
    try {
      
      const res = await axios.get(`/categories/${id}?populate[reczepties][populate]=image`);
      if (!res?.data) {
        throw new Error();
      }

      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

export const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    loading: "",
    recipeSended: "",
    category: [
      
    ],
    recipe: {
      kategorii: "",
      name: "Cyn",
      author: "Гордон Рамзи",
      alias: "sup",
      description: "Lorem ipsum dolor sit amet.",
      fulldescription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos libero neque, iure adipisci nobis soluta quisquam nihil, similique corrupti nemo ab impedit minima nostrum, aut et reprehenderit incidunt maiores? Dolores?",
    },
    // currentCat: '',
  },
  reducers: {
    doSome: (state, action) => {
      state.task += action.payload;
    },
    addRecipe: (state, action) => {
      state.recipe = action.payload;
    },
    
  },
  extraReducers: {
    [recipesFetch.pending]: (state) => {
      state.loading = "loading";
      state.error = null;
    },
    [recipesFetch.fulfilled]: (state, action) => {
      
      state.loading = "complete";
      // console.log(action.payload.data);
      if (Array.isArray(action.payload.data)){
        
        
        let flatter = action.payload.data.map((pack)=>{
        return pack.attributes.reczepties.data
      });
      state.recipes = flatter.flat()
        // console.log(prepared);
      }
      else{

        state.recipes = action.payload.data.attributes.reczepties.data
      }
    },
    [recipesFetch.rejected]: (state, action) => {
      state.loading = "error";
      state.error = action.error;
    },

    [recipesPost.pending]: (state) => {
      state.loading = "loading";
      state.recipeSended = "loading";
    },
    [recipesPost.fulfilled]: (state) => {
      state.loading = "complete";
      state.recipeSended  =  "complete"
    },
    [recipesPost.rejected]: (state) => {
      state.loading = "loading";
      state.recipeSended  =  "error"
    },

    [categoriesFetch.pending]: (state) => {
      state.loading = "loading";
    },
    [categoriesFetch.fulfilled]: (state,action) => {
      state.category = action.payload.data
      state.loading = "complete";
    },
    [categoriesFetch.rejected]: (state) => {
      state.loading = "loading";
    },
  },
});

export const { doSome, addRecipe, filterCat } = recipesSlice.actions;

// state.recipes = Object.keys(action.payload).map((key) => { //???????????????????????????
//   return {
//     ...action.payload[key], //?????????????????????
//     id: key,
//   };
// });
