const mongoose = require('mongoose')

// environmental variable (Database)
const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Connected Successfully!");
}).catch((err)=>{
    console.log(err);
})