import "../../../chatsection.css"
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {IconButton} from "@mui/material"

function HeaderRight() {
  return (
    <div className="chatsectionHeaderRight">

      <IconButton>
        <SearchIcon />
      </IconButton>

      <IconButton>
        <MoreHorizIcon />
      </IconButton>

    </div>
  )
}

export default HeaderRight
