import React from 'react'
import SearchBox from '../components/SearchBox'
import AllMainContent from '../components/AllMainContent';
import "./Event.css"
import MobileScreenNav from '../components/Navbar/MobileScreenNav';

const EventContent = () => {
  return (
    <div>
      <AllMainContent> 
        <MobileScreenNav />
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

        {/* This is for only media query and it is not expected to be on big screens */}
          <div  className='event-head-text-phone'>
            <h1>
              Andrea Luises
            </h1>
          </div>
        {/* The end of it from media query*/}
        <SearchBox>
          <input type="text" placeholder='Search for members'/>
          <div className='search-icon'></div>
        </SearchBox>
      </AllMainContent>
    </div>
  )
}

export default EventContent;