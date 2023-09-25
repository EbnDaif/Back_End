const express = require("express");
const uservalidation=require('../middleware/Uservalidationmiddleware')
const router = express.Router();
const {authcontroll}=require('../controllers/auth.control')
router.post("/register",uservalidation.newuservalidateion, authcontroll.NewUser,);
router.post("/login",uservalidation.loginvalidateion, authcontroll.Login);
module.exports = router;
