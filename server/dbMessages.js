import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
  sender: {
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
  room: {
    type:Number,
    required:true
  }
})

export default mongoose.model('messages', messageSchema)
