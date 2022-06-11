import '../../sidebar.css';
import Header from "./Header.js"
import SearchBox from "./SearchBox.js"
import ChatList from "./ChatList.js"
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarNonscrollable">
        <Header />
        <SearchBox />
        {/*<hr className="sidebarChatlistDivider" />*/}
      </div>
      <ChatList />
    </div>
  )
}

export default Sidebar
