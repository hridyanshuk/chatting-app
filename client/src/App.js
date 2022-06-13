import './App.css';
import Sidebar from './Components/Sidebar/Sidebar.js'
import ChatSection from './Components/Chat/ChatSection.js'
import { useEffect, useState } from 'react'
import Pusher from "pusher-js"
import axios from "./axios.js"
function App() {



  return (
    <div className="app">
      <div className="appBody">
        <Sidebar />
        <ChatSection />
      </div>
    </div>
  );
}

export default App;
