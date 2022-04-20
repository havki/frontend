import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "../../api/axios.info";
import Loading from "../UI/Loading";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from '@mui/icons-material/Delete';
import { profileFetch, recipeDel, recipePut } from "../../store/reducers/profile.reducer";
import BasicModal from "../UI/ModalWindow/ModalWindow";
import Recipes from "../Recipes/Recipes";
import { Navigate, useNavigate } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ id, attributes, edit }) {
  const [expanded, setExpanded] = React.useState(true);
  // const [userData, setUserData] = React.useState(null);
  
 
  const [changedData, setChangedData] = React.useState({});
  const [updateData, setUpdateData] = React.useState({});
  const [confirm ,setConfirm ] = React.useState(false);


  const dispatch = useDispatch()

  const navigate = useNavigate()


  const user = useSelector((state) => state.auth.user);
  const {deleted,loading,userData} = useSelector((state) => state.profile);
  

  React.useEffect(() =>{ 
  console.log(attributes);
    dispatch(profileFetch(attributes.user.data?.id))
  },[]);
  React.useEffect(() =>{ 
    setChangedData(attributes)
  },[attributes]);
  
  console.log(updateData);

  let button = null;
  let delButton = null;

  if (user && "token" in user) {
    
    const putData = async () => {
      dispatch(recipePut({ id,data: updateData}))
      
    };
   
    const delData = async () => {
      setConfirm(true)
     
     
      
    };
    button = (
      <IconButton aria-label="add to favorites" onClick={putData}>
        <SendIcon />
      </IconButton>
    );

    delButton = (
      <IconButton aria-label="share" onClick={delData}>
        <DeleteIcon/>
      </IconButton>
    );
  }

  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const changeHandler = (e) => {
    setChangedData((changedData) => {
      return {
        ...changedData,
        [e.target.id]: e.target.innerText,
      };
    });
    setUpdateData((update) => {
      return {
        ...update,
        [e.target.id]: e.target.innerText,
      };
    })
  };

  if (!userData) {
    return <Loading />;
  }

  

 if (deleted === 'complete') {
  navigate("/mypage")
 }

 
 

  return (
    <>
   {
     confirm && <BasicModal closed={setConfirm} id={id}/>
   }
    <Card sx={{ maxWidth: 800 }}>
      <CardHeader
        avatar={
          userData.attributes.avatar.data ? (
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={userData.attributes.avatar.data.attributes.url}
            ></Avatar>
          ) : (
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {attributes.user.data.attributes.email[0].toUpperCase()}
            </Avatar>
          )
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={edit ? attributes.name : changedData.name}
        subheader={`Дата публикации: ${attributes.publishedAt.substr(0, 10)}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={
          attributes.image.data
            ? `${attributes.image.data.attributes.url}`
            : "https://xn--90aha1bhcc.xn--p1ai/img/placeholder.png"
        }
        alt="Paella dish"
      />
      <CardContent>
        {edit ? (
          <Typography
            variant="body2"
            suppressContentEditableWarning
            contentEditable
            onInput={changeHandler}
            color="text.secondary"
            innerText={changedData.description}
            id="description"
          >
            {attributes.description}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {attributes.description}
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        {edit && Object.keys(changedData).length && button}
        {edit && delButton}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          {edit ? (
            
            <Typography
              paragraph
              suppressContentEditableWarning
              contentEditable
              onInput={changeHandler}
              innerText={changedData.fulldescription}
              id="fulldescription"
            >
              {changedData.fulldescription}
            </Typography>
          ) : (
            <Typography paragraph>{attributes.fulldescription}</Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
    </>
  );
}

 // await axios.put(
    //   `/recipes/${id}`,
    //   { data: changedData },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${user.token}`,
    //     },
    //   }
    // );

     //   const fetchData = async () => {
  //     const response = await axios.get(
  //       `/profiles/${attributes.user.data.id}?populate=*`
  //     );
  //     const res = response.data;
  //     setUserData(res.data);
  //   };
  //   fetchData().catch(console.error);
  // }, []);

   // await axios.delete(`/recipes/${id}`,{
      //   headers: {
      //     Authorization: `Bearer ${user.token}`,
      //   },
      // });