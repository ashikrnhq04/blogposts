import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LinearProgress from "@mui/material/LinearProgress";
import Post from "./Post";
import { useUserAuth } from "../context/UserAuthContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "left",
  color: theme.palette.text.secondary,
  boxShadow: "none",
  border: "1px solid #e0e0e0",
  "&:hover": {
    boxShadow: "0px 0px 10px #e0e0e0",
  },
}));

const Posts = ({ postdata, deletepost, loading }) => {
  const { user, setUser } = useUserAuth();
  return (
    <Box theme>
      {loading && <LinearProgress color='inherit' />}
      {postdata.length > 0 && (
        <Masonry columns={{ xs: 1, md: 3 }} spacing={3}>
          {postdata.map((post) => (
            <Item key={post.id}>
              <Post
                limit={10}
                post={post}
                link={`/blog/${post.title.split(" ").join("-")}`}
              />
              {user && (
                <Button
                  onClick={() => deletepost(post.id)}
                  variant='contained'
                  color='primary'
                  startIcon={<DeleteOutlineIcon />}>
                  Delete
                </Button>
              )}
            </Item>
          ))}
        </Masonry>
      )}
    </Box>
  );
};
export default Posts;
