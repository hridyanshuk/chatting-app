 import '../../App.css';
import Header from "./Header/Header.js"
import Footer from "./Footer/Footer.js"
import Message from "./Message.js"
import {useEffect, useRef, useState} from "react"
import axios from "../../axios.js"
import Pusher from 'pusher-js'
import Axios from 'axios'
import baseurl from '../../baseurl';

function ChatSection({ thisUser, thisName, currentRoom }) {
  // console.log(thisUser)
  // console.log(thisName)
  const [messages, setMessages] = useState([])
  // for fetching
  const chatRef = useRef()
  useEffect(() => {

    // console.log("Current room is "+currentRoom)
    axios.post('/messages/sync', {roomid: currentRoom}).then((response) => {
      setMessages(response.data)
    })
  }, [currentRoom])

  useEffect(() => {
    // console.log("Use effect")
    console.log(currentRoom)

    const pusher = new Pusher('7290ef44095a92522cee', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    
    channel.bind('inserted', function(newMessage) {
      console.log("new messgae", newMessage)
      if(newMessage.roomid === currentRoom)
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
      const element = chatRef.current
      element.scrollTop = element.scrollHeight
      // console.log("done brooo")
    }
  }, [messages, currentRoom])



  return (
    <div className="chatsection">
      <Header />
      <div className="chat" ref = {chatRef}>
        {messages.map((data) => {
          return (
            <Message data = {data} thisName = {thisName} thisUser = {thisUser} />
          )
        })}
      </div>
      <Footer thisUser={thisUser} thisName = {thisName} currentRoom = {currentRoom} />
    </div>
  )
}

export default ChatSection
