
import BlogMainContent from '../blogComponents/BlogMainContent'
import HomeFooter from '../components/HomeFooter'
import BlogCategory from '../blogComponents/BlogCategory'
import AllCategoryBoxCard from '../blogComponents/AllCategoryBoxCard'
import { useState } from 'react';
import { Helmet } from 'react-helmet';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div>
      <Helmet>
        <title>Blog - Ambassadors Chaplain Corps</title>
        <meta name="description" content="Read the latest articles, insights, and updates from the Ambassadors Chaplain Corps blog." />
        <meta name="keywords" content="blog, ambassadors, chaplain, corps, articles, insights, updates" />
      </Helmet>
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