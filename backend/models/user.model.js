import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username : {
        type : String,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
    }
}, {timestamps:true})

export  const User = mongoose.model("User",UserSchema)