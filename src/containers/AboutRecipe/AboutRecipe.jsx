import { Box } from '@mui/material'
import React from 'react'
import RecipeReviewCard from '../FoodCard/FoodCard'

function AboutRecipe() {
  return (
    <>
    <Box sx={{display:'flex', justifyContent: 'space-around' }}>

    {/* <RecipeReviewCard/> */}
    <RecipeReviewCard/>
    </Box>
    </>
  )
}

export default AboutRecipe