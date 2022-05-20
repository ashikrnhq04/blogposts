import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LinearProgress from "@mui/material/LinearProgress";

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
  return (
    <Box theme>
      {loading ? (
        <LinearProgress color='inherit' />
      ) : postdata.length > 0 ? (
        <Masonry columns={{ xs: 1, md: 3 }} spacing={3}>
          {postdata.map((post) => (
            <Item key={post.id}>
              <Typography
                variant='h2'
                fontSize={26}
                fontWeight={700}
                gutterBottom
                color={"common.black"}>
                {post.title[0].toUpperCase() + post.title.slice(1)}
              </Typography>
              <Typography gutterBottom variant='body1'>
                {post.body}
              </Typography>
              <Button
                onClick={() => deletepost(post.id)}
                variant='contained'
                color='primary'
                startIcon={<DeleteOutlineIcon />}>
                Delete
              </Button>
            </Item>
          ))}
        </Masonry>
      ) : (
        <h4 style={{ textAlign: "center" }}>No post were found!</h4>
      )}
    </Box>
  );
};
export default Posts;
