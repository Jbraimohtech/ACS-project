
import "./Event.css";
import EventCard from '../components/EventCard';
import RsvpViewBox from '../components/RsvpViewBox';

const AllUpComingEvents = () => {
  return (
    <div className='all-up-coming-events'>
        <p className='event-featured'>All Upcoming Events</p>
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
        <div className='horizontal-line'></div>
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
        <div className='horizontal-line'></div>
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
  )
}

export default AllUpComingEvents