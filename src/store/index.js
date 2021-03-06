import { configureStore } from "@reduxjs/toolkit";
import { recipesSlice } from "./reducers/recipes.reducer";
import { authSlice } from "./reducers/auth.reducer";
import { profileSlice } from "./reducers/profile.reducer";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    recipes: recipesSlice.reducer,
    profile: profileSlice.reducer,
  },
});
