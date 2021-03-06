import "../../sidebar.css"
import {Avatar} from "@mui/material"
import ChatDivider from "./ChatDivider.js"

function ChatCard({data, setCurrentRoom, setChattingWith}) {
  return (
    <div className="sidebarChatcardContainer">
      <div className="sidebarChatcard" onClick={() => {
        setCurrentRoom(data.roomid)
        setChattingWith(data.name)
        // console.log(data.roomid)
      }}>
        <Avatar />
        <div className="sidebarChatcardInfo">
          <div className="sidebarChatcardInfoTitle">
            {data.name}
          </div>
          <div className="sidebarChatcardInfoMessage">
            {data.message}
          </div>
        </div>
      </div>
      <ChatDivider />
    </div>
  )
}

export default ChatCard
