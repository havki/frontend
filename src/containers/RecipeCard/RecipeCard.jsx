import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { recipeDel } from "../../store/reducers/profile.reducer";


export default function MediaCard({
  id,
  attributes,
  edit = false
  // category,
  // name,
  // author,
  // alias,
  // description,
  // text,
  // image

}) {
  const navigate =useNavigate()
  const user = useSelector((state)=> state.auth.user)
  const dispatch = useDispatch()
  const LearnMore = () => {
    const queryParams = id
    navigate ({
      pathname: '/recipe',
      search: "?" + queryParams,
      
    })
  }

  
 
  return (
    <Card sx={{ maxWidth: 345, m:'0 auto' }} >
       {
          !edit &&
          <CardMedia
        component="img"
        height="140"
        image={attributes.image.data ? (`${ attributes.image.data.attributes.url}`) : ("https://xn--90aha1bhcc.xn--p1ai/img/placeholder.png")}
        alt="green iguana"
      />
          
        }
     
      <CardContent>
        <Typography gutterBottom variant="h8" component="div">
          {attributes.name}
        </Typography>
        {!edit && <Typography variant="body2" color="text.secondary">
          {attributes.description}
        </Typography>}
      </CardContent>

      <CardActions sx={{display:"flex",justifyContent: 'center'}}>
        
       

        
        {
          user && edit ?
          <Button  onClick = {LearnMore} component={Link}  to={`/recipe/edit/${id}`} size="small">Edit</Button>
          :

        <Button onClick = {LearnMore} component={Link} to={`/recipe/${id}`} size="small">Learn More</Button>
        }
      </CardActions>
    </Card>
  );
}
