import "../../App.css"
import ChatCard from "./ChatCard.js"
import ChatDivider from "./ChatDivider.js"

function ChatList() {
  return (
    <div ClassName="chatlist">
      <hr style={{border:"none", background:"lightgrey", height:"0.5px"}} />
      <ChatCard data={{
        name:"Hridyanshu",
        message:"I am making whats..."
      }}/>
      <ChatCard data={{
        name:"Mukesh",
        message:"I am making insta..."
      }}/>
      <ChatCard data={{
        name:"Shobhit",
        message:"I am making snaps..."
      }}/>
      <ChatCard data={{
        name:"Ripudaman",
        message:"I am making colle..."
      }}/>
      <ChatCard data={{
        name:"Jeteish",
        message:"I am making googl..."
      }}/>
    </div>
  )
}

export default ChatList
