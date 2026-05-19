import React from 'react'
import MemberBox from '../components/Navbar/MemberBox'


const Blog = () => {
  return (
    <div className='core-values-box'>
      <div className='about-org-con'>
        <div className='about-content-box'>
          <div className='content-numbering-mission'>
            <div className='number-reason-box'>
              <div className='number-reason-item'>
                <p>05</p>
              </div>
              <h3 className='core-reason-text'>Core Values</h3>
            </div>
          </div>
        </div>

        <div className='say-no-box'>
            <h1 className='say-no-box-caps'>Every feature was created to solve a real challenge in our daily operations:</h1>
        </div>
        <MemberBox>
            <div className='member-icon'></div>
            <h2 className='member-management-box-caps'>Integrity</h2>
            <p className='member-management-box-letters'>Upholding ethical principles and accountability in all our endeavors.</p>
        </MemberBox>
        
        <MemberBox>
            <div className='member-icon'></div>
            <h2 className='member-management-box-caps'>Integrity</h2>
            <p className='member-management-box-letters'>Upholding ethical principles and accountability in all our endeavors.</p>
        </MemberBox>
      </div>

      <div className='about-org-con'>
        <MemberBox>
            <div className='member-icon'></div>
            <h2 className='member-management-box-caps'>Integrity</h2>
            <p className='member-management-box-letters'>Upholding ethical principles and accountability in all our endeavors.</p>
        </MemberBox>
        <MemberBox>
            <div className='member-icon'></div>
            <h2 className='member-management-box-caps'>Integrity</h2>
            <p className='member-management-box-letters'>Upholding ethical principles and accountability in all our endeavors.</p>
        </MemberBox>
        <MemberBox>
            <div className='member-icon'></div>
            <h2 className='member-management-box-caps'>Integrity</h2>
            <p className='member-management-box-letters'>Upholding ethical principles and accountability in all our endeavors.</p>
        </MemberBox>
      </div>
    </div>
  )
}

export default Blog