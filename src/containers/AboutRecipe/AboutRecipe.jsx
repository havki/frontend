import { Box } from "@mui/material";
import axios from "../../api/axios.info";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import RecipeReviewCard from "../FoodCard/FoodCard";
import Loading from "../UI/Loading";

function AboutRecipe() {
  // const [id, setId] = useState()
  const [dish, setDish] = useState(null);
  const { recipes } = useSelector((state) => state.recipes);
  
  const {id} = useParams();

  useEffect(() => {
    // let info = 0;
    // for (let entry of query.entries()) {
    //   console.log(entry[0]);
    //   info = parseInt(entry[0]);
    // }
    console.log(id);
   const fetchData = async () => {
      const response = await axios.get(`/recipes/${id}?populate=image`)
      const res = response.data
      setDish(res.data)
    }
    fetchData().catch(console.error);;
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
        <RecipeReviewCard {...dish}/>
      </Box>
    </div>

      :
      <Loading/>
    }
    </>
  );
}

export default AboutRecipe;
