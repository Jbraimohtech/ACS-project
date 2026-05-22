import React from 'react'
import "./Blog.css"
import BlogCard from '../components/BlogCard';
import { useNavigate } from "react-router-dom";

const AllCategoryBoxCard = () => {
  const navigate = useNavigate();

  return (
    <div className='all-category-box-card'>
      <button className='category-clicks' onClick={() => navigate("/blog-details")}>
        <BlogCard>
          <div className='blog-card-prop'>
            <div className='blog-first-img'></div>
            <div className='blog-feature-details'>
              <div className='article-clock-icon-box-container'>
                <div className='article-clock-icon-box'>
                    <div className='clock'></div>
                    <p>5 min read</p>
                    <span>Published 2 hours ago</span>
                </div>
                  
                <h2>The Future of Decentralized Data Management
                    in Global Enterprise</h2>
                
                <div className='article-clock-icon-box'>
                    <p className='article-clock-icon-box-p'>Exploring how the next generation of cloud infrastructure is moving towards edge
                        computing and sovereign data control protocols for high-security environments...</p>
                </div>
              </div>
              <div className='read-article-box'>
                <button className='read-article-btn' onClick={() => navigate("/blog-details")}>Read Article</button>
                <div className='safe-data'></div>
                <div className='share-data'></div>
              </div>
            </div>
          </div>
        </BlogCard>
      </button>

      <button className='category-clicks' onClick={() => navigate("/blog-details")}>
        <BlogCard>
          <div className='blog-card-prop'>
            <div className='blog-first-img'></div>
            <div className='blog-feature-details'>
              <div className='article-clock-icon-box-container'>
                <div className='article-clock-icon-box'>
                    <div className='clock'></div>
                    <p>5 min read</p>
                    <span>Published 2 hours ago</span>
                </div>
                  
                <h2>The Future of Decentralized Data Management
                    in Global Enterprise</h2>
                
                <div className='article-clock-icon-box'>
                    <p className='article-clock-icon-box-p'>Exploring how the next generation of cloud infrastructure is moving towards edge
                        computing and sovereign data control protocols for high-security environments...</p>
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
      </button>

      <button className='category-clicks' onClick={() => navigate("/blog-details")}>
        <BlogCard>
          <div className='blog-card-prop'>
            <div className='blog-first-img'></div>
            <div className='blog-feature-details'>
              <div className='article-clock-icon-box-container'>
                <div className='article-clock-icon-box'>
                    <div className='clock'></div>
                    <p>5 min read</p>
                    <span>Published 2 hours ago</span>
                </div>
                  
                <h2>The Future of Decentralized Data Management
                    in Global Enterprise</h2>
                
                <div className='article-clock-icon-box'>
                    <p className='article-clock-icon-box-p'>Exploring how the next generation of cloud infrastructure is moving towards edge
                        computing and sovereign data control protocols for high-security environments...</p>
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
      </button>

      <button className='category-clicks' onClick={() => navigate("/blog-details")}>
        <BlogCard>
          <div className='blog-card-prop'>
            <div className='blog-first-img'></div>
            <div className='blog-feature-details'>
              <div className='article-clock-icon-box-container'>
                <div className='article-clock-icon-box'>
                    <div className='clock'></div>
                    <p>5 min read</p>
                    <span>Published 2 hours ago</span>
                </div>
                  
                <h2>The Future of Decentralized Data Management
                    in Global Enterprise</h2>
                
                <div className='article-clock-icon-box'>
                    <p className='article-clock-icon-box-p'>Exploring how the next generation of cloud infrastructure is moving towards edge
                        computing and sovereign data control protocols for high-security environments...</p>
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
      </button>

      <button className='category-clicks' onClick={() => navigate("/blog-details")}>
        <BlogCard>
          <div className='blog-card-prop'>
            <div className='blog-first-img'></div>
            <div className='blog-feature-details'>
              <div className='article-clock-icon-box-container'>
                <div className='article-clock-icon-box'>
                    <div className='clock'></div>
                    <p>5 min read</p>
                    <span>Published 2 hours ago</span>
                </div>
                  
                <h2>The Future of Decentralized Data Management
                    in Global Enterprise</h2>
                
                <div className='article-clock-icon-box' >
                    <p className='article-clock-icon-box-p'>Exploring how the next generation of cloud infrastructure is moving towards edge
                        computing and sovereign data control protocols for high-security environments...</p>
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
      </button>

      <div className='view-more-articles-box'>
        <button className='view-more-articles-button'>
          <p>View More Articles</p>
          <div className='container-drop-down'></div>
        </button>
      </div>
    </div>
  )
}

export default AllCategoryBoxCard;