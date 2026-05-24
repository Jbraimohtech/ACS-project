
import { Link } from 'react-router-dom'
import "./Blog.css"

const BlogCategory = () => {
  return (
    // This first div should be column
    <div className='blog-category-box'>
        {/* This second div should be row */}
        <div className='category-links'>
            <Link to='/' className='all-category-link blog-active-category-link'>
               <div className='filter'></div>
               <p>All Category</p> 
            </Link>
            <Link to='/' className='all-category-link'>
                <div></div>
                <p>Products Updates</p>
            </Link>
            <Link to='/' className='all-category-link'>
                <div></div>
                <p>Industry Insights</p>
            </Link>
            <Link to='/' className='all-category-link'>
                <div></div>
                <p>Announcements</p>
            </Link>
        </div>
        {/* This third div should be row with images */}
        <div></div>
    </div>
  )
}

export default BlogCategory