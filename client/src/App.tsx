import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { Navbar } from "./components/Navbar";
import { Todos } from "./components/Todos";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Signup } from "./pages/Signup";
import { RootState } from "./store/store";
function App() {
  let User = useSelector((state:RootState) => state.User);

  return (
    <Router>
      <div className="container bg-light px-0 shadow">
        <Navbar isAuthenticated={User.authenticated} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="todos" element={<Todos />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
