import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddRecipe from "./containers/AddRecipe/AddRecipe";
import Layout from "./containers/Layout/Layout";
import Login from "./containers/Login/Login";
import ProtectedRoute from "./containers/ProtectedRoute/ProtectedRoute";
import Recipes from "./containers/Recipes/Recipes";
import { categoriesFetch } from "./store/reducers/recipes.reducer";
import cookie from "cookie";
import { addCookie } from "./store/reducers/auth.reducer";
import RecipeReviewCard from "./containers/FoodCard/FoodCard";
import AboutRecipe from "./containers/AboutRecipe/AboutRecipe";
import MyPage from "./containers/MyPage/MyPage";
import WovenImageList from "./containers/Gallery/Gallery";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(categoriesFetch());
    dispatch(addCookie());
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/" element={<WovenImageList/>} />
          <Route path="recipes" element={<Recipes />} />

          <Route path="recipe/:id" element={<AboutRecipe />} />

          <Route
            path="recipe/edit/:id"
            element={
              <ProtectedRoute user={user}>
                <AboutRecipe edit/>
              </ProtectedRoute>
            }
          />

              
           

          <Route path="mypage" element={
            <ProtectedRoute user={user}>
            <MyPage /> 
          </ProtectedRoute>
          } />
          <Route path="login" element={<Login />} />

          <Route
            path="addrecipe"
            element={
              <ProtectedRoute user={user}>
                <AddRecipe />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
