const mongoose = require('mongoose')

// environmental variable (Database)
const connectionString = process.env.DATABASE

// connecting to mongoDB
mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Connected Successfully!");
}).catch((err)=>{
    console.log(err);
})