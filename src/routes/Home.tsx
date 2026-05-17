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

const Home = () => {
  return (
    <div className='home'>
      <HomeContent />
      <MiddleImages />
      <TheChallenge />
      <OurVision />
      <Transformation />
      <OurMission />
      <Blog />
      <ViewAllBlog />
      <HomeFooter />
    </div>
  )
}

export default Home