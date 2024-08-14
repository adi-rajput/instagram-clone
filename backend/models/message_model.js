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
    message:{
        type:String,
        require:true
    }
})

export default Message = mongoose.model('Message',messageSchema)