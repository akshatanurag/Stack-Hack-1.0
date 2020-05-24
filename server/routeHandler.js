const authRouter = require('../routers/auth')
const verifyRouter = require('../routers/verify')
const todoRouter=require('../routers/todo_routers')

module.exports = (app)=>{
    app.use("/api",authRouter)
    app.use("/api",verifyRouter)
    app.use("/api",todoRouter)
}