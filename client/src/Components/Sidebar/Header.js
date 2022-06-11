import "../../sidebar.css"
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import {Avatar, IconButton} from "@mui/material"
function Header() {
  return (
    <div className="sidebarHeader">
      <div className="sidebarHeaderLeft">
        <Avatar src=""/>
      </div>
      <div className="sidebarHeaderRight">

        <IconButton>
          <DonutLargeIcon />
        </IconButton>

        {/*<IconButton>
          <ChatIcon />
        </IconButton>*/}

        <IconButton>
          <AddIcon />
        </IconButton>

        <IconButton>
          <MoreVertIcon />
        </IconButton>

      </div>
    </div>
  )
}

export default Header
