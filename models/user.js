const mongoose = require('mongoose')
const CryptoJS  = require('crypto-js')
const jwt = require('jsonwebtoken')
const joi = require("@hapi/joi");


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        minlength: 6
    },
    password: {
        type: String,
        minlength: 6
    },
    verify:{
      status:{
        type: Boolean,
        default: false
      },
      token:{
        type: String,
        minlength: 12
      },
      expireyTime: {
        type: Date,
        default: Date.now()
      }
    }
})

userSchema.methods.generateHash = (password)=>{
    return CryptoJS.SHA256(password).toString()
}

userSchema.methods.validatePassword = (password,hashPassword)=>{
    if(CryptoJS.SHA256(password).toString() == hashPassword)
    return true
    else
    return false
}

userSchema.methods.generateAuthToken = (bodyEmail)=>{
    return jwt.sign(
        {
          email: bodyEmail,
          type: "User"
        },"cjdsknkjdshvkjsdvhds7676565434sakjchkjashcksajhcksahcaskchsa",{
          expiresIn: "30d"
        }
      );
}
function validateSchema(user) {
    const schema = joi.object().keys({
      name: joi
        .string()
        .min(1)
        .max(50)
        .required(),
      email: joi
        .string()
        .min(5)
        .max(255)
        .required()
        .email(),
      password: joi
        .string()
        .min(5)
        .max(255)
        .required()
    });
    return schema.validate(user);
  }
  

const User = mongoose.model("user",userSchema)
module.exports = {
    User,
    Validate: validateSchema,
}











