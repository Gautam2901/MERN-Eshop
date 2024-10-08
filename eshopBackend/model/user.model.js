import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true
     },
     password: {
        type: String,
        required: true,
        set: (password)=>{
            let saltKey = bcrypt.genSaltSync(10);
            password = bcrypt.hashSync(password, saltKey);
            return password;
        }
     },
     contact: {
        type: Number,
        required: true
     },
     profile: {
      type: String
     }
}, {versionKey: false});

export const User = mongoose.model("user", userSchema);