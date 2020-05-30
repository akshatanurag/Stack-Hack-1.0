const express = require('express')
const {
    Todo,
    validateTodo
} = require('../models/todo.js')
const middleware = require('../middlewares/middleware')

var router = express.Router()


const middlewareOrder = [middleware.isLoggedIn, middleware.isVerified]

router.get("/todo", middlewareOrder, async (req, res) => {
    try {

        const todo = await Todo.find({
            user_id: req.currentUser._id
        })
        console.log(todo)
        res.send({
            success: true,
            tasks: todo
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Opps! Something went wrong..."
        })
    }
})

router.post("/todo", middlewareOrder, async (req, res) => {
    try {
        var input = {
            title,
            label,
            due_on,
            priority,
            is_completed
        } = req.body
        const {
            error
        } = validateTodo(input) //new edit

        if (error)
            return res.status(400).send({
                success: false,
                message: error.details[0].message
            });
        input.user_id = req.currentUser._id
        const todo = new Todo(input)
        await todo.save()
        res.send({
            success: true,
            message: todo
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Opps! Something went wrong..."
        })
    }


})

//* *************Update***************** *
router.put("/todo/:id",middlewareOrder,async (req, res) => {
    try {
        let todoFind = await Todo.findOne({_id: req.params.id,user_id: req.currentUser._id})
        if(!todoFind){
            return res.status(401).send({
                success: false,
                message: "Access Denied"
            })
        }
        var input = {
            title,
            label,
            due_on,
            priority,
            is_completed
        } = req.body
        //{error} =validateTodo(input)
        const {error} = validateTodo(input) //new edit

        if (error)
            return res.status(400).send({
                success: false,
                message: error.details[0].message
            });
        var tdd = await Todo.updateOne({
            _id: req.params.id
        }, {$set:input})
        if(tdd.n&&tdd.nModified&&tdd.ok)
        return res.status(200).send({
            success: true,
            message: "Update was successful"
        })
        else
        return res.status(400).send({
            success: true,
            message: "Update Failed"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Opps! Something went wrong..."
        })
    }


})


//* **************Delete******************* *
router.delete("/todo/:id",middlewareOrder,async (req, res) => {
    try {
        let todoFind = await Todo.findOne({_id: req.params.id,user_id: req.currentUser._id})
        if(!todoFind){
            return res.status(401).send({
                success: false,
                message: "Access Denied"
            })
        }
        var id = req.params.id;
        var td = await Todo.findById(id)
        const td_del = await td.remove()
        return res.send({
            success: true,
            message: td_del})
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Opps! Something went wrong..."
        })
    }
})


module.exports = router