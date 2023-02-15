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

        //hash password

        const hashedPassword = await bcrypt.hash(req.body.password,10);

        //prepare the model

        const user = new User({
            email: req.body.email,
            password: hashedPassword,
        });

        let access_token;


        try{
            const result = await user.save();

            //token
            access_token= JwtService.sign({ _id: result._id})


        }catch(err){
            return error;
        }
        res.json({access_token:access_token})


    }
}


export default registerController;

