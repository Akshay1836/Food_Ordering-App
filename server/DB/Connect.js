const mongoose = require("mongoose");

const DB = () => {
  mongoose.connect(process.env.CONNECTION_STRING, {}).then((data) => {
    console.log(`Mongoose connect with server: ${data.connection.host}`);
  }).catch((err)=>console.log("error"+ err))
    
};

module.exports = DB;
