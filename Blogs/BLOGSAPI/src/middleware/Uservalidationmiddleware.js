const uservalidation = require("../services/uservalidation");
const loggerEvent = require("../services/logger.services");
const logger = loggerEvent("uservalidationmiddleware");
function newuservalidateion(req, res, next) {
  try {
     logger.info(req.body);

    let { error } = uservalidation.NewUserSchema.validate(req.body);
    if (error) {
      let errormsg = error.details[0].message;
      logger.error(errormsg)

      return res.status(403).send({message:errormsg});
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
function loginvalidateion(req, res, next) {
  try {
    let { error } = uservalidation.loginSchema.validate(req.body);
    if (error) {
      let errormsg = error.details[0].message;

      return res.status(403).send({ message: errormsg });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
module.exports = { newuservalidateion, loginvalidateion };
