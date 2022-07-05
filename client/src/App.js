import './App.css';
import Sidebar from './Components/Sidebar/Sidebar.js'
import ChatSection from './Components/Chat/ChatSection.js'
import { useEffect, useState } from 'react'
import { useNavigate, Redirect, Link } from 'react-router-dom'
import Pusher from "pusher-js"
import axios from "./axios.js"
import icon from './asset/icon.png'
function App({logged, user}) {
  const navigate = useNavigate()
  // useEffect( async () => {
  //   if(!logged) {
  //     await navigate('/signin')
  //   }
  // }, [])
  // console.log("user is "+user)
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
        <Sidebar />
        <ChatSection thisUser={user} />
      </div>
    </div>
  );
}

export default App;
