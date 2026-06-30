
import AllMainContent from '../components/AllMainContent'
import '../aboutUsComponents/AboutUs.css'
import '../homeComponents/Home.css'
import AboutOne from '../homeComponents/AboutOne'
import OurMission from '../homeComponents/AboutOrg'
import HomeFooter from '../components/HomeFooter'
import Navbar from '../components/Navbar/Navbar'
import BeAccountedFor from '../EventsComponents/BeAccountedFor'

const AboutUs = () => {
  return (
    <div>
      <AllMainContent>
        <Navbar />
        <div className='about-us-head-text'>
          <h1>About Us</h1>
          <p style={{color: "white"}}>Discover our story, mission, and the values that guide our organization.</p>
        </div>
      </AllMainContent>

      <AboutOne />
      <OurMission />
      <BeAccountedFor />
      <HomeFooter />
    </div>
  )
}

export default AboutUs;