const mongoose=require('mongoose')

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
    type:Date,
    required:true,
    default:Date.now()
},

due_date:{
    type:String , 
    required:true
},

priority :{
    type:Number,
    required:true         //haaaa
},

user_id:{
    type: mongoose.Schema.Types.ObjectId,
    //required:true
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
                         //ohkayyy
        due_date:{
            type:Date , 
           // required:true
        },
        
        priority :{
            type:Number,
            //required:true
        }  
    }]

    
})

module.exports=mongoose.model('Todo',todoSchema)