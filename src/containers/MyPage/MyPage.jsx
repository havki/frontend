import { Grid, Link, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { isFulfilled } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../api/axios.info";
import { clearDeleted } from "../../store/reducers/profile.reducer";
import MediaCard from "../RecipeCard/RecipeCard";
import Loading from "../UI/Loading";

function MyPage() {
  const [userData, setUserData] = useState(null);
 

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearDeleted())
    const fetchData = async () => {
      const response = await axios.get(`/profiles/${user.id}?populate=*`);
      const res = response.data;
      setUserData(res.data);

   
    };
    fetchData().catch(console.error);

  }, []);
  console.log(userData);

  if (!userData){
    return <Loading/>
  }

  return  (
    <>
     <Typography variant="h4" gutterBottom coomponent = "div">
            Мой профиль
        </Typography>
      <Typography variant="h6" color="text.secondary">
          Город: {userData.attributes.country}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Юзернейм: {user.username}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Дата регистрации: {userData.attributes.publishedAt.substr(0, 10)}
        </Typography>
      <Box sx={{ flexGrow: 1 }}>
       
        <Typography variant="h5" gutterBottom coomponent = "div">
            Добавленные {userData.attributes.reczepties.data.length}
        </Typography>
       
        <Grid container spacing={2}>
          
          {userData.attributes.reczepties.data.map((recipe, index) => {
            return (
              <Grid item key={recipe.id} xs={12} sm={6} md={3} lg={2}>
                <MediaCard {...recipe} edit />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    )
  </>
  )
}

export default MyPage;



// {/* <Toolbar
// component="nav"
// variant="dense"
// sx={{ justifyContent: "space-between", overflowX: "auto" }}
// >
// {["3","2","1"].map((category) => (
//   <Link
//     color="inherit"
//     noWrap
//     key={category.id}
//     variant="body2"
//     // href={category.url}
//     sx={{ p: 1, flexShrink: 0 }}
//     // onClick={() => filter(category.id)}
//   >
//     {/* {category.attributes.title} */}
// //   </Link>
// // ))}
// // </Toolbar> */}