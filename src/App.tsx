
import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Home from './routes/Home'
import Events from './routes/Events'
import Blog from './routes/Blog'
import Resources from './routes/Resources'
import Members from './routes/Members'
import Giving from './routes/Giving'
import Login from './routes/Login'
import BlogDetails from './blogComponents/BlogDetails'
import MobileScreenNav from './components/Navbar/MobileScreenNav'
import ScrollToTop from './components/ScrollToTop'
import AboutUs from './otherFooterLinksPages/AboutUs'
import MemberProfile from './otherFooterLinksPages/MemberProfile'
import OurMissionLink from './otherFooterLinksPages/OurMissionLink'
import ContactAdmin from './otherFooterLinksPages/ContactAdmin'
import Departments from './otherFooterLinksPages/Departments'
import HelpCenter from './otherFooterLinksPages/HelpCenter'
import LeadershipStructure from './otherFooterLinksPages/LeadershipStructure'
import ReportIssue from './otherFooterLinksPages/ReportIssue'
import Reports from './otherFooterLinksPages/Reports'
import UserGuide from './otherFooterLinksPages/UserGuide'
import ViewFeaturedDetails from './EventsComponents/ViewFeaturedDetails'
import ProfilePage from './profilePageComponent/ProfilePage'
import EditProfilePage from './profileEditComponents/EditProfilePage'
import ProfileSecurityPage from './profileSecurityComponent/ProfileSecurityPage'
import BillingPaymentPage from './BillingPaymentComponents/BillingPaymentPage'
import EventContentPage from './dashboardEventComponents/EventContentPage'
import EventDetailsPage from './dashEventDetailComponents/EventDetailsPage'
import PastEventsPage from './dashEventDetailComponents/PastEventPage'
import DashboardPage from './dashboardPageComponent/DashboardPage'
import NewsFeedPage from './newsFeedComponents/NewsFeedPage'
import DashboardNewsDetails from './newsFeedComponents/DashboardNewsDetails'
import PaymentPlan from './RegisterComponents/PaymentPlan'
import RegisterWizard from './RegisterComponents/RegisterWizard'
import MemberSearch from './MemberComponents/MemberSearch'
import { getToken, getUser, isMembershipApproved } from './utils/auth'

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    const storedUser = getUser() as { NewMemberNotPaid?: unknown; status?: unknown; payment_status?: unknown } | null;
    const isApprovedMember = isMembershipApproved(storedUser);
    const pendingPayment = Boolean(storedUser?.NewMemberNotPaid) && !isApprovedMember;
    const isLoginRoute = location.pathname === '/login' || location.pathname === '/register';
    const protectedDashboardRoutes = [
      '/dashboard-page',
      '/event-content-page',
      '/event-detail-page',
      '/past-event-page',
      '/profile-page',
      '/edit-profile-page',
      '/profile-security-page',
      '/billing-payment-page',
      '/news-page',
    ];
    const isProtectedDashboardRoute = protectedDashboardRoutes.some((route) =>
      location.pathname === route || location.pathname.startsWith(`${route}/`)
    );

    if (token && pendingPayment && isProtectedDashboardRoute) {
      navigate('/payment-plan', { replace: true });
      return;
    }

    if (token && isLoginRoute) {
      navigate(isApprovedMember ? '/dashboard-page' : pendingPayment ? '/payment-plan' : '/dashboard-page', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className='container'>
      <ScrollToTop />
      {/* <Navbar /> */}
      <Routes>
        {/* Home */}
        <Route path='/' element={<Home />} />
        {/* Events */}
        <Route path='/events' element={<Events />} />
        {/* Blog */}
        <Route path='/blog' element={<Blog />} />
        {/* Resources */}
        <Route path='/resource' element={<Resources />} />
        {/* Members */}
        <Route path='/members' element={<Members />} />
        {/* Giving */}
        <Route path='/giving' element={<Giving />} />
        {/* Login */}
        <Route path='/login' element={<Login />} />
        {/* Register */}
        <Route path='/register' element={<RegisterWizard />} />
        {/* Blog Details */}
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        {/* Mobile Screen Nav */}
        <Route path='/mobile-screen-nav' element={<MobileScreenNav />} />
        {/* To Set Up Register Page */}
        {/* To Member Profile Page */}
        <Route path='/member/:id' element={<MemberProfile />} />
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
        {/* To View Featured Detail Page on Event Page */}
        <Route path='/view-featured-details/:id' element={<ViewFeaturedDetails />} />
        {/* To Payment Plan Page */}
        <Route path='/payment-plan' element={<PaymentPlan />} />
        {/* To Profile Page */}
        <Route path='/profile-page' element={<ProfilePage />} />
        {/* To Edit Profile Page */}
        <Route path='/edit-profile-page' element={<EditProfilePage />} />
        {/* To Profile Security Page */}
        <Route path='/profile-security-page' element={<ProfileSecurityPage />} />
        {/* To Billing Payment Page */}
        <Route path='/billing-payment-page' element={<BillingPaymentPage />} />
        {/* To Event Content Dashboard Page */}
        <Route path='/event-content-page' element={<EventContentPage />} />
        {/* To Event Detail Dashboard Page */}
        <Route path='/event-detail-page/:id' element={<EventDetailsPage />} />
        {/* To Past Event Page */}
        <Route path='/past-event-page' element={<PastEventsPage />} />
        {/* To  Dashboard Page */}
        <Route path='/dashboard-page' element={<DashboardPage />} />
        {/* To  News Feed Page */}
        <Route path='/news-page' element={<NewsFeedPage />} />
        {/* To Dashboard News Detail Page */}
        <Route path='/news/:id' element={<DashboardNewsDetails />} />
        {/* To  News Feed Page */}
        <Route path='/member-search' element={<MemberSearch />} />
      </Routes>
    </div>
  )
}

export default App