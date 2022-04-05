import { configureStore } from '@reduxjs/toolkit'
import { recipesSlice,  } from './reducers/recipes.reducer'
import { usersSlice,} from './reducers/users.reducer'

export const store = configureStore({
  reducer: {
    recipes: recipesSlice.reducer,
    users: usersSlice.reducer
  }
})