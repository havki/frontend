import { configureStore } from '@reduxjs/toolkit'
import { recipesSlice } from './reducers/recipes.reducer'

export const store = configureStore({
  reducer: {
    recipes: recipesSlice.reducer
  }
})