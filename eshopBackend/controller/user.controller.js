import { User } from "../model/user.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
const config = dotenv.config();
export const signIn = async (request,response,next)=>{
   let {email,password} = request.body;
   try{
      let user = await User.findOne({email});
      if(user){
        let status = bcrypt.compareSync(password,user.password);
        user.password = undefined;
        return status ? response.status(200).json({message: 'Sign in success', user,token: generateToken()}) : response.status(401).json({error: "Bad request | Unauthorized user"});
      }  
      return response.status(401).json({error: "Bad request|Unauthroized user"});
   }
   catch(err){
    console.log(err);
    return response.status(500).json({error: "Internal Server Error"});
   } 
}
const generateToken = (userId)=>{
    let payload = {subject: userId};
    console.log(process.env.SECRET_KEY);
    let token = jwt.sign(payload,process.env.SECRET_KEY);
    return token;
}
export const signUp = async (request,response,next)=>{
  try{   
    const errors = validationResult(request);
    if(!errors.isEmpty())
      return response.status(401).json({error: "Bad request",errors: errors.array()});
    let profile = "";
    if(request.file)
       profile = "images/"+request.file.filename;
    let {email,password,contact} = request.body;
    let user = await User.create({email,password,contact,profile});  
    
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'meanstack4@gmail.com',
        pass: 'cbhw xgpl llrt iwod'
      }
    });
    
    var mailOptions = {
      from: 'meanstack4@gmail.com',
      to: email,
      subject: 'Welcome In Eshop',
      text: 'Dear user, Thank you registration'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        return response.status(201).json({message: "user saved",user});
      }
    });

  }
  catch(err){
    return response.status(500).json({error: "Internal Server Error"});
  }
}