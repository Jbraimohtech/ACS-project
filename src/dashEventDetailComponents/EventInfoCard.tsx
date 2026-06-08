import "./EventInfoCard.css"

const EventInfoCard = () => {
  return (
    <div className="galaxyInfoCard">
      <h3 className="galaxyInfoTitle">
        Essential Info
      </h3>

      <div className="galaxyInfoRow">
        <span>Dress Code</span>
        <strong>Business Casual</strong>
      </div>

      <div className="galaxyInfoRow">
        <span>Wifi</span>
        <strong>TS2024_Guest</strong>
      </div>

      <div className="galaxyInfoRow">
        <span>Lanyards</span>
        <strong>Front Desk Pickup</strong>
      </div>
    </div>
  )
}

export default EventInfoCard