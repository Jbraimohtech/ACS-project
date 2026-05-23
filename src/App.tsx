
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
      </Routes>
    </div>
  )
}

export default App