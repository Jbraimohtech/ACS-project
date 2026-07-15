
import HomeContent from '../homeComponents/HomeContent'
import MiddleImages from '../homeComponents/MiddleImages'
import TheChallenge from '../homeComponents/AboutOne'
import OurVision from '../homeComponents/Mission'
import Transformation from '../homeComponents/Vision'
import OurMission from '../homeComponents/AboutOrg'
import "../homeComponents/Home.css"
import Blog from '../homeComponents/CoreValues'
import HomeFooter from '../components/HomeFooter'
import Target from '../homeComponents/Target'
import UpdateBlog from '../homeComponents/UpdateBlog'
import "../components/Navbar/Navbar.css"
import LeaderCarousel from '../leaderCarouselComponents/LeaderCarousel'
import Navbar from '../components/Navbar/Navbar'
import ViewAllBlog from '../homeComponents/ViewAllBlog'
import { Helmet } from 'react-helmet'

const Home = () => {
  return (
    <div className='home'>
      <Helmet>
        <title>Home - Ambassadors Chaplain Corps</title>
        <meta name="description" content="Welcome to the Ambassadors Chaplain Corps" />
        <meta name="keywords" content="ambassadors, chaplain, corps, faith, community" />
      </Helmet>
      <div className='new-home-box'>
        <div className='new-home-style-image'>
          <div className='new-home-style'>
          <Navbar />
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
      <LeaderCarousel />
      <UpdateBlog />
      <ViewAllBlog />
      <HomeFooter />
    </div>
  )
}

export default Home