import React from 'react'

const HomeContent = () => {
  return (
    <div>
        <div className='home-head-text'>
            <h1>A Platform Born From <br />Purpose, For Our People</h1>
        </div>
        <div className='home-body-text'>
            <p>
            We exist to serve, connect, and empower our members. <br />
            Our all-in-one platform brings our community together, <br />
            strengthens our mission, and ensures no one is left behind.
            </p>
        </div>
        <div className='search-box'>
            <input type="text" placeholder='Search for members'/>
            <div className='search-icon'></div>
        </div>
    </div>
  )
}

export default HomeContent

