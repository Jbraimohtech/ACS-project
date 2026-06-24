
// import MobileScreenNav from '../components/Navbar/MobileScreenNav'
import Navbar from '../components/Navbar/Navbar'
import SearchBox from '../components/SearchBox'

const HomeContent = () => {
  return (
    <div className='home-content-all-main-content'>
        {/* <MobileScreenNav /> */}
        <div className='stay-with-home-nav'>
            <Navbar />
        </div>
        <div className='home-head-text'>
            <h1>A Platform Born From Purpose, For Our People</h1>
        </div>
        <div className='home-body-text'>
            <p>
            We exist to serve, connect, and empower our members.
            Our all-in-one platform brings our community together, 
            strengthens our mission, and ensures no one is left behind.
            </p>
        </div>
        <SearchBox>
            <input type="text" name="query" placeholder='Search for members'/>
            <button
                type="submit"
                className='search-icon-button-box'
                aria-label='Search'
            >
                <div className='search-icon' ></div>
            </button>
        </SearchBox>
    </div>
  )
}

export default HomeContent

