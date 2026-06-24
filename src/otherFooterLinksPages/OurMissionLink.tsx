import AllMainContent from "../components/AllMainContent"
import HomeFooter from "../components/HomeFooter"
import Navbar from "../components/Navbar/Navbar"
import OurMission from "../homeComponents/AboutOrg"

const OurMissionLink = () => {
  return (
    <div>
        <AllMainContent>
          <Navbar />
          <div className='about-us-head-text'>
            <h1>Our Mission</h1>
            <p>Discover the mission that drives our organization and inspires our commitment to service, leadership, and impact.</p>
          </div>
        </AllMainContent>
        <OurMission />
        <HomeFooter />
    </div>
  )
}

export default OurMissionLink