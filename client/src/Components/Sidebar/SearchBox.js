import "../../sidebar.css"
import SearchIcon from '@mui/icons-material/Search';
import { useRef, useState } from "react";
import axios from '../../axios'
import SearchCard from "./SearchCard";

function SearchBox({setCurrentRoom, thisUser}) {
  const [searchResult, setSearchResult] = useState([])
  const refSearch = useRef()

  const search = () => {
    const elemSearch = refSearch.current
    const userQuery = elemSearch.value
    if(userQuery.length>=3) axios.post('/user/search', {userQuery:userQuery}).then((response) => {
      setSearchResult(response.data)
    })
    else setSearchResult([])
  }

  return (
    <div className="sidebarSearchDiv">
      <div className="sidebarSearchbox">
        <SearchIcon />
        <input ref = {refSearch} placeholder="Search or Start a new chat" type="text" onChange={search} />
      </div>
      <div className="search_results">
        {searchResult.map(user => <SearchCard
        username={user.username}
        name={user.name}
        setSearchResult={setSearchResult}
        setCurrentRoom={setCurrentRoom}
        thisUser={thisUser} />)}
      </div>
    </div>
  )
}

export default SearchBox
