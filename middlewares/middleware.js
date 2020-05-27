const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const fetchUser = async email => {
    var findUser = await User.findOne({
      email: email
    }).select('-password');
    if (!findUser) return 0;
    return findUser;
  };
module.exports = {
    isLoggedIn: async(req,res,next)=>{
        try {
            const token = req.header('x-auth-token');
            if (!token)
              return res.status(401).send({
                success: false,
                message: 'Access denied'
              });
            const decoded = jwt.verify(token, 'cjdsknkjdshvkjsdvhds7676565434sakjchkjashcksajhcksahcaskchsa');
            req.user = decoded;
            req.currentUser = await fetchUser(decoded.email)
            if(req.currentUser)
              next();
            else
              return res.status(401).send({
                success: false,
                message: 'Invalid Session or token'
              });
          } catch (e) {
            console.log('Generated from isLoggedIn Middileware' + e);
            return res.status(401).send({
              success: false,
              message: 'Access denied'
            });
          }
    },
    isVerified: async function(req, res, next) {
        try {
          if (req.user) var email = req.user.email;
          else var email = req.body.email
          var currentUser = await fetchUser(email);
          if (currentUser == 0)
            return res.status(400).send({
              success: false,
              message: 'No user was found'
            });
          if (currentUser.verify.status) next();
          else
            return res.status(401).send({
              success: false,
              message: 'Email not verified'
            });
        } catch (e) {
          console.log(e)
          return res.status(401).send({
            success: false,
            message: 'Email not verified'
          });
        }
      },
}