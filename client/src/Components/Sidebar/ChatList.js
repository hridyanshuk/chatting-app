import { useState } from "react"
import "../../sidebar.css"
import ChatCard from "./ChatCard.js"

function ChatList({ chatList, thisUser }) {


  return (
    <div className="sidebarChatlist">
      {
        chatList.map((chat) => {
          let name = chat.members[0]
          if(name===thisUser) name = chat.members[1]
          return <ChatCard data = {{name: name}}/>
        })
      }
    </div>
  )
}

export default ChatList
