const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://root:toor@cluster0-kkzmc.mongodb.net/todo",{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true,useFindAndModify: false })

var con = mongoose.connection
con.on("open",()=>{
    //console.log("DB connected")
})

//mongoose.Promise = global.Promise

module.exports = {
    mongoose
}