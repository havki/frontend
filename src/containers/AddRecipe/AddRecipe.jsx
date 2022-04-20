import {
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, {  useState } from "react";
import axios from "../../api/axios.info";

import { useDispatch, useSelector } from "react-redux";
import {
  addRecipe,
  recipesPost,
  
} from "../../store/reducers/recipes.reducer";
import Loading from "../UI/Loading";

function AddRecipe() {
  const [recipe, setRecipe] = useState({});

  const [file, setFile] = useState(null);
  const [currency, setCurrency] = React.useState("");
  const dispatch = useDispatch();
  const { loading, category ,recipeSended} = useSelector((state) => state.recipes);
  const token = useSelector((state) => state.auth.user.token);
  const {id} = useSelector((state) => state.auth.user);
  const [uploading, setUploading] = useState(false) 

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

    setUploading(true)
    

    const formData = new FormData();
    formData.append("files", file);

    axios
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", //&&&&&&&&&&&&????????????????
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const obj = {
          data: {
            ...recipe,
            image: res.data,
            user: { id: id }
          },
        };
        dispatch(recipesPost(obj));
      }).finally(() => {
        setUploading(false)
      })

    dispatch(addRecipe(recipe));
  };

  const fileHandler = (e) => {
    setFile(e.target.files[0]);
  };
  console.log(id);
  return (
    <>
      <Typography variant="h6" noWrap component="div">
        Добавить рецепт
      </Typography>
      {loading === "loading" || uploading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            component: "form",
            display: "flex",
          }}
        >
          <Grid container spacing={2}>
          <Grid item  xs={12} sm={6}>
            <Stack direction="column" mt={2} spacing={2} sx={{ width: "100%" }}>
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
            </Grid>
            <Grid item  xs={12} sm={6}>

            
            <Stack direction="column" mt={2} spacing={2} sx={{ width: "100%" }}>
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
                name="fulldescription"
                minRows={2}
                id="outlined-textarea"
                label="Подробное описание"
                multiline
              />

              <Button
              disabled= {loading === 'loading'}
                onClick={submitHandler}
                variant="contained"
                color="success"
              >
                Отправить
              </Button>
            </Stack>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}

export default AddRecipe;
