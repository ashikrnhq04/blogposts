import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import GoogleButton from "react-google-button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useUserAuth } from "../context/UserAuthContext";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";

const Login = ({ signup, login, modal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const loginError = (arg) => {
    setErrorAlert(arg);
  };
  const closeLoginError = () => {
    setErrorAlert(false);
    setSuccess(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      setSuccess(true);
      login(false);
      signup(false);
      modal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Container maxWidth='lg'>
        {error && (
          <Snackbar
            sx={{ width: "100%" }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={loginError}
            autoHideDuration={1000}
            close={closeLoginError}>
            <Alert severity='error'>
              {error.includes("wrong-password") &&
                "Wrong username or password!"}
            </Alert>
          </Snackbar>
        )}
        {success && (
          <Snackbar
            sx={{ width: "100%" }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={loginError}
            autoHideDuration={1000}
            close={closeLoginError}>
            <Alert severity='success'>
              Login successful! Welcome to the blog!
            </Alert>
          </Snackbar>
        )}
        <Box sx={{ width: "100%" }}>
          <Box sx={{ textAlign: "center" }}>
            <h2 className='mb-3'>Login your account</h2>
          </Box>
          {error && <Alert variant='danger'>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <FormControl
              fullWidth={true}
              size='medium'
              sx={{ marginBottom: "20px" }}>
              <TextField
                type='email'
                required
                label='Email address'
                id='filled-error'
                variant='filled'
                value={email}
                onChange={(e) => setEmail(e.target.value)}></TextField>
            </FormControl>

            <FormControl
              fullWidth={true}
              size='medium'
              sx={{ marginBottom: "20px" }}>
              <TextField
                type='password'
                required
                label='Password'
                id='filled-error'
                variant='filled'
                value={password}
                onChange={(e) => setPassword(e.target.value)}></TextField>
            </FormControl>

            <Box sx={{ marginTop: "20px" }}>
              <Button
                fullWidth={true}
                size='large'
                variant='contained'
                type='Submit'>
                Log In
              </Button>
            </Box>
          </form>
          <hr />
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}>
            <GoogleButton className='g-btn' type='dark' />
          </Box>
        </Box>
        <Box sx={{ textAlign: "center", p: "20px" }}>
          Don't have an account?{" "}
          <a
            href='?#'
            onClick={() => {
              signup(true);
              login(false);
            }}>
            Sign up
          </a>
        </Box>
      </Container>
    </>
  );
};

export default Login;
