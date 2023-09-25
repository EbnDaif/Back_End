
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import BlogList from "./components/BlogList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import { useSelector,useDispatch } from "react-redux";
import { fetchUserData } from "./redux/reducers/user";
import Createblog from "./components/createblog";
import Updateblog from "./components/updateblog";
import AllblogList from "./components/allblogs";
import "./style/App.css"
function App() {
  
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.counter.data);
  console.log(user);
  const islogin = useSelector((state) => state.counter.islogin);
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  const handleLogin = (user) => {
    setCurrentUser(user);
  };


  if (!currentUser) {
    return (
      <Router>
        <Header />
        <ToastContainer />
        <Routes>
          <Route
            exact
            path="/login"
            element={<Login />}
            onLogin={handleLogin}
          />
          <Route
            exact
            path="/register"
            element={<Register />}
            onRegister={handleLogin}
          />
          <Route exact path="/updateblog/*" element={<Updateblog />} />
          {islogin && user.isAdmin && (
            <Route exact path="/allblogs" element={<AllblogList />} />
          )}
          {islogin && <Route exact path="/myblogs" element={<BlogList />} />}
          {islogin && <Route exact path="/newblog" element={<Createblog />} />}
        </Routes>
      </Router>
    );
  }
}

export default App;