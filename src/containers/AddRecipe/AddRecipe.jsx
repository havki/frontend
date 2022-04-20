import {
  Box,
  Button,

  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../api/axios.info";

import { useDispatch, useSelector } from "react-redux";
import {
  addRecipe,
  recipesPost,
  categoriesFetch,
} from "../../store/reducers/recipes.reducer";
import Loading from "../UI/Loading";




function AddRecipe() {
  const [recipe, setRecipe] = useState({});

  const [file, setFile] = useState(null);
  const [currency, setCurrency] = React.useState("");
  const dispatch = useDispatch();
  const { loading, category } = useSelector((state) => state.recipes);
  const token = useSelector((state) => state.auth.user.token )

  const changeHandler = (e) => {
    setRecipe((recipe) => {
      return {
        ...recipe,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("files", file);

    axios.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data", //&&&&&&&&&&&&????????????????
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      const obj = {
        data: {
          ...recipe,
          image: res.data,
        },
      };
      dispatch(recipesPost(obj));
    });

   
    dispatch(addRecipe(recipe));
  };

  const fileHandler = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <Typography variant="h6" noWrap component="div">
        Добавить рецепт
      </Typography>
      {loading === "loading" ? (
        <Loading />
      ) : (
        <Box
          
          sx={{
            mt: 5,
            component: "form",
            display: "flex",
            
            alignItems: "center",
            justifyContent: "space-around",
            xs: { flexDirection: "column" },
          }}
        >
          <Stack direction="column" mt={3} spacing={2} sx={{ width: "100%" }}>
            <TextField
              id="outlined-select-currency"
              select
              label="Категория"
              name="kategorii"
              onChange={changeHandler}
              value={currency}
            >
              {category.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.attributes.title}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              onChange={changeHandler}
              name="name"
              label="Название "
              id="outlined-basic"
            />
            <TextField
              onChange={changeHandler}
              name="author"
              label="Автор "
              id="outlined-basic"
            />
            <TextField
              onChange={changeHandler}
              name="description"
              id="outlined-textarea"
              label="Краткое описание"
              multiline
            />
          </Stack>

          <Stack   direction="column" mt = {2} spacing={2} sx={{ width: "100%" }} >
            <TextField
              onChange={changeHandler}
              name="alias"
              label="alias "
              id="outlined-basic"
            />
            <TextField
              onChange={fileHandler}
              name="file"
              type="file"
              id="outlined-basic"
            />
            <TextField
              onChange={changeHandler}
              name="text"
              minRows={2}
              id="outlined-textarea"
              label="Подробное описание"
              multiline
            />

            <Button onClick={submitHandler} variant="contained" color="success">
              Отправить
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
}

export default AddRecipe;
