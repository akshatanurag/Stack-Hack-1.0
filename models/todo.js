const mongoose=require('mongoose')
const joi = require("@hapi/joi");    //new edit 

const todoSchema=new mongoose.Schema({

 //task_title ,label ,created_at_date, due_date , priority ,user_id(foreign key) ,sub_task(Array object type)

task_title:{
    type:String,
    required:true
},

label:{   
    type:String,
    required:false

},

created_at_date:{
    type:Number,
    required:true,
    default:new Date(Date.now())
},

due_date:{
    type:Number, 
    required:true
},

priority :{
    type:Number,
    required:true         
},

user_id:{
    type: mongoose.Schema.Types.ObjectId,
    required:true
},
status:{      //new edit
    type: Number,
    default: 0,
    required: true
},
sub_task:[{
        task_title:{
            type:String,
            //required:true
        },
        
        label:{   
            type:String,
            //required:false
        
        },
        
        created_at_date:{
            type:Date,
            //required:true,
            default:Date.now()
        },
                         
        due_date:{
            type:Date , 
           // required:true
        },
        
        priority :{
            type:Number,
            //required:true
        },
        status:{
            type: Number,
            default: 0
        },  
    }]

    
})

function validateSchema(todo) {  
    const schema = joi.object().keys({
        task_title: joi
        .string()
        .min(1)
        .max(50)
        .required(),
        label: joi
        .string()
        .min(1)
        .max(50)
        .required(),
        due_date: joi.number().required(),
        priority: joi.number().valid(0,1,2).required(),
        status: joi.number().valid(0,1,2)
    });
    return schema.validate(todo);
  }

const Todo=mongoose.model('Todo',todoSchema)

module.exports = {
    Todo,
    validateTodo: validateSchema
}