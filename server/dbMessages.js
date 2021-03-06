import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
  sender: {
    type:String,
    required:true
  },
  senderName: {
    type:String,
    required:true
  },
  content: {
    type:String,
    required:true
  },
  timeStamp: {
    type:String,
    required:true
  },
  roomid: {
    type:Number,
    required:true
  }
})

export default mongoose.model('messages', messageSchema)
