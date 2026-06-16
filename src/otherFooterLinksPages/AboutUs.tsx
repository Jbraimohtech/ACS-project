
import AllMainContent from '../components/AllMainContent'
import "../../src/EventsComponents/Event.css"
import "../aboutUsComponents/AboutUs.css"
import AboutContent from '../aboutUsComponents/AboutContent'
import HomeFooter from '../components/HomeFooter'
import Navbar from '../components/Navbar/Navbar'

const AboutUs = () => {
  return (
    <div>
      <AllMainContent> 
        <Navbar />
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