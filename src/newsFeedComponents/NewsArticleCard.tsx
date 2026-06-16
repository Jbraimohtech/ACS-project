import {
  Bookmark,
  Clock3,
  Share2,
} from "lucide-react";

import type { Blog } from "../types/blog";

import {
  getBlogImage,
  truncateText,
  formatDate,
} from "../../src/utils/blogUtils";

import { useNavigate } from "react-router-dom";

interface Props {
  blog: Blog;
  onSave?: (id: number) => void;
  isSaved?: boolean;
}

const NewsArticleCard = ({
  blog,
  onSave,
  isSaved,
}: Props) => {
  const navigate =
    useNavigate();

  return (
    <div className="novaNewsCard">

      <img
        src={getBlogImage(
          blog.image
        )}
        alt={blog.title}
        className="novaNewsImage"
      />

      <div className="novaNewsContent">

        <div className="novaNewsMeta">

          <span className="newsTag">
            {
              blog.category?.name
            }
          </span>

          <span>
            <Clock3 size={12} />
            {formatDate(
              blog.created_at
            )}
          </span>

        </div>

        <h2>{blog.title}</h2>

        <p>
          {truncateText(
            blog.content,
            180
          )}
        </p>

        <div className="novaNewsActions">

          <button
            className="readBtn"
            onClick={() =>
              navigate(
                `/news/${blog.id}`
              )
            }
          >
            Read Article
          </button>

          <button
            onClick={() =>
              onSave?.(blog.id)
            }
          >
            <Bookmark
              fill={
                isSaved
                  ? "currentColor"
                  : "none"
              }
            />
          </button>

          <button>
            <Share2 size={16}/>
          </button>

        </div>

      </div>

    </div>
  );
};

export default NewsArticleCard;