import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
  sender: String,
  content: String,
  timeStamp: String,
  seen: Boolean
})

export default mongoose.model('messages', messageSchema)
