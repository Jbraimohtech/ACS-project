import { Link } from "react-router-dom"

const HomeFooter = () => {
  return (
    <div className='home-footer'>
        {/* footer for logo */}
        <div className='home-footer-col-one'>
            <div className='home-footer-col-one-row'>
                <h1><div className="novaLogoIcon"></div></h1>
                <h6>A unified platform built to strengthen our structure, serve our members, and advance  our mission with order and purpose.</h6>
                <p>info@ambchapcorps.org</p>
            </div>
            <div className='home-footer-col-two-row'>
                <h6>Platform Navigation</h6>
                <Link to="/" className='home-footer-col-two-row-link'>Home</Link>
                <Link to="/members" className='home-footer-col-two-row-link'>Members</Link>
                {/* <Link to="/departments" className='home-footer-col-two-row-link'>Departments</Link> */}
                <Link to="/events" className='home-footer-col-two-row-link'>Events</Link>
                <Link to="/blog" className='home-footer-col-two-row-link'>Blogs</Link>
            </div>
            <div className='home-footer-col-two-row'>
                <h6>Organization</h6>
                <Link to="/about-us" className='home-footer-col-two-row-link'>About Us</Link>
                <Link to="/our-mission" className='home-footer-col-two-row-link'>Our Mission</Link>
                <Link to="/leaders" className='home-footer-col-two-row-link'>Our Leaders</Link>
            </div>
            <div className='home-footer-col-two-row'>
                <h6>Member Support</h6>
                
                <Link to="/become-member" className='home-footer-col-two-row-link'>Become a Member</Link>
                <Link to="/contact-admin" className='home-footer-col-two-row-link'>Contact Admin</Link>
                <Link to="/report-issues" className='home-footer-col-two-row-link'>Report an Issue</Link>
            </div>
        </div>
        {/* footer for copyright */}
        <div className='home-footer-col-down'>
            <p>© Copyright 2025 | Designed & Developed By FadaWebs</p>
        </div>
    </div>
  )
}

export default HomeFooter