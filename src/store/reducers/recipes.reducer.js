import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios.info";

export const recipesPost = createAsyncThunk(
  "recipes/post",
  async (order, { rejectWithValue }) => {
    try {
      await axios.post("/recipes", order);
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
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get(`/recipes?populate=image`);
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
    category: [
      
    ],
    recipe: {
      kategorii: "",
      name: "Cyn",
      author: "Гордон Рамзи",
      alias: "sup",
      description: "Lorem ipsum dolor sit amet.",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos libero neque, iure adipisci nobis soluta quisquam nihil, similique corrupti nemo ab impedit minima nostrum, aut et reprehenderit incidunt maiores? Dolores?",
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
    filterCat: (state, action) => {
      state.currentCat = action.payload;
    },
  },
  extraReducers: {
    [recipesFetch.pending]: (state) => {
      state.loading = "loading";
      state.error = null;
    },
    [recipesFetch.fulfilled]: (state, action) => {
      
      state.loading = "complete";
      state.recipes = action.payload.data.map((recipe) => {
        let resp = recipe.attributes;
        return resp;
      });
    },
    [recipesFetch.rejected]: (state, action) => {
      state.loading = "error";
      state.error = action.error;
    },

    [recipesPost.pending]: (state) => {
      state.loading = "loading";
    },
    [recipesPost.fulfilled]: (state) => {
      state.loading = "complete";
    },
    [recipesPost.rejected]: (state) => {
      state.loading = "loading";
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
