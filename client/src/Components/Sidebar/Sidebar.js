import '../../sidebar.css';
import Header from "./Header.js"
import SearchBox from "./SearchBox.js"
import ChatList from "./ChatList.js"
import { useEffect, useState } from 'react';
import axios from '../../axios';
function Sidebar({ thisUser }) {

  const [chatList, setChatList] = useState([])

  useEffect(() => {
    axios.post('/chat/list', {
      username: thisUser
    }).then((response) => {
      setChatList(response.data)
    })
  }, [chatList])

  return (
    <div className="sidebar">
      <div className="sidebarNonscrollable">
        <Header />
        <SearchBox />
        {/*<hr className="sidebarChatlistDivider" />*/}
      </div>
      <ChatList chatList = {chatList} thisUser={thisUser} />
    </div>
  )
}

export default Sidebar
