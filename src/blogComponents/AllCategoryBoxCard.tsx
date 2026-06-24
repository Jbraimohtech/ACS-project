
import "./Blog.css"
import BlogCard from '../components/BlogCard';
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

interface Article {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

interface Props {
  activeCategory: string;
}

const AllCategoryBoxCard = ({ activeCategory }: Props) => {
  const navigate = useNavigate();
  const PAGE_SIZE = 10;
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchArticles = useCallback(async (nextPage: number, append = false) => {
    setIsLoading(true);

    try {
      const query = new URLSearchParams({
        category: activeCategory,
        page: String(nextPage),
        per_page: String(PAGE_SIZE),
      });

      const res = await fetch(
        `https://ambchapcorps.org/api/blog?${query.toString()}`
      );
      const data = await res.json();
      const fetchedArticles = Array.isArray(data.data) ? data.data : [];

      setArticles((prevArticles) =>
        append ? [...prevArticles, ...fetchedArticles] : fetchedArticles
      );
      setHasMore(fetchedArticles.length === PAGE_SIZE);
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [activeCategory, PAGE_SIZE]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setArticles([]);
      setPage(1);
      setHasMore(true);
      void fetchArticles(1, false);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [activeCategory, fetchArticles]);

  const loadMoreArticles = () => {
    if (isLoading || !hasMore) return;
    void fetchArticles(page + 1, true);
  };

  return (
    <div className='all-category-box-card'>
      {articles.length > 0 ? (
        <>
          {articles.map((article) => (
          <div key={article.id} className='category-clicks'>
            <BlogCard>
              <div className='blog-card-prop'>
                <div className='blog-first-img'></div>
                <div className='blog-feature-details'>
                  <div className='article-clock-icon-box-container'>
                    <div className='article-clock-icon-box'>
                      <div className='clock'></div>
                      <p>{article.title || "5 min"} read</p>
                      <span>
                        {new Date(article.created_at)
                          .toLocaleDateString()}
                      </span>
                    </div>
                    <h2>{article.title}</h2>
                    <div className='article-clock-icon-box'>
                      <p className='article-clock-icon-box-p'>{article.content}</p>
                    </div>
                  </div>
                  <div className='read-article-box' onClick={() =>
                    navigate(`/blog-details/${article.id}`)
                  }>
                    <button className='read-article-btn'>Read Article</button>
                    <div className='safe-data'></div>
                    <div className='share-data'></div>
                  </div>
                </div>
              </div>
            </BlogCard>
          </div>
          ))}

          {hasMore && (
            <div className='load-more-wrapper'>
              <button
                className='load-more-btn'
                onClick={loadMoreArticles}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Load more articles'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
          <p>No articles found for this category.</p>
        </div>
      )}
    </div>
  )
}

export default AllCategoryBoxCard