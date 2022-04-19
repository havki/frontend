import { Box } from "@mui/material";
import axios from "../../api/axios.info";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import RecipeReviewCard from "../FoodCard/FoodCard";
import Loading from "../UI/Loading";
import { profileFetch } from "../../store/reducers/profile.reducer";

function AboutRecipe({edit = false}) {
  // const [id, setId] = useState()
  const [dish, setDish] = useState(null);
  const { recipes } = useSelector((state) => state.recipes);
  const { userData } = useSelector((state) => state.profile);
  
  const {id} = useParams();

  const dispatch = useDispatch();

  useEffect(() => {

    
    // let info = 0;
    // for (let entry of query.entries()) {
    //   console.log(entry[0]);
    //   info = parseInt(entry[0]);
    // }
    
   const fetchData = async () => {
      const response = await axios.get(`/recipes/${id}?populate=*`)
      const res = response.data
      setDish(res.data)
    }
    fetchData().catch(console.error);

    
  },[]);
 
  

  //   useEffect(()=>{

  //   let info = 0
  //   for (let entry of query.entries()) {
  //    console.log(entry[0]);
  //     info = parseInt(entry[0])
  //   }

  //  let recipe = recipes.filter(item => {
  //    return item.id === info
  //   })
  //   setDish(recipe[0])
  // },[])

  // console.log(dish);

  return (
    <>{dish ?
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <RecipeReviewCard {...dish} edit={edit}/>
      </Box>
    </div>

      :
      <Loading/>
    }
    </>
  );
}

export default AboutRecipe;
