import AllMainContent from "../components/AllMainContent";
import HomeFooter from "../components/HomeFooter";
import "./Blog.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import LoadingBrand from "../components/LoadingBrand";
import { Helmet } from "react-helmet";


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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://ambchapcorps.org/api/blog/${id}`
        );

        const data = await response.json();

        setArticle(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);
  return (
    <div>
      <Helmet>
        <title>{article?.title || "Blog Details"} - Ambassadors Chaplain Corps</title>
        <meta name="description" content={article?.content || "Read the latest articles, insights, and updates from the Ambassadors Chaplain Corps blog."} />
        <meta name="keywords" content="blog, ambassadors, chaplain, corps, articles, insights, updates" />
      </Helmet>
      
        <AllMainContent> 
          <div className="inside-all-main-content">
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
          <div  className='event-blog-head-text-phone'>
            <h1>{article?.title}</h1>
          </div>
        {/* The end of it from media query*/}
        </div>
      </AllMainContent>

      {isLoading ? (
        <div className="blog-details-content">
          <LoadingBrand />
        </div>
      ) : (
      <section className="blog-details-content">
        <div className="blogArticleContent">
          <div
            dangerouslySetInnerHTML={{
              __html: article?.content || "",
            }}
          />
        </div>

        {article?.image ? (
          <img
            src={`https://ambchapcorps.org/storage/${article.image}`}
            alt={article?.title || "Blog"}
            className="blog-details-img-one"
          />
        ) : null}

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
              
              {/* <h4>
                From Traditional Banking
                to Digital Disruption.
              </h4> */}

              {/* <p className="post-card-paragraph">
                Participate in a city-wide cleanup,
                followed by a community barbecue.
              </p>
              <div className="flex-blog-announce">
                <div className="flex-blog-announce-events">{article?.category?.name}</div>
                <div className="flex-blog-announce-events">Event Reports</div>
              </div> */}
              {/* <div className="blog-explore-topics">
                <h3>Explore Topics</h3>
                <div className="flex-blog-announce">                                        
                  <div className="blog-explore-topics-trainings">Doctrines</div>
                  <div className="blog-explore-topics-trainings">Trainings</div>
                </div>
                <div className="flex-blog-announce">
                  <div className="blog-explore-topics-trainings">Trainings</div>
                  <div className="blog-explore-topics-trainings">Trainings</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      )}
      <HomeFooter />

    </div>
  );
}

export default BlogDetails;