const express=require('express');
const URL=require('../models/model')
const {RestrictedTo}=require('../MiddleWare/middleware')

const router=express.Router();

router.get('/admin',RestrictedTo(['ADMIN']),async (req,res)=>{
    const allurls=await URL.find({});
    return res.render('home',{
        urls:allurls
    });
});

router.get('/',RestrictedTo(['NORMAL','ADMIN']),async (req,res)=>{
    const allurls=await URL.find({createdBy:req.user._id});
    return res.render('home',{
        urls:allurls
    });
});

router.get('/signup', (req,res)=>{
    return res.render('signup');
});

router.get('/login', (req,res)=>{
    return res.render('login');
});
module.exports=router;