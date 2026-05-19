import React from 'react'
import HomeContent from '../homeComponents/HomeContent'
import MiddleImages from '../homeComponents/MiddleImages'
import TheChallenge from '../homeComponents/TheChallenge'
import OurVision from '../homeComponents/OurVision'
import Transformation from '../homeComponents/Transformation'
import OurMission from '../homeComponents/OurMission'
import "../homeComponents/Home.css"
import Blog from '../homeComponents/Blog'
import ViewAllBlog from '../homeComponents/ViewAllBlog'
import HomeFooter from '../homeComponents/HomeFooter'
import Navbar from '../components/Navbar/Navbar'
import Target from '../homeComponents/Target'
import UpdateBlog from '../homeComponents/UpdateBlog'

const Home = () => {
  return (
    <div className='home'>
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
      <UpdateBlog />
      <ViewAllBlog />
      <HomeFooter />
    </div>
  )
}

export default Home