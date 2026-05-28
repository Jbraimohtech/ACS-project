
import MobileScreenNav from '../components/Navbar/MobileScreenNav'
import SearchBox from '../components/SearchBox'

const HomeContent = () => {
  return (
    <div className='home-content-all-main-content'>
        <MobileScreenNav />
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
            <input className='search-input' type="text" placeholder='Search for members'/>
            <div className='search-icon'></div>
        </SearchBox>
    </div>
  )
}

export default HomeContent

