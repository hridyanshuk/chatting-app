import '../../App.css';
import Header from "./Header.js"
import SearchBox from "./SearchBox.js"
import ChatList from "./ChatList.js"
function Sidebar() {
  return (
    <div className="sidebar">
      <Header />
      <SearchBox />
      <ChatList />
    </div>
  )
}

export default Sidebar
