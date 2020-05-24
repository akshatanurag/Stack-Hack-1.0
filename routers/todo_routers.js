const express= require('express')
const Todo=require('../models/todo.js')

var router=express.Router()

router.get("/todo",async(req,res)=>        
{
        try{
            const todo= await Todo.find()
            res.json(todo)
        }catch(err)
                {
                    console.log(err)
                    res.status(400).send("Try again")
                }
})

router.post("/todo",async(req,res)=> //yaad krre
    {  
       
        var input={task_title,label,due_date,priority}=req.body
        const todo = new Todo(input) 
          await todo.save()
         res.json(todo)

    })


    module.exports=router


   