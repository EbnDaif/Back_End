const joi = require('joi')
const passwordmsg =
  "TOO Weak Pssword try to add a spicial character, capital letters,small letters";
const NewUserSchema = joi.object({
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  username: joi.string().required(),
  password: joi
    .string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])")).message(passwordmsg)
    .min(8),
  email: joi.string().email().required(),
  age: joi.string(),
});
const loginSchema = joi.object({
  password: joi
    .string()
    .min(8),
  email: joi.string().email().required()
});
module.exports = {
  NewUserSchema: NewUserSchema,
  loginSchema:loginSchema
};