const express = require("express");
const mongoose=require('mongoose')
const userrouter = require("./src/routers/user.routers");
const blogrouts = require('./src/routers/blog.routers')
const authrouters = require("./src/routers/auth.routers");
const app = express();
const fs = require('fs')
const port = process.env.port || 5000;
const cors=require("cors")
const cookieparser = require('cookie-parser')
require('dotenv').config()
const url = process.env.DB_URL
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{console.log("**********Connected**********");}).catch((error)=>{console.log(error.message)})
app.use(cors(corsOptions));
app.use('/api/blogs',express.static('./uploads'))
app.use(express.json());
app.use(cookieparser())
app.use("/api",userrouter);
app.use("/api/auth", authrouters);
app.use("/api/blogs", blogrouts);
app.listen(port, () => console.log("**********Here-We-Go**********"+port));

