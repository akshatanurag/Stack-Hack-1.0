const express = require('express')
const {User}=require('../models/user')

const router = express.Router()

router.get("/verify/:token",async (req,res)=>{
    let updateStatus = await User.findOneAndUpdate({"verify.token": req.params.token},{"verify.status":true,"verify.token":null})
    if(!updateStatus)
    return res.status(400).send({
        success: false,
        message: "Email Verification Failed"
    })
    
    return res.status(200).send({
        success: true,
        message: "Email Verification Successful"
    })
})

module.exports = router