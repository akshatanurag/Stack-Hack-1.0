const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/todo-app",{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true,useFindAndModify: false })

var con = mongoose.connection
con.on("open",()=>{
    //console.log("DB connected")
})

//mongoose.Promise = global.Promise

module.exports = {
    mongoose
}