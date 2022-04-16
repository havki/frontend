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
import { useSelector } from "react-redux";

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
  const [expanded, setExpanded] = React.useState(false);
  const [userData, setUserData] = React.useState(null);

  const [changedData, setChangedData] = React.useState({ ...attributes });

  const [text, setText] = React.useState("");

  const user = useSelector((state) => state.auth.user);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `/profiles/${attributes.user.data.id}?populate=*`
      );
      const res = response.data;
      setUserData(res.data);
    };
    fetchData().catch(console.error);
  }, []);

  let button = null;

  if (user && "token" in user) {
    const putData = async () => {
      await axios.put(
        `/recipes/${id}`,
        { data: changedData },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    };
    button = (
      <IconButton aria-label="add to favorites">
        <FavoriteIcon onClick={putData} />
      </IconButton>
    );
  }

  console.log(changedData);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const changeHandler = (e) => {
    setChangedData((changedData) => {
      console.log(e.target.id);
      return {
        [e.target.id]: e.target.innerText,
      };
    });
  };

  if (!userData) {
    return <Loading />;
  }

  return (
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
        title={edit ?  attributes.name : changedData.name}
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
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
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
              innerText={changedData.description}
              id="text"
            >
              {changedData.text}
            </Typography>
          ) : (
            <Typography paragraph>{attributes.text}</Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}

// <TextField
//   sx={{ width: "300px" }}
//   onChange={changeHandler}
//   name="description"
//   label="Название "
//   id="outlined-basic"
//   multiline
//   value={changedData.description}
// />
