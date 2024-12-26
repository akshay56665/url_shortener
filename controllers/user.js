const User=require('../models/auth')
const {v4:uuidv4}=require('uuid')
const {setuser}=require('../services/auth');

async function handleUserSignup(req,res) {
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.redirect('/');    
}

async function handleUserLogin(req,res) {
    const {email,password}=req.body;
    const user=await User.findOne({email,password})
    if (!user) {
        return res.render('login',{
            err:"Invalid Username or password"
        });
    }
    // const sessionid=uuidv4();
    // setuser(sessionid,user);
    const token=setuser(user);
    res.cookie('token',token);
    return res.redirect('/');
    // return res.json({token})    
}

module.exports={
    handleUserSignup,
    handleUserLogin
}
