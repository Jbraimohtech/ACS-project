import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/mobile-screen-nav")
  }
  return (
    <nav className='navbar'>
        {/* Navbar content */}
        {/* <img src='' alt='' className='logo' />  */} {/* The logo image is not active at the moment */}
        <h1 className='logo'>LOGO</h1>
        <div className='nav-links'>
          <Link to='/' className='menu-link'>Home</Link>
          <Link to='/events' className='menu-link'>Events</Link>
          <Link to='/blog' className='menu-link'>Blog</Link>
          <Link to='/resources' className='menu-link'>Resources</Link>
          <Link to='/members' className='menu-link'>Members</Link>
          <Link to='/giving' className='menu-link'>Giving</Link>
        </div>

        <div className='access-box'>
            <Link to='/login' className='login-btn'>Login</Link>
            <Link to='/register' className='signup-btn'>Register</Link>
        </div>

        <button className='base-line-menu-btn' onClick={handleClick}>
          
        </button>
    </nav>
  )
}

export default Navbar