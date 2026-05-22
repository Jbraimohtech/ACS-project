import React from 'react'
import BlogMainContent from '../blogComponents/BlogMainContent'
import HomeFooter from '../components/HomeFooter'
import BlogCategory from '../blogComponents/BlogCategory'
import AllCategoryBoxCard from '../blogComponents/AllCategoryBoxCard'

const Blog = () => {
  return (
    <div>
      <BlogMainContent />
      <BlogCategory />
      <AllCategoryBoxCard />
      <HomeFooter />
    </div>
  )
}

export default Blog