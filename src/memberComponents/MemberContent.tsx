import React from 'react'
import AllMainContent from '../components/AllMainContent'
import SearchBox from '../components/SearchBox'
import "../../src/EventsComponents/Event.css"
import MobileScreenNav from '../components/Navbar/MobileScreenNav'
import MemberProfiles from './memberProfiles'
import HomeFooter from '../components/HomeFooter'

const MemberContent = () => {
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
        
        <SearchBox>
          <input type="text" placeholder='Search for members'/>
          <div className='search-icon'></div>
        </SearchBox>
      </AllMainContent>
      <MemberProfiles />
      <HomeFooter />
    </div>
  )
}

export default MemberContent;