import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Stack,
  ListItemText,
  Toolbar,
  Divider,
  Typography,
  Grid,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recipesFetch } from "../../store/reducers/recipes.reducer";
import MediaCard from "../RecipeCard/RecipeCard";
import Loading from "../UI/Loading";

function Recipes() {
  const dispatch = useDispatch();
  const { loading, recipes,  } = useSelector(
    (state) => state.recipes
  );

  

  return (
    <>
      {loading === "loading" ? (
        <Loading />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {recipes.map((recipe, index) => {
              return (
                <Grid item key={index} xs={4} md={3} lg={2}>
                  <MediaCard {...recipe} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}
    </>
  );
}

export default Recipes;
