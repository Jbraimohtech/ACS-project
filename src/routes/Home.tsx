
import HomeContent from '../homeComponents/HomeContent'
import MiddleImages from '../homeComponents/MiddleImages'
import TheChallenge from '../homeComponents/AboutOne'
import OurVision from '../homeComponents/Mission'
import Transformation from '../homeComponents/Vision'
import OurMission from '../homeComponents/AboutOrg'
import "../homeComponents/Home.css"
import Blog from '../homeComponents/CoreValues'
import ViewAllBlog from '../homeComponents/ViewAllBlog'
import HomeFooter from '../components/HomeFooter'
import Target from '../homeComponents/Target'
import UpdateBlog from '../homeComponents/UpdateBlog'
import "../components/Navbar/Navbar.css"

const Home = () => {
  return (
    <div className='home'>
      <div className='new-home-box'>
        <div className='new-home-style-image'>
          <div className='new-home-style'>
            <HomeContent />
          </div>
        </div>
      </div>
      
      <MiddleImages />
      <TheChallenge />
      <OurVision />
      <Transformation />
      <OurMission />
      <Blog />
      <Target />
      <UpdateBlog />
      <ViewAllBlog />
      <HomeFooter />
    </div>
  )
}

export default Home