
import "./Blog.css"
import BlogCard from '../components/BlogCard';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Article {
  id: string | number;
  title: string;
  description: string;
  readTime?: string;
  publishedTime?: string;
}

interface Props {
  activeCategory: string;
}

const AllCategoryBoxCard = ({ activeCategory }: Props) => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `https://ambchapcorps.org/api/blog${activeCategory}`
        );
        const data = await res.json();
        setArticles(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [activeCategory]);

  return (
    <div className='all-category-box-card'>
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.id} className='category-clicks'>
            <BlogCard>
              <div className='blog-card-prop'>
                <div className='blog-first-img'></div>
                <div className='blog-feature-details'>
                  <div className='article-clock-icon-box-container'>
                    <div className='article-clock-icon-box'>
                      <div className='clock'></div>
                      <p>{article.readTime || "5 min"} read</p>
                      <span>{article.publishedTime || "Published 2 hours ago"}</span>
                    </div>
                    <h2>{article.title}</h2>
                    <div className='article-clock-icon-box'>
                      <p className='article-clock-icon-box-p'>{article.description}</p>
                    </div>
                  </div>
                  <div className='read-article-box' onClick={() => navigate("/blog-details")}>
                    <button className='read-article-btn'>Read Article</button>
                    <div className='safe-data'></div>
                    <div className='share-data'></div>
                  </div>
                </div>
              </div>
            </BlogCard>
          </div>
        ))
      ) : (
        <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
          <p>No articles found for this category.</p>
        </div>
      )}
    </div>
  )
}

export default AllCategoryBoxCard