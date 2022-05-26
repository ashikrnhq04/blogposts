import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Post = ({ post, link, limit }) => {
  return (
    <>
      <Typography
        variant='h2'
        fontSize={26}
        fontWeight={700}
        gutterBottom
        color={"common.black"}>
        {link ? (
          <Link
            style={{
              textDecoration: "none",
              color: "#1976d2",
            }}
            to={link}>
            {post.title}
          </Link>
        ) : (
          post.title
        )}
      </Typography>
      <Typography gutterBottom variant='body1'>
        {limit
          ? post.body
              .split(" ")
              .slice(0, limit - 1)
              .join(" ") + " ..."
          : post.body}
      </Typography>
    </>
  );
};

export default Post;
