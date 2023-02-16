import Joi from "joi";
const bcrypt = require('bcrypt')
import { User } from "../../models";
import JwtService from "../../services/JwtServices";







const loginController = {
  async login(req, res, next) {
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}"))
        .required(),
    });

    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw error;
    }

    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return error;
      }
      
      const match = await bcrypt.compare(req.body.password, user.password);
      if(!match){
        return error;
      }

      access_token= JwtService.sign({ _id: user._id})

      res.json({ access_token})
    } catch (err) {
      console.log(err);
    }
  },




};

export default loginController;
