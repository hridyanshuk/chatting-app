import "../../../chatsection.css"
import HeaderRight from "./HeaderRight.js"
import HeaderLeft from "./HeaderLeft.js"

function Header() {
  return (
    <div className="chatsectionHeader">
      <HeaderLeft />
      <HeaderRight />
    </div>
  )
}

export default Header
