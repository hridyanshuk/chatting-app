import "../../App.css"
import {Avatar} from "@mui/material"
import ChatDivider from "./ChatDivider.js"

function ChatCard(props) {
  return (
    <div className="sidebarChatcardContainer">
    <div className="sidebarChatcard">
      <Avatar />
      <div className="sidebarChatcardInfo">
        <div className="sidebarChatcardInfoTitle">
          {props.data.name}
        </div>
        <div className="sidebarChatcardInfoMessage">
          {props.data.message}
        </div>
      </div>
    </div>
    <ChatDivider />
    </div>
  )
}

export default ChatCard
