import { useState } from "react"
import "../../sidebar.css"
import ChatCard from "./ChatCard.js"

function ChatList({ chatList, thisUser, setCurrentRoom }) {



  const chats = chatList.map((chat) => {
    let name = chat.members[0]
    if(name===thisUser) name = chat.members[1]
    return <ChatCard data = {{
      name: name,
      roomid: chat.roomid
    }} setCurrentRoom={setCurrentRoom} />
  })

  return (
    <div className="sidebarChatlist">
      {
        chats
      }
    </div>
  )
}

export default ChatList
