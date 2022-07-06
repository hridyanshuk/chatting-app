import "../../../chatsection.css"
import {Avatar} from "@mui/material"
import InfoCard from "./InfoCard.js"

function HeaderLeft({chattingWith}) {
  return (
    <div className="chatsectionHeaderLeft">
      <Avatar />
      <InfoCard data={{
        name: chattingWith
        // lastSeen: "today at 04:20 PM"
      }} />
    </div>
  )
}

export default HeaderLeft
