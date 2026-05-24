
// import Navbar from './components/Navbar/Navbar'
import Home from './routes/Home'
import Events from './routes/Events'
import Blog from './routes/Blog'
import Resources from './routes/Resources'
import Members from './routes/Members'
import Giving from './routes/Giving'
import Login from './routes/Login'
import Register from './routes/Register'
import { Routes, Route } from 'react-router-dom'
import BlogDetails from './blogComponents/BlogDetails'
import MobileScreenNav from './components/Navbar/MobileScreenNav'
import RegisterSetUp from './RegisterComponents/RegisterSetUp'
import CreatePassword from './RegisterComponents/CreatePassword'
import SendToEmail from './RegisterComponents/SendToEmail'
import AboutUs from './otherFooterLinksPages/AboutUs'
import OurMissionLink from './otherFooterLinksPages/OurMissionLink'
import ContactAdmin from './otherFooterLinksPages/ContactAdmin'
import Departments from './otherFooterLinksPages/Departments'
import HelpCenter from './otherFooterLinksPages/HelpCenter'
import LeadershipStructure from './otherFooterLinksPages/LeadershipStructure'
import ReportIssue from './otherFooterLinksPages/ReportIssue'
import Reports from './otherFooterLinksPages/Reports'
import UserGuide from './otherFooterLinksPages/UserGuide'

const App = () => {
  return (
    <div className='container'>
      {/* <Navbar /> */}
      <Routes>
        {/* Home */}
        <Route path='/' element={<Home />} />
        {/* Events */}
        <Route path='/events' element={<Events />} />
        {/* Blog */}
        <Route path='/blog' element={<Blog />} />
        {/* Resources */}
        <Route path='/resources' element={<Resources />} />
        {/* Members */}
        <Route path='/members' element={<Members />} />
        {/* Giving */}
        <Route path='/giving' element={<Giving />} />
        {/* Login */}
        <Route path='/login' element={<Login />} />
        {/* Register */}
        <Route path='/register' element={<Register />} />
        {/* Blog Details */}
        <Route path='/blog-details' element={<BlogDetails />} />
        {/* Mobile Screen Nav */}
        <Route path='/mobile-screen-nav' element={<MobileScreenNav />} />
        {/* To Set Up Register Page */}
        <Route path='/register-setup' element={<RegisterSetUp />} />
        {/* To Create Password Page */}
        <Route path='/register-create-password' element={<CreatePassword />} />
        {/* To Send Email Page */}
        <Route path='/register-create-email' element={<SendToEmail />} />
        {/* To About Us Page */}
        <Route path='/about-us' element={<AboutUs />} />
        {/* To Our Mission Page */}
        <Route path='/our-mission' element={<OurMissionLink />} />
        {/* To Contact Admin Page */}
        <Route path='/contact-admin' element={<ContactAdmin />} />
        {/* To Departments Page */}
        <Route path='/departments' element={<Departments />} />
        {/* To Help Center Page */}
        <Route path='/help-center' element={<HelpCenter />} />
        {/* To Leadership Structure Page */}
        <Route path='/leadership-structure' element={<LeadershipStructure />} />
        {/* To Report Issues Page */}
        <Route path='/report-issues' element={<ReportIssue />} />
        {/* To Reports Page */}
        <Route path='/reports' element={<Reports />} />
        {/* To User Guide Page */}
        <Route path='/user-guide' element={<UserGuide />} />
      </Routes>
    </div>
  )
}

export default App