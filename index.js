const express=require('express');
const { connectToDB }=require('./connect')
const URL=require('./models/model');
const path=require('path');
const cookieParser=require('cookie-parser')
const urlroute=require('./routes/route')
const staticroute=require('./routes/staticroute')
const userroute=require('./routes/user')
const {CheckForAuthentication,RestrictedTo}=require('./MiddleWare/middleware')

const app=express();
connectToDB("mongodb://127.0.0.1:27017/short-url");

// builtin middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))
app.use(CheckForAuthentication);

// using routes
app.use('/url',urlroute);
app.use('/',staticroute);
app.use('/user',userroute);

// set EJS template library 
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));


app.get("/url/:shortid",async (req,res) => {
    const short=req.params.shortid;
    const entry=await URL.findOneAndUpdate({
        shortId:short,
    },
    {
        $push:{
            visitHistory:{timestamps:Date.now()},
        },
    });
    // console.log(entry.redirecturl);
    return res.redirect(entry.redirecturl);
});

app.listen(8000,() => {
    console.log("Server started...");
});