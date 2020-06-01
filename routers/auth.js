const express = require('express')
const joi = require("@hapi/joi");
const randomString = require('randomstring')
const {sendMail} = require('../utils/mail')


const {User,Validate} = require('../models/user')

const router = express.Router()

router.post("/signup",async (req,res)=>{
    try{
    input ={name,email,password} = req.body // getting the input from the clients

    const { error } = Validate(input);
    if (error)
      return res.status(400).send({
        success: false,
        message: error.details[0].message
      });

    if(await User.findOne({enail: input.email})){ //this will simply check the db for any duplicate emails and infrom the user about redundancy 
        return res.send(400).send({
            success: false,
            message: "Email Taken"
        })
    }
    const user = new User(input) 
    user.password = await user.generateHash(input.password) //encrpypting the password 
    let token = await user.generateAuthToken(input.email)
    user.verify.token = await randomString.generate(50)
    //console.log(token)
    await user.save()
    await sendMail(req.body.email,user.verify.token)
    return res.header('x-auth-token', token).send({
        success: true,
        message: {
          id:user._id,
          name:user.name,
          email: user.email,
          email_status: user.verify.status
        }
    });
    }catch (error) {
        console.log(error)
        return res.status(400).send({
          success: false,
          message: 'Uable to sign you up'
        });
      }

})

router.post("/login",async (req,res)=>{
    try{
        const input = {email,password} = req.body
        loginDataValidate=(input)=>{
            const schema = joi.object().keys({
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
              return schema.validate(input);
        }

        const {error} = await loginDataValidate(input)

        if(error)
        return res.status(400).send({
            success: false,
            message: error.details[0].message
          });

        let fetchUserData = await User.findOne({email: input.email})
        if(!fetchUserData){
        return res.status(400).send({
            success: false,
            message: "Email/Password incorrect"
            })
        }
        var userLogin = User()
        if(!await userLogin.validatePassword(input.password,fetchUserData.password)){
            return res.status(403).send({
                success: false,
                message: "Email/Password incorrect"
            }) 
        }
        const token = await userLogin.generateAuthToken(input.email);
            return res.header('x-auth-token', token).status(200).send({
              success: true,
              message: {
                _id: fetchUserData._id,
                name:fetchUserData.name,
                email: fetchUserData.email,
                email_status: fetchUserData.verify.status
                      }
            });
    } catch(error){
        console.log(error)
        return res.status(400).send({
            success: false,
            message: `${error}`
          })
    }
})

router.get('/logout', async (req, res) => {
  res.header('x-auth-token', null).status(200).send({
      success: true,
      message: "Logged Out"
    });
});


module.exports = router