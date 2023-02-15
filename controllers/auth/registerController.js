import Joi from 'joi';
import { User } from '../../models';
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtServices';

const registerController = {
    async register(req,res,next){


        const registerSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}')).required(),
        });
          
        const { error } = registerSchema.validate(req.body);

        if(error){
            //return next( error );
            throw error;
        };
        const { email,password } = req.body;
  console.log(req.body)
        //hash password

        const hashedPassword = await bcrypt.hash(password,10);

        //prepare the model
       

        const user = new User({
            email,
            password: hashedPassword,
        });

        let access_token;


        try{
            const result = await user.save();

            //token
            access_token= JwtService.sign({ _id: result._id})


        }catch(err){
            console.log(err);
        }
        res.json({data:access_token})


    }
}


export default registerController;

