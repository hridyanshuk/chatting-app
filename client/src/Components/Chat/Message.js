import "../../chatsection.css"
import {useState} from "react"

const thisUser = "Mandalorian"
function Message(props) {
  // const messageContent = useRef();
  // const [message, setMessage] = useState({
  //   sender:props.data.sender,
  //   content:props.data.content,
  //   timeStamp:props.data.timeStamp,
  //   seen:props.data.seen
  // })

  var type = "reciever";

  if(props.data.sender !== thisUser) type = "sender"

  return (
    <div className={"messageCardContainer_"+type}>
      <div className="messageCard">
        <div className={"messageSenderName"+" senderType_"+type}>
          {props.data.sender}
        </div>
        <div className = "messageContent" dangerouslySetInnerHTML={{__html:props.data.content}}>
          {/*dangerouslySetInnerHTML={{__html:props.data.content}}*/}
          {/*props.data.content*/}
        </div>

        <div className="messageTimeStamp">
          {props.data.timeStamp}
        </div>
      </div>
    </div>
  )
}

export default Message
