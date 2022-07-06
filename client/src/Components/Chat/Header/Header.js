import "../../../chatsection.css"
import HeaderRight from "./HeaderRight.js"
import HeaderLeft from "./HeaderLeft.js"

function Header({chattingWith}) {
  return (
    <div className="chatsectionHeader">
      <HeaderLeft chattingWith={chattingWith} />
      <HeaderRight />
    </div>
  )
}

export default Header
