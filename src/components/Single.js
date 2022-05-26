import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import Post from "./Post";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

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

const Single = () => {
  const [loading, setLoading] = React.useState(false);
  const slug = useParams();
  const [post, setPost] = useState([]);

  const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            throw Error("No post were found. Please check the API");
          }
        }
        return res.json();
      })
      .then((data) => {
        setPost(() => {
          return data.filter((post) => {
            return post.title.split(" ").join("-") === slug.slug;
          });
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Container maxWidth={"lg"}>
        <div className='main' style={{ marginTop: "50px" }}>
          {post.map((post) => (
            <Item key={post.id}>
              <Post post={post} />
            </Item>
          ))}
        </div>
      </Container>
    </>
  );
};
export default Single;
