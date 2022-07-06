import "../../chatsection.css"
import {useState} from "react"

// const thisUser = "Mandalorian"
function Message({data, thisUser}) {
  // const messageContent = useRef();
  // const [message, setMessage] = useState({
  //   sender:props.data.sender,
  //   content:props.data.content,
  //   timeStamp:props.data.timeStamp,
  //   seen:props.data.seen
  // })

  var type = "reciever";

  if(data.sender !== thisUser) type = "sender"
  console.log(data)
  return (
    <div className={"messageCardContainer_"+type}>
      <div className="messageCard">
        <div className={"messageSenderName"+" senderType_"+type}>
          {data.senderName}
        </div>
        <div className = "messageContent" dangerouslySetInnerHTML={{__html:data.content}}>
          {/*dangerouslySetInnerHTML={{__html:props.data.content}}*/}
          {/*props.data.content*/}
        </div>

        <div className="messageTimeStamp">
          {data.timeStamp}
        </div>
      </div>
    </div>
  )
}

export default Message
