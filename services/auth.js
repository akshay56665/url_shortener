// For Statefull authentication
// const map=new Map();

// function setuser(id,user) {
//     map.set(id,user);
// }

// function getuser(id) {
//     return map.get(id);
// }

// for Stateless authentication
const jwt=require('jsonwebtoken');
const secret="@#!1232";
function setuser(user) {
    return jwt.sign(
        {
            _id:user._id,
            email:user.email,
            role:user.role
        },
        secret
    );
}

function getuser(token) {
    if (!token) {
        return null;
    }
    try {
        return jwt.verify(token,secret);
    } 
    catch (error) {
        return null;
    }
}



module.exports={
    getuser,
    setuser
}