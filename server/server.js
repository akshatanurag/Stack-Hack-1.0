const express = require('express')
//copy 1
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
require('../db/connect')

var app=express();
app.use(express.json())   


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

    app.listen(3000, () => {
        //console.log("Server is up on 3000")
    })
}