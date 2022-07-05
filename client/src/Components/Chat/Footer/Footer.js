import "../../../chatsection.css"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import {IconButton} from "@mui/material"
import axios from "../../../axios.js"
import {useRef, useEffect} from "react"
import textVersion from 'textversionjs'

function Footer({ thisUser }) {

  const textBox = useRef(null)
  const sendButton = useRef(null)

  const sendMessage = async () => {
    var element = textBox.current
    const data = element.innerHTML
    // alert(data)
    // alert(textVersion(data))
    element.innerHTML = ""
    if(data != "") {
      const msg = {
        sender:thisUser,
        content:data,
        timeStamp:"now",
        room: 1
      }
      await axios.post("/messages/new", msg).then( (response) => {
        console.log("Posted")
      }).catch((err)=>console.log(err))
    }
  }

  const tabKey = (key) => {
    if(key.keyCode == 9) {
      key.preventDefault()
      // var textfield = textBox.current
      // var temp = textfield.innerHTML
      // textfield.innerHTML = temp+"&emsp;"
      // // setEndOfContenteditable(textfield)
      // // alert("tab")

    }
  }

  useEffect(() => {
    var element = sendButton.current // Send button
    element.addEventListener('click', sendMessage)
    // element.innerHTML = ""


    var textfield = textBox.current
    textfield.addEventListener('keydown', tabKey)

    return () => {
      element.removeEventListener('click', sendMessage)
      textfield.removeEventListener('keydown', tabKey)
    }
  }, [])



  return (
    <div className="chatsectionFooter">
      <div className="chatsectionAttachicon">
        <IconButton>
          <AttachFileIcon />
        </IconButton>
      </div>
      <p contentEditable="true" className = "chatMessadeDiv" ref = {textBox} />
      <div className="sendButton" ref = {sendButton}>
        <SendIcon />
      </div>
    </div>

  )
}

export default Footer
