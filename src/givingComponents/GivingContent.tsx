
import AllMainContent from '../components/AllMainContent'
import Navbar from '../components/Navbar/Navbar'
import SearchBox from '../components/SearchBox'
import "../../src/EventsComponents/Event.css"

const GivingContent = () => {
  return (
    <div>
      <AllMainContent> 
        <Navbar />
        <div className='event-head-text-box'>
          <div className='small-event-box'>
            <div className='small-white-icon'></div>
            <p>Event</p>
          </div>
        </div>
        <div  className='event-head-text'>
          <h1>
            Gatherings That <br />
            Strengthen Our Mission
          </h1>
        </div>
        
        <SearchBox>
          <input type="text" placeholder='Search for members'/>
          <div className='search-icon'></div>
        </SearchBox>
      </AllMainContent>
    </div>
  )
}

export default GivingContent