import "../../../chatsection.css"
import {Avatar} from "@mui/material"
import InfoCard from "./InfoCard.js"

function HeaderLeft() {
  return (
    <div className="chatsectionHeaderLeft">
      <Avatar />
      <InfoCard data={{
        name: "Hridyanshu",
        lastSeen: "today at 04:20 PM"
      }} />
    </div>
  )
}

export default HeaderLeft
