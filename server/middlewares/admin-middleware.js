const adminMiddleware = async(req, res, next) => {
    try{
        console.log(req.user);
        const adminRole = req.user.isAdmin;

        if(!adminRole){
            return res.status(403).json({message : "Acess denied! user is nit an admin!"});
        }
        next();
        // res.status(200).json({message : req.user.isAdmin});
    }catch(err){
        next(err);
    }
}

module.exports = adminMiddleware;