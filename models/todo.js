const mongoose=require('mongoose')
const joi = require("@hapi/joi");    //new edit 

const todoSchema=new mongoose.Schema({

 //task_title ,label ,created_at_date, due_date , priority ,user_id(foreign key) ,sub_task(Array object type)

title:{
    type:String,
    required:true
},

label:{   
    type:String,
    required:false

},

created_on:{
    type:Number,
    required:true,
    default:new Date(Date.now())
},

due_on:{
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
is_completed:{      //new edit
    type: Number,
    default: 0,
    required: true
},
sub_task:[{
        title:{
            type:String,
            //required:true
        },
        
        label:{   
            type:String,
            //required:false
        
        },
        
        created_on:{
            type:Date,
            //required:true,
            default:Date.now()
        },
                         
        due_on:{
            type:Date , 
           // required:true
        },
        
        priority :{
            type:Number,
            //required:true
        },
        is_completed:{
            type: Number,
            default: 0
        },  
    }]

    
})

function validateSchema(todo) {  
    const schema = joi.object().keys({
        title: joi
        .string()
        .min(1)
        .max(50)
        .required(),
        label: joi
        .string()
        .min(1)
        .max(50)
        .required(),
        due_on: joi.number().required(),
        priority: joi.number().valid(0,1,2).required(),
        is_completed: joi.number().valid(0,1,2)
    });
    return schema.validate(todo);
  }

const Todo=mongoose.model('Todo',todoSchema)

module.exports = {
    Todo,
    validateTodo: validateSchema
}