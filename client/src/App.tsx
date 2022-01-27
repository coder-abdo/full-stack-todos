import { observer } from "mobx-react-lite";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Navbar } from "./components/Navbar";
import { Todos } from "./components/Todos";
import { AddTodo } from "./pages/AddTodo";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Profile } from "./pages/Profile";
import ProtectedRoutes from "./pages/ProtectedRoute";
import { Signup } from "./pages/Signup";
import { useStore } from "./store/store";
function App() {
  const {
    auth: { isAuthenticated },
  } = useStore();
  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="todos" element={<Todos />} />
            <Route path="create-todos" element={<AddTodo />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default observer(App);
