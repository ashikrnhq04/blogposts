import ResponsiveAppBar from "./components/Header";
import AllPosts from "./views/blog";
import Notfound from "./views/404";
import Single from "./components/Single";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./components/Signup";

function App() {
  return (
    <div className='App'>
      <UserAuthContextProvider>
        <Router>
          <header className='App-header'>
            <ResponsiveAppBar />
          </header>
          <Routes>
            <Route exact path='/' element={<AllPosts />}></Route>
            <Route path='/blog' element={<AllPosts />}></Route>
            <Route path='/blog/:slug' element={<Single />}></Route>
            <Route path='/login' element={<AllPosts />}></Route>
            <Route
              path='/signout'
              element={<Navigate to='/' replace />}></Route>
            <Route path='*' element={<Notfound />}></Route>
          </Routes>
        </Router>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
