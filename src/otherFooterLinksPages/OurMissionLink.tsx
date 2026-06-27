import AllMainContent from "../components/AllMainContent"
import HomeFooter from "../components/HomeFooter"
import Navbar from "../components/Navbar/Navbar"
import OurMission from "../homeComponents/AboutOrg"
import Mission from "../homeComponents/Mission"
import Vision from "../homeComponents/Vision"
import "./OurMissionLink.css"

const OurMissionLink = () => {
  return (
    <div>
        <AllMainContent>
          <Navbar />
          <div className='about-us-head-text'>
            <h1>Our Mission</h1>
            <div className="our-missionSmallText-box">
              <p className="our-missionSmallText">Discover the mission that drives our organization and inspires our commitment to service, leadership, and impact.</p>
            </div>
          </div>
        </AllMainContent>
        <Mission />
        <Vision />
        <OurMission />
        <HomeFooter />
    </div>
  )
}

export default OurMissionLink