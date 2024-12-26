const mongoose =require('mongoose');

function connectToDB(url) {
    return mongoose.connect(url).then(() => {
        console.log("MongoDB started");
    })
}

module.exports={connectToDB};