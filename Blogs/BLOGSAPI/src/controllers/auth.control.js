const User = require('../models/user.models')
const loggerEvent = require('../services/logger.services')
const logger = loggerEvent('auth')
const bcrybtjs= require('bcryptjs')
exports.authcontroll = {
    NewUser: async (req, res) =>
    {
        try {
            logger.info(req.body)
            const data = req.body
            let dublicatedemail = await User.findOne({ email: data.email })
            if (dublicatedemail)
            {      logger.error("email is already taken ");

                return res.status(403).send({message:'email is already taken  '})
            }
            const newuser = new User(data)
            await newuser.save()
            res.status(200).send({ message: "Created" });
        } catch (error) {
            res.status(500).send(error)
            logger.error(error.message)
        }
    },
    Login: async (req, res) => {
        try {
            logger.info(req.body)
    const user = await User.findbycredentials(
      req.body.email,
      req.body.password
    );
            const token = await user.generatetokens();
            res.cookie("access_token", `Bearer ${token}`, {
              httpOnly: true,
              maxage:1000* 60 * 60 * 48,
            });
    res.status(200).send({ user, token });
        } catch (error) {
            res.status(403).send({message:error.message});
            logger.error(error.message);
            
        }
    }
} 
