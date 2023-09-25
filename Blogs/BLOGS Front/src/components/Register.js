// Register.js
import React, { useState } from "react";
import Api from "../config/api";
import { notifySuccess, notifyerror } from "./notify";
import {  useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false)
  const [inputs, setinputs] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password:"",
    
  })
  const handlechange = (e) => {
    setinputs((prevstate) =>( {
      ...prevstate,[e.target.name]:e.target.value
    }))
  }
  const handleSubmit = (event) => {
    setloading(true)
    event.preventDefault();
       try {
         Api.post("/auth/register", inputs)
           .then(() => {
             setloading(false)
             notifySuccess("Created")
                          navigate("/login")

           })
           .catch((e) => {
             const errorMessage = e?.response?.data?.message || e?.response?.data?.error 
                          setloading(false);

             notifyerror(errorMessage);
           });

         console.log(inputs);
       } catch (error) {
         console.log(error);
       notifyerror(error.message);}
  };  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">
          <b>firstname</b>
        </label>
        <input
          name="firstname"
          type="text"
          placeholder="First Name"
          value={inputs.firstname}
          onChange={handlechange}
        />
        <label htmlFor="lastname">
          <b>lastname</b>
        </label>
        <input
          name="lastname"
          type="text"
          placeholder="Last Name"
          value={inputs.lastname}
          onChange={handlechange}
        />
        <label htmlFor="username">
          <b>username</b>
        </label>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={inputs.username}
          onChange={handlechange}
        />
        <label htmlFor="email">
          <b>email</b>
        </label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={inputs.email}
          onChange={handlechange}
        />{" "}
        <label htmlFor="password">
          <b>password</b>
        </label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={inputs.password}
          onChange={handlechange}
        />
        <button disabled={loading} className="sbtn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
