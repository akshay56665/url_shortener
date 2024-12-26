const URL=require('../models/model');
const short=require('shortid')

async function generateShortURL(req,res) {
    let shortID=short();
    const body=req.body;
    if(!body.url)
    {
        return res.status(400).json({Error:"URL is necessary"});
    }

    await URL.create({
        shortId:shortID,
        redirecturl:body.url,
        visitedHistory:[],
        createdBy:req.user._id
    })
    // return res.json({shortId:shortID});
    return res.render('home',{id:shortID});
}

async function getAnalytics(req,res) {
    const id=req.params.shortId;
    const result=await URL.findOne({shortId:id});
    return res.json({
        totalclicks:result.visitHistory.length,
        analytics:result.visitHistory,
    });
}

module.exports={
    generateShortURL,
    getAnalytics
}