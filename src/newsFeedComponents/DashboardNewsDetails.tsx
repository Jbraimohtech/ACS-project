import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Tag, UserCircle2 } from "lucide-react";
import DashboardSidebar from "../profilePageComponent/DashboardSidebar";
import LoadingBrand from "../components/LoadingBrand";
import { fetchBlogById } from "../services/blogService";
import type { Blog } from "../types/blog";
import { getBlogImage, formatDate } from "../utils/blogUtils";
import "./DashboardNewsDetails.css";

const DashboardNewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [article, setArticle] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadArticle = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBlogById(Number(id));
        setArticle(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  const readingTime = useMemo(() => {
    const words = article?.content?.split(/\s+/).filter(Boolean).length ?? 0;
    return Math.max(1, Math.ceil(words / 200));
  }, [article]);

  return (
    <div className="zenProfileLayout">
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="orionMainContent">
        <div className="dashboardNewsDetailPage">
          <div className="dashboardNewsDetailHeader">
            <button className="dashboardNewsBackButton" onClick={() => navigate("/news-page")}>
              <ArrowLeft size={18} />
              Back to news
            </button>
            <div className="dashboardNewsDetailMeta">
              <span className="dashboardNewsBadge">Dashboard News</span>
              <span>{article?.category?.name || "News"}</span>
            </div>
          </div>

          {isLoading ? (
            <div className="dashboardNewsLoader">
              <LoadingBrand />
            </div>
          ) : article ? (
            <>
              <section className="dashboardNewsHeroCard">
                <div className="dashboardNewsHeroText">
                  <p className="dashboardNewsEyebrow">Featured story</p>
                  <h1>{article.title}</h1>
                  <p className="dashboardNewsIntro">
                    {article.content?.replace(/<[^>]+>/g, "").slice(0, 220)}...
                  </p>

                  <div className="dashboardNewsAuthorRow">
                    <span>
                      <UserCircle2 size={16} />
                      {article.user?.first_name} {article.user?.last_name}
                    </span>
                    <span>
                      <CalendarDays size={16} />
                      {formatDate(article.created_at)}
                    </span>
                    <span>
                      <Tag size={16} />
                      {article.category?.name}
                    </span>
                    <span>{readingTime} min read</span>
                  </div>
                </div>

                <img
                  src={getBlogImage(article.image)}
                  alt={article.title}
                  className="dashboardNewsHeroImage"
                />
              </section>

              <section className="dashboardNewsContentGrid">
                <div className="dashboardNewsMainPanel">
                  <div
                    className="dashboardNewsContent"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </div>

                <aside className="dashboardNewsSidebarCard">
                  <h3>Story highlights</h3>
                  <p>
                    Stay informed with updates, announcements, and inspiring church stories curated for your dashboard.
                  </p>

                  <div className="dashboardNewsSidebarItem">
                    <span className="dashboardNewsSidebarLabel">Published</span>
                    <strong>{formatDate(article.created_at)}</strong>
                  </div>

                  <div className="dashboardNewsSidebarItem">
                    <span className="dashboardNewsSidebarLabel">Category</span>
                    <strong>{article.category?.name}</strong>
                  </div>

                  <div className="dashboardNewsSidebarItem">
                    <span className="dashboardNewsSidebarLabel">Author</span>
                    <strong>
                      {article.user?.first_name} {article.user?.last_name}
                    </strong>
                  </div>

                  <button className="dashboardNewsSidebarButton" onClick={() => navigate("/news-page")}>
                    Explore more news
                  </button>
                </aside>
              </section>
            </>
          ) : (
            <div className="dashboardNewsLoader">Article not found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNewsDetails;
