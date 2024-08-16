import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    receiverID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    messages:{
        type:String,
        require:true
    }
})

export const Message = mongoose.model('Message',messageSchema)