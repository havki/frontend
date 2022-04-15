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
  Link,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recipesFetch } from "../../store/reducers/recipes.reducer";
import MediaCard from "../RecipeCard/RecipeCard";
import Loading from "../UI/Loading";

function Recipes() {
  const dispatch = useDispatch();
  const { loading, recipes, category } = useSelector((state) => state.recipes);

  const filter = async (id) => {
    dispatch(recipesFetch(id));
  };

  return (
    <>
      {loading === "loading" ? (
        <Loading />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar
            component="nav"
            variant="dense"
            sx={{ justifyContent: "space-between", overflowX: "auto" }}
          >
            {category.map((category) => (
              <Link
                color="inherit"
                noWrap
                key={category.id}
                variant="body2"
                // href={category.url}
                sx={{ p: 1, flexShrink: 0 }}
                onClick={() => filter(category.id)}
              >
                {category.attributes.title}
              </Link>
            ))}
          </Toolbar>
          <Grid container spacing={2}>
            {recipes.map((recipe, index) => {
              return (
                <Grid item key={index} xs={12} sm={6} md={3} lg={2}>
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
