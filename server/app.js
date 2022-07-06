//imports
import express from 'express'
import mongoose from 'mongoose'
import Messages from "./dbMessages.js"
import User from './Models/user.js'
import Room from './Models/room.js'

import Pusher from 'pusher'
import cors from 'cors'

import secrets from "./secrets.js"

// app config
const app = express()
const port = process.env.PORT || 9000
// process.env.PORT || 3000 means:
// whatever is in the environment variable PORT,
// or 3000 if there's nothing there.
// If you pass 3000 hard-coded to app.listen(),
// you're always listening on port 3000,
// which might be just for you, or not,
// depending on your requirements and the requirements
// of the environment in which you're running your server.

const pusher = new Pusher(
  secrets.pusherObject
);

// middleware

app.use(express.json())
app.use(cors())


// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*")
//   res.setHeader("Access-Control-Allow-Header", "*")
//   next()
// })

// database stuff

const connection_url = `mongodb+srv://${secrets.DB_USERNAME}:${secrets.DB_PASSWORD}@cluster0.oiz2g.mongodb.net/?retryWrites=true&w=majority`
// console.log(connection_url)
mongoose.connect(connection_url, {
  // useCreateIndex: true,
  // useNewUrlParser: true,
  // useUnifiedTopology: true
  //I don't think these are requires anymore
})

const db = mongoose.connection

// console.log(db)

db.once('open', () => {
  console.log('Database connected')
  const msgCollection = db.collection("messages")
  const changeStream = msgCollection.watch()

  

  changeStream.on('change', (change) => {
    // console.log(change)
    if(change.operationType === 'insert') {
      const messageDetails = change.fullDocument
      pusher.trigger("messages", "inserted", {
        sender: messageDetails.sender,
        senderName: messageDetails.senderName,
        content: messageDetails.content,
        timeStamp: messageDetails.timeStamp,
        room: messageDetails.room
      });
    }
    else {
      console.log("Error in triggering pusher")
    }
  })

})


// Messages APIs

app.post('/messages/new', (req, res) => {
  const dbMessage = req.data
  console.log(dbMessage)
  Messages.create(dbMessage, (err, data) => {
    if(err) {
      res.status(500).send(err)
    }
    else {
      res.status(201).send(data)
    }
  })
})

app.post('/messages/sync', (req, res) => {
  console.log(req.body)
  const dbMessage = req.body
  Messages.find(dbMessage, (err, data) => {
    if(err) {
      res.status(500).send(err)
    }
    else {
      res.status(200).send(data) // we are downloading data
    }
  })
})


// Authentication APIs

app.post('/user/new', (req, res) => {
  const userData = req.body
  User.create(userData, (err) => {
    if(err) res.status(202).send("Already exists")
    else res.status(201).send("User added")
  })
})

app.post('/user/signin', (req, res) => {
  const userData = req.body
  console.log(userData)
  var user = {}
  var found=false
  User.findOne({
    "username": userData.username,
    "password": userData.password
  }, (err, data) => {
    if(err) res.status(500).send(err)
    else {
      if(data === null) res.status(202).send("Does not exist")
      else res.status(201).send({
        username: data.username,
        name: data.name
      })
    }
  })  
})


// New Chats/Rooms APIs

app.post('/chat/new', (req, res) => {
  const room = req.body
  Room.findOne({members:{
    "$all": room.members
  }}, async (err, data) => {
    if(err) res.status(500).send("Some error")
    else {
      if(data!==null) res.status(201).send({
        members:data.members
      })
      else {
        const count = await Room.countDocuments()
        const newRoom = {
          roomid: count+1,
          members: req.body.members
        }
        console.log(room)
        console.log(newRoom)
        Room.create(newRoom, (err, data) => {
          if(err) res.status(500).send("Could not insert")
          else res.status(201).send(data)
        })
      }
    }
  })
})

app.post('/chat/list', (req, res) => {
  const request = req.body;
  Room.find({
    members: {
      "$in":[request.username]
    }
  }, (err, data) => {
    if(err) res.status(500).send(err)
    else {
      var send = data.map((obj) => {
        return {
          roomid: obj.roomid,
          members: obj.members
      }})
      res.status(201).send(send)
    }
  })
})

// listen

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
