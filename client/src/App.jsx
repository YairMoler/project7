import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Posts from "./components/Posts";
import Todos from "./components/Todos";
import Info from "./Info";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/home/:id" element={<Home />}> */}
          <Route path="posts" element={<Posts />} />
          <Route path="todos" element={<Todos />} />
          <Route path="Info" element={<Info />} />
          {/* </Route> */}
          <Route path="*" element={<h1>page is not found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
