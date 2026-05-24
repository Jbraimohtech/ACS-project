
import AllMainContent from '../components/AllMainContent'
import SearchBox from '../components/SearchBox'
import "../../src/EventsComponents/Event.css"
import MobileScreenNav from '../components/Navbar/MobileScreenNav'
import MemberProfiles from './MemberProfiles'
import HomeFooter from '../components/HomeFooter'
import { FaChevronDown } from 'react-icons/fa'

const MemberContent = () => {
  return (
    <div>
      <AllMainContent> 
        <MobileScreenNav />
        <div  className='member-head-text'>
          <h1>
            Our Members
          </h1>
        </div>
        
        <SearchBox>
          <div className='search-filter-box'>
            <p>Filter</p>
            <button>
              <FaChevronDown />
            </button>
          </div>
          <input type="text" placeholder='Search by name, ID, role, or unit'/>
          <div className='search-icon'></div>
        </SearchBox>
      </AllMainContent>
      <MemberProfiles />
      <HomeFooter />
    </div>
  )
}

export default MemberContent;