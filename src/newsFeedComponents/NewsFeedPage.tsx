import {
  Bell,
  ChevronDown,
  Menu,
  Search,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import DashboardSidebar from "../profilePageComponent/DashboardSidebar";

import "./NewsFeedPage.css";

import NewsHeader from "./NewsHeader";
import NewsTabs from "./NewsTabs";
import NewsCategoryFilters from "./NewsCategoryFilters";
import NewsList from "./NewsList";
import EmptyNews from "./EmptyNews";

import { fetchBlogs } from "../services/blogService";

import type { Blog } from "../types/blog";

const NewsFeedPage = () => {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [showMobileSearch, setShowMobileSearch] =
    useState(false);

  const [blogs, setBlogs] =
    useState<Blog[]>([]);

  const [error, setError] =
    useState<string | null>(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [visibleCount, setVisibleCount] =
    useState(6);

  const [activeTab, setActiveTab] =
    useState<"all" | "myzone">(
      "all"
    );

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  /**
   * Replace this with your authenticated user
   */

  const currentUser = {
    zone_id: 2,
  };

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data =
          await fetchBlogs();

        setBlogs(data);
      } catch (error) {
        console.error(error);

        setError(
          "Failed to load news articles."
        );
      }
    };

    loadBlogs();
  }, []);

  /**
   * Dynamic categories
   */

  const categories = useMemo(() => {
    return [
      ...new Set(
        blogs
          .map(
            (blog) =>
              blog.category?.name
          )
          .filter(Boolean)
      ),
    ];
  }, [blogs]);

  /**
   * Filter by tab
   */

  const tabFilteredBlogs =
    useMemo(() => {
      switch (activeTab) {
        case "myzone":
          return blogs.filter(
            (blog) =>
              blog.zone_id ===
              currentUser.zone_id
          );

        default:
          return blogs;
      }
    }, [
      blogs,
      activeTab,
      currentUser.zone_id,
    ]);

  /**
   * Search + Category Filter
   */

  const filteredBlogs =
    useMemo(() => {
      return tabFilteredBlogs.filter(
        (blog) => {
          const matchesSearch =
            blog.title
              .toLowerCase()
              .includes(
                searchTerm.toLowerCase()
              ) ||
            blog.content
              .toLowerCase()
              .includes(
                searchTerm.toLowerCase()
              );

          const matchesCategory =
            selectedCategory ===
              "all" ||
            blog.category?.name ===
              selectedCategory;

          return (
            matchesSearch &&
            matchesCategory
          );
        }
      );
    }, [
      tabFilteredBlogs,
      searchTerm,
      selectedCategory,
    ]);

  /**
   * View More
   */

  const visibleBlogs =
    filteredBlogs.slice(
      0,
      visibleCount
    );

  const handleViewMore = () => {
    setVisibleCount(
      (prev) => prev + 6
    );
  };

  if (error)
    return (
      <div className="errorState">
        {error}
      </div>
    );

  return (
    <div className="zenProfileLayout">

      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={
          setSidebarOpen
        }
      />

      <div className="orionMainContent">

        {/* DESKTOP TOP BAR */}

        <div className="orionTopBarShell">

          <div className="orionSearchCluster">

            <Search
              size={16}
              className="orionSearchIcon"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              placeholder="Search articles..."
              className="orionSearchInput"
            />

          </div>

          <div className="orionTopBarActions">

            <button className="orionNotificationButton">
              <Bell size={18} />
              <span className="orionNotificationDot"></span>
            </button>

            <div className="orionUserProfileWidget">

              <img
                src="/profile.jpg"
                alt="User"
                className="orionUserAvatar"
              />

              <div className="orionUserMeta">
                <h4>
                  Chukwutem Emmanuel
                </h4>

                <span>
                  User ID:
                  12345434
                </span>
              </div>

              <ChevronDown size={16} />

            </div>

          </div>

        </div>

        {/* MOBILE HEADER */}

        <div className="orionTopBarShellMobile">

          <div className="orionTopBarShellMobile-left">

            <button
              className="orionMobileMenuButton"
              onClick={() =>
                setSidebarOpen(
                  true
                )
              }
            >
              <Menu size={22} />
            </button>

            <p className="dashboard-p">
              News Feed
            </p>

          </div>

          <div className="orionMobileLogo-crop">

            {!showMobileSearch ? (
              <button
                className="orionMobileSearchTrigger"
                onClick={() =>
                  setShowMobileSearch(
                    true
                  )
                }
              >
                <Search size={22} />
              </button>
            ) : (
              <div className="orionSearchCluster">

                <Search
                  size={16}
                  className="orionSearchIcon"
                />

                <input
                  autoFocus
                  value={
                    searchTerm
                  }
                  onChange={(e) =>
                    setSearchTerm(
                      e.target.value
                    )
                  }
                  placeholder="Search..."
                  className="orionSearchInput"
                />

                <button
                  className="orionMobileSearchClose"
                  onClick={() =>
                    setShowMobileSearch(
                      false
                    )
                  }
                >
                  ✕
                </button>

              </div>
            )}

          </div>

        </div>

        {/* CONTENT */}

        <div className="stellarNewsWrapper">

          <NewsHeader totalArticles={filteredBlogs.length} />

          <NewsTabs
            activeTab={
              activeTab
            }
            setActiveTab={
              setActiveTab
            }
          />

          <NewsCategoryFilters
            categories={
              categories
            }
            selectedCategory={
              selectedCategory
            }
            onChange={
              setSelectedCategory
            }
          />

          {filteredBlogs.length ===
          0 ? (
            <EmptyNews />
          ) : (
            <>
              <NewsList
                blogs={
                  visibleBlogs
                }
              />

              {visibleCount <
                filteredBlogs.length && (
                <div className="novaViewMore">

                  <button
                    onClick={
                      handleViewMore
                    }
                  >
                    View More Articles
                  </button>

                </div>
              )}
            </>
          )}

        </div>

      </div>

    </div>
  );
};

export default NewsFeedPage;