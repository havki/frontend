
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddRecipe from "./containers/AddRecipe/AddRecipe";
import Layout from "./containers/Layout/Layout";
import ProtectedRoute from "./containers/ProtectedRoute/ProtectedRoute";
import Recipes from "./containers/Recipes/Recipes";
import { categoriesFetch } from "./store/reducers/recipes.reducer";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(categoriesFetch());
  }, [dispatch]);
  
  const{user}=useSelector((state)=> state.users )

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="recipes" element={<Recipes />}/>
          <Route path="addrecipe" element={
            <ProtectedRoute user={user}>
              <AddRecipe/>
            </ProtectedRoute>
          }/>
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
