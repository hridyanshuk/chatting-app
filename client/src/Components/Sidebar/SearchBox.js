import "../../App.css"
import SearchIcon from '@mui/icons-material/Search';

function SearchBox() {
  return (
    <div className="sidebarSearchbox">
      <SearchIcon />
      <input placeholder="Search or Start a new chat" type="text" />
    </div>
  )
}

export default SearchBox
