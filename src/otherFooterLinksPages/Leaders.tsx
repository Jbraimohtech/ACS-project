
// import MobileScreenNav from '../components/Navbar/MobileScreenNav'
import Navbar from '../components/Navbar/Navbar'
import AllMainContent from '../components/AllMainContent'
import HomeFooter from '../components/HomeFooter'
import LeadershipSection from './LeadershipSection'
import { Helmet } from 'react-helmet'

const Leaders = () => {
  return (
    <div>
      <Helmet>
        <title>Our Leaders - Ambassadors Chaplain Corps</title>
        <meta name="description" content="Meet the dedicated leaders of the Ambassadors Chaplain Corps." />
        <meta name="keywords" content="leaders, ambassadors, chaplain, corps, leadership" />
      </Helmet>
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

