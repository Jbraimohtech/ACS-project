import React from 'react'
import HomeContent from '../homeComponents/HomeContent'
import MiddleImages from '../homeComponents/MiddleImages'
import TheChallenge from '../homeComponents/TheChallenge'
import OurVision from '../homeComponents/OurVision'
import Transformation from '../homeComponents/Transformation'
import OurMission from '../homeComponents/OurMission'
import "../homeComponents/Home.css"
import Blog from '../homeComponents/Blog'

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
    </div>
  )
}

export default Home