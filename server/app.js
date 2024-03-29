//imports
import express from 'express'
import mongoose from 'mongoose'
import Messages from "./dbMessages.js"
import User from './Models/user.js'
import Room from './Models/room.js'
import dotenv from 'dotenv'
import Pusher from 'pusher'
import cors from 'cors'


// app config
const app = express()

dotenv.config()

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
  {
    appId: process.env.PUSHER_APPID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
  }
);

// middleware

app.use(express.json())
app.use(cors({}))


// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*")
//   res.setHeader("Access-Control-Allow-Header", "*")
//   next()
// })

// database stuff

// const connection_url = 
// console.log(connection_url)
mongoose.connect(process.env.CONNECTION_URL, {
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
        roomid: messageDetails.roomid
      });
    }
    else {
      console.log("Error in triggering pusher")
    }
  })

})


app.get('/', (req, res) => {
  res.status(200).send("WELCOME TO THE APP")
})

// Messages APIs

app.post('/messages/new', (req, res) => {
  const dbMessage = req.body
  // console.log(dbMessage)
  console.log("message new")
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
  // console.log(req.body)
  const dbMessage = req.body
  if(dbMessage.roomid === 0) res.status(200).send([])
  else {
    Messages.find(dbMessage, (err, data) => {
      if(err) {
        res.status(500).send(err)
      }
      else {
        res.status(200).send(data) // we are downloading data
      }
    })
  }
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
  // console.log(userData)
  
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


app.post('/user/search', (req, res) => {
  const userQuery = req.body
  // console.log(userQuery)
  User.find({
    username: {$regex: `${userQuery.userQuery}.*`}
  }, (err, data) => {
    if(err) res.status(500).send("error")
    else {
      // console.log(data)
      var senddata = []
      data.map((obj) => senddata.push({
        username: obj.username,
        name: obj.name
      }))
      // console.log(senddata)
      res.status(200).send(senddata)
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
        roomid: data.roomid,
        members:data.members
      })
      else {
        const count = await Room.countDocuments()
        const newRoom = {
          roomid: count+1,
          members: req.body.members
        }
        // console.log(room)
        // console.log(newRoom)
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
      var send =[]
      data.map((obj) => {
        send.push({
          roomid: obj.roomid,
          members: obj.members
      })})
      res.status(201).send(send)
    }
  })
})


// listen

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
