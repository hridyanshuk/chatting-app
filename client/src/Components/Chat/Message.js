import "../../chatsection.css"

function Message(props) {
  return (
    <div className={"messageCardContainer_"+props.data.type}>
      <div className="messageCard">
        <div className={"messageSenderName"+" senderType_"+props.data.type}>
          {props.data.sender}
        </div>
        <p className = "messageContent">
          {props.data.content}
        </p>
        <div className="messageTimeStamp">
          {props.data.timeStamp}
        </div>
      </div>
    </div>
  )
}

export default Message
