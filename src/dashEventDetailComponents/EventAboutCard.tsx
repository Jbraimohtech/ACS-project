import "./EventAboutCard.css"

const EventAboutCard = () => {
  return (
    <div className="nebulaAboutCard">
      <h2>About the Event</h2>

      <p>
        The Annual Tech Symposium 2024 brings together the world's leading
        minds in artificial intelligence and decentralized networks. This year's
        focus, "The Synergy of Autonomy," explores how AI agents are
        transforming the landscape of distributed ledger technologies.
      </p>

      <p>
        The Annual Tech Symposium 2024 brings together the world's leading
        minds in artificial intelligence and decentralized networks. This year's
        focus, "The Synergy of Autonomy," explores how AI agents are
        transforming the landscape of distributed ledger technologies.
      </p>

      <div className="feature-grid">
              <div className="feature-item">
                <div className="ai-workshop-icon"></div>
                <span>
                  12+ AI Workshops
                </span>
              </div>

              <div className="feature-item">
                <div className="global-networking-icon"></div>
                <span>
                  Global Networking
                </span>
              </div>

              <div className="feature-item">
                <div className="rocket-icon"></div>
                <span>
                  Startup Pitches
                </span>
              </div>
            </div>
    </div>
  )
}

export default EventAboutCard