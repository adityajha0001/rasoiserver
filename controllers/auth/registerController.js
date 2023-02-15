import Joi from 'joi';










const registerController = {
    register(req,res,next){


        const registerSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}')).required(),
        });

        const { error } = registerSchema.validate(req.body);

        if(error){
            //return next( error );
            throw error;
        };


        res.json({msg : "hello from express"})


    }
}


export default registerController;

