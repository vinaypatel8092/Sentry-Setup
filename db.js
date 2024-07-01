const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to mongodb');
    })
    .catch((error) => {
        console.error('Error conneting to db: ', error)
    })