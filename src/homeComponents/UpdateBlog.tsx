import { useNavigate } from 'react-router-dom';
import YellowBtn from '../components/BlueBtn'
import { useEffect, useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';

interface Article {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image: string | null;
}

// Helper function to safely format date
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateString || "";
  }
};

const UpdateBlog = () => {
    const [article, setArticle] = useState<Article | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const navigate = useNavigate();
    const blogImageUrl = article?.image
        ? `https://ambchapcorps.org/storage/${article.image}`
        : "";

    const goToViewBlog = () => {
        navigate("/blog")
    }

    const goToRandomBlog = () => {
        if (!articles.length) {
            navigate("/blog");
            return;
        }

        const randomArticle = articles[Math.floor(Math.random() * articles.length)];
        if (randomArticle?.id) {
            navigate(`/blog-details/${randomArticle.id}`);
        } else {
            navigate("/blog");
        }
    }

    useEffect(() => {
    
        const fetchArticle = async () => {
          try {
            const response = await fetch(
              `https://ambchapcorps.org/api/blog`
            );
    
            const data = await response.json();
            const blogList = data?.data && Array.isArray(data.data) ? data.data : [];

            if (blogList.length > 0) {
              setArticles(blogList);
              setArticle(blogList[0]);
            } else if (data?.data && !Array.isArray(data.data)) {
              const singleArticle = data.data as Article;
              setArticles([singleArticle]);
              setArticle(singleArticle);
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchArticle();
      }, []);


  return (
    <div>
        <div className='blog-box'>
            <div className='blog-content-numbering'>
                <div className='number-blog-box'>
                    <div className='number-reason-item'>
                        <p>07</p>
                    </div>
                    <h3 className='number-blog-text'>
                        Blog
                    </h3>
                </div>
            </div>
            <div className='blog-content-title'>
                <h2>
                    Stay Updated with
                    Campaign News
                </h2>
                <YellowBtn>
                    <button className='view-all-btn-expand' onClick={goToViewBlog}>View All Blogs</button>
                </YellowBtn>
            </div>

            <div className='blog-content-outline'>
                <div className='blog-content-outline-one' onClick={goToRandomBlog} role="button" tabIndex={0} onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        goToRandomBlog();
                    }
                }}>
                    <ScrollReveal>
                        <img
                            src={blogImageUrl}
                            alt={article?.title || "Blog"}
                            className="blog-img-one"
                        />
                    </ScrollReveal>
                    <div className='blog-img-one-letter'>
                        <h4>
                            {article?.title}
                        </h4>

                        <p>
                            Every member, volunteer, and contribution counts. And with this platform, we ensure every effort is recognized, every voice is heard, and every life is touched.
                        </p>
                        <div className='clock-box'>
                            <div className='clock'></div>
                            <p>{formatDate(article?.created_at)}</p>
                        </div>
                        
                    </div>
                </div>
                <div className='blog-content-outline-two'>
                    <div className='blog-content-outline-two-row'>
                        <div className='blog-content-outline-grid' onClick={goToRandomBlog} role="button" tabIndex={0} onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                goToRandomBlog();
                            }
                        }}>
                            <div className='blog-two'></div>
                            <div className='blog-img-one-letter-repeat '>
                                <h4>
                                    {article?.title}
                                </h4>
                                <div className='clock-box'>
                                    <div className='clock'></div>
                                    <p>{formatDate(article?.created_at)}</p>
                                </div>
                                
                            </div>
                        </div>
                        <div className='blog-content-outline-grid' onClick={goToRandomBlog} role="button" tabIndex={0} onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                goToRandomBlog();
                            }
                        }}>
                            <div
                                className='blog-two'
                                style={blogImageUrl ? { backgroundImage: `url(${blogImageUrl})` } : undefined}
                            ></div>
                            <div className='blog-img-one-letter-repeat '>
                                <h4>
                                    {article?.title}
                                </h4>
                                <div className='clock-box'>
                                    <div className='clock'></div>
                                    <p>{formatDate(article?.created_at)}</p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className='blog-content-outline-two-row'>
                        <div className='blog-content-outline-grid' onClick={goToRandomBlog} role="button" tabIndex={0} onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                goToRandomBlog();
                            }
                        }}>
                            <div
                                className='blog-two'
                                style={blogImageUrl ? { backgroundImage: `url(${blogImageUrl})` } : undefined}
                            ></div>
                            <div className='blog-img-one-letter-repeat '>
                                <h4>
                                    {article?.title}
                                </h4>
                                <div className='clock-box'>
                                    <div className='clock'></div>
                                    <p>{formatDate(article?.created_at)}</p>
                                </div>
                                
                            </div>
                        </div>
                        <div className='blog-content-outline-grid' onClick={goToRandomBlog} role="button" tabIndex={0} onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                goToRandomBlog();
                            }
                        }}>
                            <div
                                className='blog-three'
                                style={blogImageUrl ? { backgroundImage: `url(${blogImageUrl})` } : undefined}
                            ></div>
                            <div className='blog-img-one-letter-repeat '>
                                <h4>
                                    {article?.title}
                                </h4>
                                <div className='clock-box'>
                                    <div className='clock'></div>
                                    <p>{formatDate(article?.created_at)}</p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default UpdateBlog;