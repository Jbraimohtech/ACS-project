import "./EventSpeakersCard.css"


const EventSpeakersCard = () => {
  return (
    <div className="orionSpeakersCard">
      <h3 className="orionSpeakersTitle">
        Featured Speakers
      </h3>

      <div className="orionSpeakerItem">
        <img
          src="/speaker1.jpg"
          alt=""
          className="orionSpeakerAvatar"
        />

        <div>
          <h4>Dr. Sarah Jenkins</h4>
          <p>Chief AI Officer, Zenith Labs</p>
        </div>
      </div>

      <div className="orionSpeakerItem">
        <img
          src="/speaker2.jpg"
          alt=""
          className="orionSpeakerAvatar"
        />

        <div>
          <h4>Marcus Chen</h4>
          <p>Founder, Decentralize.io</p>
        </div>
      </div>

      <div className="orionSpeakerItem">
        <img
          src="/speaker3.jpg"
          alt=""
          className="orionSpeakerAvatar"
        />

        <div>
          <h4>Elena Rodriguez</h4>
          <p>Lead Dev, Neural Protocols</p>
        </div>
      </div>

      <button className="orionViewAllSpeakers">
        View All 24 Speakers
      </button>
    </div>
  )
}

export default EventSpeakersCard