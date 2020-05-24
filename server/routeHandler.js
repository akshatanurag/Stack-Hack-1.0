const authRouter = require('../routers/auth')
const verifyRouter = require('../routers/verify')

module.exports = (app)=>{
    app.use("/api",authRouter)
    app.use("/api",verifyRouter)
}