
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
                <p>Home</p>
                <p>Members</p>
                <p>Departments</p>
                <p>Events</p>
                <p>Reports</p>
            </div>
            <div className='home-footer-col-two-row'>
                <h6>Organization</h6>
                <p>About Us</p>
                <p>Our Mission</p>
                <p>Leadership Structure</p>
            </div>
            <div className='home-footer-col-two-row'>
                <h6>Member Support</h6>
                <p>Help Center</p>
                <p>User Guide</p>
                <p>Contact Admin</p>
                <p>Report an Issue</p>
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