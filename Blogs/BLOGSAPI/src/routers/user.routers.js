const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const user_c=require('../controllers/Users.control')

router.get("/users", auth.authorization,user_c.getall);
router.get("/users/:id", auth.authantication,user_c.getuser);
router.patch("/users/:id", auth.authorization, user_c.update);
router.patch("/users/updatepasswrd", auth.authorization, user_c.updatepassword);
router.delete("/users/:id", auth.authorization, user_c.del_user);
router.get("/profile", auth.authantication, user_c.profile);
router.delete("/logout", auth.authantication, user_c.logout);
router.delete("/logoutall", auth.authantication,user_c.logallout)
module.exports = router;
