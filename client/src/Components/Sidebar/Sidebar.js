import '../../sidebar.css';
import Header from "./Header.js"
import SearchBox from "./SearchBox.js"
import ChatList from "./ChatList.js"
import { useEffect, useState } from 'react';
import axios from '../../axios';
function Sidebar({ thisUser, setCurrentRoom }) {

  const [chatList, setChatList] = useState([])

  useEffect(() => {
    axios.post('/chat/list', {
      username: thisUser
    }).then((response) => {
      setChatList(response.data)
    }).catch()
  }, [chatList])

  return (
    <div className="sidebar">
      <div className="sidebarNonscrollable">
        <Header />
        <SearchBox setCurrentRoom={setCurrentRoom} thisUser={thisUser} />
        {/*<hr className="sidebarChatlistDivider" />*/}
      </div>
      <ChatList chatList = {chatList} thisUser={thisUser} setCurrentRoom = {setCurrentRoom} />
    </div>
  )
}

export default Sidebar
