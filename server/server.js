const express = require('express')
const cors = require('cors')
//copy 1
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
require('../db/connect')

var app=express();
app.use(express.json())

var whitelist = ['http://localhost:4200', 'http://example2.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions)) 



//copy 2
if (cluster.isMaster) {
    //console.log(`Master ${process.pid} is running`);
    console.log("Server is Running on port 3000")
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    //code here
    var app = express();
    app.use(express.json())
    app.get("/api", (req, res) => {
        res.send({
            success: true,
            message: "Todo API v1.0"  
        })
    })

    require('./routeHandler')(app)
     var port=process.env.PORT || 3000
    app.listen(port,process.env.IP, () => {
        console.log(`"Server is up on ${port}"`) 
    })
}