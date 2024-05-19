const validate = (schema) => async (req, res, next) => {
    try{
        const parseBody = await schema.parseAsync(req.body); //here schema is what we define using zod and req.body is data that is entered by user
        req.body = parseBody;
        return next();
    }catch(err){

        const status = 422;
        const message = "Fill the input properly!";
        const extraDetails = err.errors[0].message;

        const error = {
            status,
            message,
            extraDetails, 
        };

        console.log(error);

        next(error);

        // res.status(400).json({message : message });
    }
};

module.exports = validate;

