import "../../../chatsection.css"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import {IconButton} from "@mui/material"
function Footer() {
  return (
    <div className="chatsectionFooter">
      <div className="chatsectionAttachicon">
        <AttachFileIcon />
      </div>
      <div contenteditable="true" className = "chatMessadeDiv" />
      <div className="sendButton">
        <SendIcon />
      </div>
    </div>

  )
}

export default Footer
