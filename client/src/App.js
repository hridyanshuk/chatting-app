import './App.css';
import Sidebar from './Components/Sidebar/Sidebar.js'
import ChatSection from './Components/Chat/ChatSection.js'
import { useEffect, useState } from 'react'
import { useNavigate, Redirect, Link } from 'react-router-dom'
import Pusher from "pusher-js"
import axios from "./axios.js"
import icon from './asset/icon.png'
function App({logged, thisUser, thisName}) {
  const navigate = useNavigate()
  const [currentRoom, setCurrentRoom] = useState(0)
  const [chattingWith, setChattingWith] = useState("Select a chat")
  if(!logged) {
    return (
      <div className='start'>
        <div className='start_content'>
          <img src={icon} />
          <div className='start_title'>Chatting APP</div>
          <Link className="start_link" to='/signin'>Sign in </Link>
          <Link className="start_link" to='/signup'>Sign up </Link>
        </div>
      </div>
    )
  }
  return (
    <div className="app">
      <div className="appBody">
        <Sidebar thisUser={thisUser} setCurrentRoom={setCurrentRoom} setChattingWith={setChattingWith} />
        <ChatSection thisUser={thisUser} thisName={thisName} currentRoom ={currentRoom} chattingWith={chattingWith} />
      </div>
    </div>
  );
}

export default App;
