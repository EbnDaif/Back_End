const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const authantication = async (req, res, next) => {
  try {
    if (!req.cookies) {
      return res.status(401).send({ Message: "unauthorized user" });
    }
    const token = req.cookies.access_token.split(" ")[1];
   // console.log(token);
    const secret_key = process.env.SECRET_KEY;

    const Valid = jwt.verify(token, secret_key);
    if (!Valid) {
      return res.status(401).send({ Message: "unauthorized user" });
    }
   // console.log(Valid);
    const user = await User.findById(Valid._id);

    if (!user) {
      return res.status(401).send({ Message: "unauthorized user" });
    }
    if (!user.tokens.includes(token)) {
      return res.status(401).send({ Message: "unauthorized user" });
    }

    req.user = user;
    req.token = token;

    next();
  } catch (e) {
    res.status(401).send({ message: e.message });
  }
};
const authorization = async (req, res, next) => {
  try {
    authantication(req, res, () => {

      if (!req.user.isAdmin) {
    console.log(req.user.isAdmin);

        return res.status(401).send({ Message: "unauthorized admin" });
      }
      next()
    });
  } catch (error) {
    res.status(401).send({ message: e.message });
  }
};

module.exports = {authantication,authorization};
