
import BlogMainContent from '../blogComponents/BlogMainContent'
import HomeFooter from '../components/HomeFooter'
import BlogCategory from '../blogComponents/BlogCategory'
import AllCategoryBoxCard from '../blogComponents/AllCategoryBoxCard'
import { useState } from 'react';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div>
      <BlogMainContent />
      <BlogCategory
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <AllCategoryBoxCard
        activeCategory={activeCategory}
      />
      <HomeFooter />
    </div>
  )
}

export default Blog