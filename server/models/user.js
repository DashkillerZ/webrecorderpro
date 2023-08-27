const mongoose = require("mongoose");



const usersSchema = new mongoose.Schema({
    email: {
        type:String,
        requred:true,
        unique:true 
    },
    name: {
        type:String,
        requred:true
    },
});




const User = mongoose.model("users", usersSchema);
module.exports = User;