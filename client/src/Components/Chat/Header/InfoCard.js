import "../../../chatsection.css"

function InfoCard(props) {
  return (
    <div className="chatsectionHeaderInfo">
      <div className="chatsectionContact">
        {props.data.name}
      </div>
      <div className="chatsectionLastSeen">
        {props.data.lastSeen}
      </div>
    </div>
  )
}

export default InfoCard
