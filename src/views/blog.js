import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Posts from "../components/Posts";
import { PaginationRounded } from "../utils/index";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";

const AllPosts = () => {
  const [postdata, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [deleteSuccess, setDeleteSuccess] = useState({
    open: false,
    horizontal: "right",
    vertical: "bottom",
    message: "Post has been deleted successfully",
  });

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const postsToLoop = postdata.slice(firstPostIndex, lastPostIndex);

  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDeleteSuccess({ ...deleteSuccess, open: false });
  };

  const paginate = (event, value) => {
    setCurrentPage(value);
  };
  const deletePost = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          setPostData(postdata.filter((post) => post.id !== id));
          setDeleteSuccess({ ...deleteSuccess, open: true });
        } else {
          throw Error("Error deleting post");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) {
          setLoading(false);
          if (res.status === 404) {
            throw Error("No post were found. Please check the API");
          }
        }
        return res.json();
      })
      .then((data) => {
        setPostData(data);
        setLoading(false);
        return data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth={"lg"}>
      <div className='main' style={{ marginTop: "50px" }}>
        <Posts
          postdata={postsToLoop}
          deletepost={deletePost}
          loading={loading}
        />
        <Snackbar
          open={deleteSuccess.open}
          message='The post has been deleted successfully'
          key={deleteSuccess.vertical + deleteSuccess.horizontal}
          autoHideDuration={1000}
          onClose={snackbarClose}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            m: "20px",
          }}>
          {postdata.length > postsPerPage && (
            <PaginationRounded
              count={Math.ceil(postdata.length / postsPerPage)}
              onChange={paginate}
            />
          )}
        </Box>
      </div>
    </Container>
  );
};

export default AllPosts;
