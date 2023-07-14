import mongoose from 'mongoose'
const messagesSchema=new mongoose.Schema({
    id:{
        type:String,
        required:[true,'friends id must be provided']
    },
    messages:[
        {   
            id:{type:String},
            message:{type:String},
            time:{type:Number}
        }
    ],
    time:{
        type:Number
    }
},
)
const Message=mongoose.models.Message || mongoose.model("Message",messagesSchema)    
export default Message