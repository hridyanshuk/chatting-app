 import '../../App.css';
import Header from "./Header/Header.js"
import Footer from "./Footer/Footer.js"
import Message from "./Message.js"
import {useEffect, useRef, useState} from "react"
import axios from "../../axios.js"
import Pusher from 'pusher-js'
import Axios from 'axios'
import baseurl from '../../baseurl';

function ChatSection({ thisUser, thisName }) {
  console.log(thisUser)
  console.log(thisName)
  const [messages, setMessages] = useState([])
  // for fetching
  const chatRef = useRef()
  useEffect(() => {

    // var msgReq = JSON.stringify({
    //   room:1
    // })

    // var config = {
    //   method: 'get',
    //   url: `${baseurl}/messages/sync`,
    //   headers: { 
    //     'Content-Type': 'application/json'
    //   },
    //   params : msgReq
    // }

    // Axios(config)
    // .then(function (response) {
    //   setMessages(response.data);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });


    axios.post('/messages/sync', {room: 1}).then((response) => {
      setMessages(response.data)
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
            <Message data = {data} thisName = {thisName} thisUser = {thisUser} />
          )
        })}
      </div>
      <Footer thisUser={thisUser} thisName = {thisName} />
    </div>
  )
}

export default ChatSection
