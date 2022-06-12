import '../../App.css';
import Header from "./Header/Header.js"
import Footer from "./Footer/Footer.js"
import Message from "./Message.js"

function ChatSection() {
  return (
    <div className="chatsection">
      <Header />
      <div className="chat">
        <Message data={{
          sender: "Hridyanshu",
          content: "Hi! This is Hridyanshu.",
          timeStamp: "04:17 PM",
          type: "sender"
        }} />

        <Message data={{
          sender: "Hridyanshu Kumar",
          content: "Hi! This is also Hridyanshu.",
          timeStamp: "04:18 PM",
          type: "reciever"
        }} />

        <Message data={{
          sender: "Hridyanshu",
          content: "No, this is Hridyanshu.",
          timeStamp: "04:19 PM",
          type: "sender"
        }} />

        <Message data={{
          sender: "Hridyanshu Kumar",
          content: "This is also Hridyanshu!",
          timeStamp: "04:20 PM",
          type: "reciever"
        }} />
        <Message data={{
          sender: "Hridyanshu",
          content: "Hi! This is Hridyanshu.",
          timeStamp: "04:17 PM",
          type: "sender"
        }} />

        <Message data={{
          sender: "Hridyanshu Kumar",
          content: "Hi! This is also Hridyanshu.",
          timeStamp: "04:18 PM",
          type: "reciever"
        }} />

        <Message data={{
          sender: "Hridyanshu",
          content: "No, this is Hridyanshu.",
          timeStamp: "04:19 PM",
          type: "sender"
        }} />

        <Message data={{
          sender: "Hridyanshu Kumar",
          content: "This is also Hridyanshu!",
          timeStamp: "04:20 PM",
          type: "reciever"
        }} />
        <Message data={{
          sender: "Hridyanshu",
          content: "Hi! This is Hridyanshu.",
          timeStamp: "04:17 PM",
          type: "sender"
        }} />

        <Message data={{
          sender: "Hridyanshu Kumar",
          content: "Hi! This is also Hridyanshu. I am in IIT Guwahati in my second year and I am making this chatting app which idk why looks like whatsapp ;)",
          timeStamp: "04:18 PM",
          type: "reciever"
        }} />

        <Message data={{
          sender: "Hridyanshu",
          content: "No, this is Hridyanshu.",
          timeStamp: "04:19 PM",
          type: "sender"
        }} />

        <Message data={{
          sender: "Hridyanshu Kumar",
          content: "This is also Hridyanshu!",
          timeStamp: "04:20 PM",
          type: "reciever"
        }} />
      </div>
      <Footer />
    </div>
  )
}

export default ChatSection
