import "../../chatsection.css"

function InfoCard(props) {
  var lastSeen="";
  return (
    <div className="chatsectionHeaderInfo">
      <div className="chatsectionContact">
        {props.data.name}
      </div>
      <div className="chatsectionLastSeen">
        last seen today at {lastSeen}
      </div>
    </div>
  )
}

export default InfoCard
