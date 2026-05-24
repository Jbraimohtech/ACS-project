import { Link } from "react-router-dom"

const HomeFooter = () => {
  return (
    <div className='home-footer'>
        {/* footer for logo */}
        <div className='home-footer-col-one'>
            <div className='home-footer-col-one-row'>
                <h1>LOGO</h1>
                <h6>A unified platform built to strengthen our structure, serve our members, and advance  our mission with order and purpose.</h6>
                <p>admin@platform.org</p>
            </div>
            <div className='home-footer-col-two-row'>
                <h6>Platform Navigation</h6>
                <Link to="/" className='home-footer-col-two-row-link'>Home</Link>
                <Link to="/members" className='home-footer-col-two-row-link'>Members</Link>
                <Link to="/departments" className='home-footer-col-two-row-link'>Departments</Link>
                <Link to="/events" className='home-footer-col-two-row-link'>Events</Link>
                <Link to="/reports" className='home-footer-col-two-row-link'>Reports</Link>
            </div>
            <div className='home-footer-col-two-row'>
                <h6>Organization</h6>
                <Link to="/about-us" className='home-footer-col-two-row-link'>About Us</Link>
                <Link to="/our-mission" className='home-footer-col-two-row-link'>Our Mission</Link>
                <Link to="/leadership-structure" className='home-footer-col-two-row-link'>Leadership Structure</Link>
            </div>
            <div className='home-footer-col-two-row'>
                <h6>Member Support</h6>
                <Link to="/help-center" className='home-footer-col-two-row-link'>Help Center</Link>
                <Link to="/user-guide" className='home-footer-col-two-row-link'>User Guide</Link>
                <Link to="/contact-admin" className='home-footer-col-two-row-link'>Contact Admin</Link>
                <Link to="/report-issues" className='home-footer-col-two-row-link'>Report an Issue</Link>
            </div>
        </div>
        {/* footer for copyright */}
        <div className='home-footer-col-down'>
            <p>© Copyright 2025 | Design & Developed By Onixtheme - License | Powered By Webflow</p>
        </div>
    </div>
  )
}

export default HomeFooter