import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";

const userSlice = createSlice({
  name: "userAuth",
  initialState: {
    userEmail: "",
    userPassword: "",
  },
  reducers: {
    login: (state, action) => {},
    signup: (state, action) => {},
    signOut: (state, action) => {},
  },
});
