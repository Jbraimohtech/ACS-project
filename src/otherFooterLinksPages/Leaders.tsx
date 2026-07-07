
// import MobileScreenNav from '../components/Navbar/MobileScreenNav'
import Navbar from '../components/Navbar/Navbar'
import AllMainContent from '../components/AllMainContent'
import HomeFooter from '../components/HomeFooter'
import LeadershipSection from './LeadershipSection'

const Leaders = () => {
  return (
    <div>
       <AllMainContent> 
        <Navbar />
        
        <div  className='event-head-text-our-leaders'>
          <h1>
            Our Leaders
          </h1>
        </div> 
      </AllMainContent>
      <LeadershipSection />
      <HomeFooter />
        
    </div>
  )
}

export default Leaders

