//imports
import express from 'express'
import mongoose from 'mongoose'
import "secrets.js"

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

// middleware

const connection_url = 'mongodb+srv://'+DB_USERNAME+':'+DB_PASSWORD+'@cluster0.oiz2g.mongodb.net/?retryWrites=true&w=majority'
// database stuff
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// api routes

app.get('/', (req, res)=> {
  res.status(200).send('yoo')
})



// listen

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
