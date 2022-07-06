import mongoose from "mongoose";

const roomlistSchema = new mongoose.Schema({
    roomid: {
        type: Number,
        required: true
    },
    members: {
        type:[String],
        required:true,
        validate: [arrayMinsize, "Minimum number of users is 2"]
    }
})

function arrayMinsize(val) {
    return val.length >= 2;
  }

export default mongoose.model("rooms", roomlistSchema)