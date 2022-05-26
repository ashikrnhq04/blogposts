import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useUserAuth } from "../context/UserAuthContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Container from "@mui/material/Container";
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

const Signup = ({ login, signup, modal }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const signupError = (arg) => {
    setErrorAlert(arg);
  };

  const closeSignupError = () => {
    setErrorAlert(false);
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await signUp(email, password);
      setSuccess(true);
      signup(false);
      login(false);
      modal(false);
    } catch (err) {
      console.log(err);
      setError(() =>
        err.message.includes("email-already")
          ? "Email already exists"
          : err.message
      );
      signupError(true);
    }
  };
  return (
    <>
      <Container maxWidth='lg'>
        <Box sx={{ textAlign: "center" }}>
          <h2 sx={{ py: 20 }}>Register your account</h2>
          {error && (
            <Snackbar
              sx={{ width: "100%" }}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={signupError}
              autoHideDuration={1000}
              close={closeSignupError}>
              <Alert severity='error'>{error}</Alert>
            </Snackbar>
          )}
          {success && (
            <Snackbar
              sx={{ width: "100%" }}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={signupError}
              autoHideDuration={1000}
              close={closeSignupError}>
              <Alert severity='success'>
                You've been registered successfully!
              </Alert>
            </Snackbar>
          )}
          <Box sx={{ width: "100%" }}>
            <Item sx={{ width: "100%" }}>
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
                <FormControl fullWidth>
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
                    Sign up
                  </Button>
                </Box>
              </form>
            </Item>
          </Box>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <p>
            Already have an account?{" "}
            <a
              href='?#'
              onClick={() => {
                login(true);
                signup(false);
              }}>
              Log In
            </a>
          </p>
        </Box>
      </Container>
    </>
  );
};

export default Signup;
