
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notifySuccess, notifyerror } from "./notify";
import { fetchUserData } from "../redux/reducers/user";

import Api from "../config/api";
  
function Login () {
  const navigate = useNavigate();
  const dispach = useDispatch();
  const user = useSelector((state) => state.counter.data);

  const [loading, setloading] = useState(false);
  console.log(user);
  const [inputs, setinputs] = useState({
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    setinputs((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (event) => {
    setloading(true);
    event.preventDefault();
    try {
      Api.post("/auth/login", inputs)
        .then(() => {
          setloading(false);
          notifySuccess("successfully logged in");
          navigate("/myblogs");
          dispach(fetchUserData());
          
        })
        .catch((e) => {
             const errorMessage =
               e?.response?.data?.message || e?.response?.data?.error; 
          setloading(false);
          console.log(errorMessage);
          notifyerror(errorMessage);
        });

      console.log(inputs);
    } catch (error) {
      console.log(error);
      notifyerror(error.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <label htmlFor="email">
            <b>email</b>
          </label>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={inputs.email}
            onChange={handlechange}
            required
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={inputs.password}
            onChange={handlechange}
            required
          />

          <button disabled={loading} className="sbtn" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
