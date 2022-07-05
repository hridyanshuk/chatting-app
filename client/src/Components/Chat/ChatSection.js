 import '../../App.css';
import Header from "./Header/Header.js"
import Footer from "./Footer/Footer.js"
import Message from "./Message.js"
import {useEffect, useRef, useState} from "react"
import axios from "../../axios.js"
import Pusher from 'pusher-js'
function ChatSection({ thisUser }) {

  const [messages, setMessages] = useState([])
  // for fetching
  const chatRef = useRef()
  useEffect(() => {
    axios.get('/messages/sync', {roomID: 1}).then((response) => {
      setMessages(response.data);
    })
  }, [])

  useEffect(() => {
    // console.log("Use effect")

    const pusher = new Pusher('7290ef44095a92522cee', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      setMessages([...messages, newMessage])
      
    });

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
      const element = chatRef.current
      element.scrollTop = element.scrollHeight
      // console.log("done brooo")
    }
  }, [messages])



  return (
    <div className="chatsection">
      <Header />
      <div className="chat" ref = {chatRef}>
        {messages.map((data) => {
          return (
            <Message data = {data} thisUser = {thisUser} />
          )
        })}
      </div>
      <Footer thisUser={thisUser} />
    </div>
  )
}

export default ChatSection
