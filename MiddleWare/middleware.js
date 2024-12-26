const {getuser}=require('../services/auth');

// for authentication
function CheckForAuthentication(req,res,next) {
    const token=req.cookies?.token;
    if(!token)
    {
        return next();
    }
    const user=getuser(token);
    req.user=user;
    return next();
}

// for authorization
function RestrictedTo(roles=[]) {
    return function (req,res,next) {
        if (!req.user) {
            return res.redirect('/login');
        }
        if (!roles.includes(req.user.role)) {
            return res.end("UnAuthorized.You dont have any access of this role.");
        }
        return next();
    }
}
module.exports={
    CheckForAuthentication,
    RestrictedTo
}