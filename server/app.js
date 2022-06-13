//imports
import express from 'express'
import mongoose from 'mongoose'
import Messages from "./dbMessages.js"
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
  console.log()
  const msgCollection = db.collection("messages")
  const changeStream = msgCollection.watch()

  changeStream.on('change', (change) => {
    // console.log(change)
    if(change.operationType === 'insert') {
      const messageDetails = change.fullDocument
      pusher.trigger("messages", "inserted", {
        sender: messageDetails.sender,
        content: messageDetails.content,
        timeStamp: messageDetails.timeStamp,
        type: messageDetails.type
      });
    }
    else {
      console.log("Error in triggering pusher")
    }
  })

})


// api routes

app.get('/', (req, res)=> {
  res.status(200).send('yoo')
})

app.post('/messages/new', (req, res) => {
  const dbMessage = req.body
  Messages.create(dbMessage, (err, data) => {
    if(err) {
      res.status(500).send(err)
    }
    else {
      res.status(201).send(data)
    }
  })
})

app.get('/messages/sync', (req, res) => {
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


// listen

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
