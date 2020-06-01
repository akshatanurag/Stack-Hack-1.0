const express = require('express')
const {User}=require('../models/user')

const router = express.Router()

router.get("/verify/:token",async (req,res)=>{
    //var url=`http://localhost:3000/api/verify/${req.params.token}`
    let currentUser = await User.findOne({"verify.token": req.params.token}) //find the user document by the token passed in the paramenter
    if(!currentUser) //if the user was not found the error out
    return res.status(400).send({
        status: false,
        message: "Invalid Email Token"
    })
    let tdd = await User.updateOne({"verify.token": req.params.token},{"verify.status": true,"verify.token": null}) //update the verification status
    if(tdd.n&&tdd.nModified&&tdd.ok) //notify the user
    return res.status(200).send({
        success: true,
        message: "Email Verification Was Successful"
    }) 
    else    
    return res.status(200).send({
        success: false,
        message: "Email Verification Failed"
    })

})

module.exports = router