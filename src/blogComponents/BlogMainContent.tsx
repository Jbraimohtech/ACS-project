import React from 'react'
import AllMainContent from '../components/AllMainContent'
import "./Blog.css"
import MobileScreenNav from '../components/Navbar/MobileScreenNav'

const BlogMainContent = () => {
  return (
    <div>
        <AllMainContent> 
        <MobileScreenNav />
        <div className='event-head-text-box'>
          <div className='small-event-box'>
            <div className='small-white-icon'></div>
            <p>Blogs</p>
          </div>
        </div>
        <div  className='event-head-text'>
          <h1>
            Stay Updated with <br /> Campaign News
          </h1>
        </div>

        {/* This is for only media query and it is not expected to be on big screens */}
          <div  className='event-head-text-phone'>
            <h1>
              Andrea Luises
            </h1>
          </div>
        {/* The end of it from media query*/}
      </AllMainContent>
    </div>
  )
}

export default BlogMainContent;