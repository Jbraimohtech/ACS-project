import React from 'react'
import "./Event.css"
import EventCard from '../components/EventCard'
import RsvpViewBox from '../components/RsvpViewBox'

const Featured = () => {
  return (
    <div className='featured'>

        <div className='featured-clicked-box'>
            <div className='featured-clicked-text'>
                <p>Upcoming Events</p>
            </div>
            <div className='featured-clicked-other-text'>
                <p>Past Events</p>
            </div>
        </div>

        <p className='event-featured'>Featured Events</p>
        <div className='under-event-featured'>
            <EventCard>
                <div className='first-text-box'>
                    <div className='first-text'>
                        <p>Thur</p>
                        <h1>04</h1>
                        <p>SEP <br /> 2026</p>
                    </div>
                    <div className='featured-first-img'></div>
                </div>
                <div className='feature-details'>
                    <h2>Annual Tech Symposium 2024</h2>
                    <div className='location-icon-box'>
                        <div className='location-icon'></div>
                        <p>Las vegas convention center, las vagas, USA</p>
                    </div>
                    <p className='middle-location-icon-text'>Join industry leaders for a two-day deep dive into the future of AI, <br /> decentralized networks, and the evolution of digital ecosystems.</p>
                    <div className='location-icon-box'>
                        <div className='attending-icon'></div>
                        <p>450+ attending</p>
                    </div>
                    <RsvpViewBox />
                </div>
            </EventCard>
        </div>
    </div>
  )
}

export default Featured