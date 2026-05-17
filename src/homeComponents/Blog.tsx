import React from 'react'

const Blog = () => {
  return (
    <div>
        <div className='blog-box'>
            <div className='blog-content-numbering'>
                <div className='number-blog-box'>
                    <div className='number-reason-item'>
                        <p>05</p>
                    </div>
                    <h3 className='number-blog-text'>
                        Blog
                    </h3>
                </div>
            </div>
            <div className='blog-content-title'>
                <h2>
                    Stay Updated with <br />
                    Campaign News
                </h2>

                <div className='beside-marks-box-button'>
                    <p>View All Blogs</p>
                </div>
            </div>

            <div className='blog-content-outline'>
                <div className='blog-content-outline-one'></div>
                <div className='blog-content-outline-two'>
                    <div className='blog-content-outline-two-row'>
                        <div className='blog-content-outline-two-row-plug'></div>
                        <div className='blog-content-outline-two-row-plug'></div>
                    </div>
                    <div className='blog-content-outline-two-row'>
                        <div className='blog-content-outline-two-row-plug'></div>
                        <div className='blog-content-outline-two-row-plug'></div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    
  )
}

export default Blog