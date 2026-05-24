
import AllMainContent from '../components/AllMainContent'
import "../../src/EventsComponents/Event.css"
import MobileScreenNav from '../components/Navbar/MobileScreenNav'
import "../aboutUsComponents/AboutUs.css"
import AboutContent from '../aboutUsComponents/AboutContent'
import HomeFooter from '../components/HomeFooter'

const AboutUs = () => {
  return (
    <div>
      <AllMainContent> 
        <MobileScreenNav />
        <div  className='about-us-head-text'>
          <h1>
            Andrea Luises
          </h1>
        </div>
      </AllMainContent>
      <AboutContent />
      <HomeFooter />
    </div>
  )
}

export default AboutUs;