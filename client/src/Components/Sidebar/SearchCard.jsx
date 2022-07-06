import axios from '../../axios'
export default ({ username, name, setSearchResult, setCurrentRoom, thisUser, setChattingWith }) => {

    function chat() {
        setSearchResult([])
        axios.post('/chat/new', {
            members: [username, thisUser]
        }).then((response) => {
            setCurrentRoom(response.data.roomid)
            if(response.data.members[0]===thisUser) setChattingWith(response.data.members[1])
            else setChattingWith(response.data.members[0])
        })
    }

    return (
        <div className="sidebarSearchCard" onClick={chat}>
            <div className="sidebarSearchCardUser">{username}</div>
            <div className="sidebarSearchCardName">{name}</div>
        </div>
    )
}