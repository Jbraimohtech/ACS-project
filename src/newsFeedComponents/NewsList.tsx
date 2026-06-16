import type { Blog } from "../types/blog";
import NewsArticleCard from "./NewsArticleCard";

interface Props {
  blogs: Blog[];
}

const NewsList = ({
  blogs,
}: Props) => {
  return (
    <div className="novaNewsList">

      {blogs.map((blog) => (
        <NewsArticleCard
          key={blog.id}
          blog={blog}
        />
      ))}

    </div>
  );
};

export default NewsList;