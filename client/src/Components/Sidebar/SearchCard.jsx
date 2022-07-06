import axios from '../../axios'
export default ({ username, name, setSearchResult, setCurrentRoom, thisUser }) => {

    function chat() {
        setSearchResult([])
        axios.post('/chat/new', {
            members: [username, thisUser]
        }).then((response) => {
            setCurrentRoom(response.data.roomid)
        })
    }

    return (
        <div className="sidebarSearchCard" onClick={chat}>
            <div className="sidebarSearchCardUser">{username}</div>
            <div className="sidebarSearchCardName">{name}</div>
        </div>
    )
}