import '../../App.css';
import Header from "./Header/Header.js"
import Footer from "./Footer/Footer.js"
import Message from "./Message.js"
import {useEffect, useState} from "react"
import axios from "../../axios.js"
import Pusher from 'pusher-js'
function ChatSection() {

  const [messages, setMessages] = useState([])
  // for fetching

  useEffect(() => {
    axios.get('/messages/sync').then((response) => {
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
      console.log("done brooo")
    });

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages])



  return (
    <div className="chatsection">
      <Header />
      <div className="chat">
        {messages.map((data) => {
          return (
            <Message data = {data} />
          )
        })}
      </div>
      <Footer />
    </div>
  )
}

export default ChatSection
