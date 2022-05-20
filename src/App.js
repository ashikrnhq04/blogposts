import { useEffect, useState } from "react";
import ResponsiveAppBar from "./components/Header";
import Container from "@mui/material/Container";
import Posts from "./components/Posts";
import { PaginationRounded } from "./utils/index";
import Button from "@mui/material/Button";
import AllPosts from "./views/blog";
import Notfound from "./views/404";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Router>
        <header className='App-header'>
          <ResponsiveAppBar />
        </header>
        <Routes>
          <Route path='/blog' element={<AllPosts />}></Route>
          <Route path='*' element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
