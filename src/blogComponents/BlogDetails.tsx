import AllMainContent from "../components/AllMainContent";
import HomeFooter from "../components/HomeFooter";
import "./Blog.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";


interface Article {
  id: number;
  title: string;
  content: string;
  image: string | null;
  created_at: string;

  category: {
    id: number;
    name: string;
  };

  user: {
    first_name: string;
    last_name: string;
  };

  zone: {
    id: number;
    name: string;
  };
}

function BlogDetails() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `https://ambchapcorps.org/api/blog/${id}`
        );

        const data = await response.json();

        setArticle(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
  return (
    <div className="blogLoading">
      Loading article...
    </div>
  );
}
  return (
    <div>
      
        <AllMainContent> 
        <Navbar />
        <div className='event-head-text-box'>
          <div className='blog-d-small-event-box'>
            <p>Blogs details</p>
          </div>
        </div>
        <div className='event-head-text'>
            <h1>{article?.title}</h1>
        </div>

        {/* This is for only media query and it is not expected to be on big screens */}
          <div  className='event-head-text-phone'>
            <h1>{article?.title}</h1>
          </div>
        {/* The end of it from media query*/}
      </AllMainContent>

      {/* BLOG CONTENT */}
      <section className="blog-details-content">
        <div className="blogArticleContent">
          <div
            dangerouslySetInnerHTML={{
              __html: article?.content || "",
            }}
          />
        </div>

        <img
          src={
            article?.image
              ? `https://ambchapcorps.org/storage/${article.image}`
              : "/src/assets/images/blog-detail-img-two.jpg"
          }
          alt={article?.title || "Blog"}
          className="blog-details-img-one"
          onError={(e) => {
            e.currentTarget.src = "/images/default-blog.jpg";
          }}
        />

        <div className="blog-layout">
          {/* LEFT */}
          <div className="blog-layout-left">

              <div className="blog-layout-left">

            <div className="blogArticleContent">
              {article?.content
                ?.split("\n")
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
              ))}
            </div>

          </div>
          </div>

          {/* RIGHT */}
          <div className="blog-layout-right">
            <div className="post-card">
              <h3>Popular Post</h3>

              <div className="blog-img-right-layout-box">
                <div className="blog-img-right-layout"></div>
              </div>
              <div className="blog-details-date">
                  <p className="date">
                    {article
                      ? new Date(
                          article.created_at
                        ).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : ""}
                  </p>
                  <span>
                    by {article?.user?.first_name}{" "}
                      {article?.user?.last_name}
                    </span>
              </div>
              
              <h4>
                From Traditional Banking
                to Digital Disruption.
              </h4>

              <p className="post-card-paragraph">
                Participate in a city-wide cleanup,
                followed by a community barbecue.
              </p>
              <div className="flex-blog-announce">
                <div className="flex-blog-announce-events">{article?.category?.name}</div>
                <div className="flex-blog-announce-events">Event Reports</div>
              </div>
              <div className="blog-explore-topics">
                <h3>Explore Topics</h3>
                <div className="flex-blog-announce">                                        
                  <div className="blog-explore-topics-trainings">Doctrines</div>
                  <div className="blog-explore-topics-trainings">Trainings</div>
                </div>
                <div className="flex-blog-announce">
                  <div className="blog-explore-topics-trainings">Trainings</div>
                  <div className="blog-explore-topics-trainings">Trainings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HomeFooter />

    </div>
  );
}

export default BlogDetails;