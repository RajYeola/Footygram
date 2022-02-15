import "./App.css";
import { React, useEffect, lazy } from "react";
import { Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "./features/search/searchSlice";
import { fetchAllPosts } from "./features/posts/postsSlice";
import axios from "axios";
import Navbar from "./features/navbar/Navbar";

const Home = lazy(() => import("./features/home/Home"));
const Profile = lazy(() => import("./features/user/Profile"));
const Login = lazy(() => import("./features/auth/Login"));
const Signup = lazy(() => import("./features/auth/Signup"));
const PrivateRoute = lazy(() => import("./features/auth/PrivateRoute"));

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const searchUserStatus = useSelector((state) => state.search.status);
  const postsStatus = useSelector((state) => state.search.status);

  useEffect(() => {
    token
      ? (axios.defaults.headers.common["Authorization"] = token)
      : (axios.defaults.headers.common["Authorization"] = null);
  }, [token]);

  useEffect(() => {
    if (token && searchUserStatus === "idle") {
      dispatch(fetchAllUsers());
    }
  }, [token, dispatch, searchUserStatus]);

  useEffect(() => {
    if (token && postsStatus === "idle") {
      dispatch(fetchAllPosts());
    }
  }, [dispatch, postsStatus, token]);

  return (
    <div className="App view-container">
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/:username" element={<PrivateRoute />}>
          <Route path="/:username" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
