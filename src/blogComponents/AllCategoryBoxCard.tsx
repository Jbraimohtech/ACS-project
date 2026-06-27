
import "./Blog.css"
import BlogCard from '../components/BlogCard';
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import fallbackBlogImage from '../assets/images/blog-img.png';
import { getBlogImage } from '../utils/blogUtils';
import LoadingBrand from '../components/LoadingBrand';

interface Article {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image?: string | null;
}

interface Props {
  activeCategory: string;
}

const AllCategoryBoxCard = ({ activeCategory }: Props) => {
  const navigate = useNavigate();
  const PAGE_SIZE = 10;
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [visibleArticles, setVisibleArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);

    try {
      const query = new URLSearchParams({
        category: activeCategory,
        page: "1",
        per_page: "100",
      });

      const res = await fetch(
        `https://ambchapcorps.org/api/blog?${query.toString()}`
      );
      const data = await res.json();
      const fetchedArticles = (Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
          ? data
          : []) as Article[];

      setAllArticles(fetchedArticles);
      setVisibleArticles(fetchedArticles.slice(0, PAGE_SIZE));
      setHasMore(fetchedArticles.length > PAGE_SIZE);
      setPage(1);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setAllArticles([]);
      setVisibleArticles([]);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [activeCategory, PAGE_SIZE]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setAllArticles([]);
      setVisibleArticles([]);
      setPage(0);
      setHasMore(true);
      void fetchArticles();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [activeCategory, fetchArticles]);

  const loadMoreArticles = () => {
    if (isLoading || !hasMore) return;

    const nextPage = page + 1;
    const nextVisibleArticles = allArticles.slice(0, nextPage * PAGE_SIZE);

    setVisibleArticles(nextVisibleArticles);
    setPage(nextPage);
    setHasMore(nextVisibleArticles.length < allArticles.length);
  };

  return (
    <div className='all-category-box-card'>
      {isLoading && visibleArticles.length === 0 ? (
        <LoadingBrand />
      ) : visibleArticles.length > 0 ? (
        <>
          {visibleArticles.map((article) => (
          <div key={article.id} className='category-clicks'>
            <BlogCard>
              <div className='blog-card-prop'>
                <img
                  src={article.image ? getBlogImage(article.image) : fallbackBlogImage}
                  alt={article.title}
                  className='blog-first-img'
                />
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
                {isLoading ? <LoadingBrand inline /> : 'Load more articles'}
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

export default AllCategoryBoxCard;