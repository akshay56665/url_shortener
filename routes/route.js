const {
    generateShortURL,
    getAnalytics
}=require('../controllers/URL')
const express=require('express');

const router=express.Router();

router.post('/',generateShortURL);
router.get('/analytics/:shortId',getAnalytics);

module.exports=router;

