import "./Blog.css"

interface Props {
  activeCategory: string;
  setActiveCategory: (
    category: string
  ) => void;
}

const BlogCategory = ({
  activeCategory,
  setActiveCategory,
}: Props) => {

  const categories = [
    "All",
    "Products updates",
    "Industry Insights",
    "Announcements",
  ];

  return (
    <div className="blog-category-box">
      <div className="category-links">

        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setActiveCategory(category)
            }
            className={`all-category-link ${
              activeCategory === category
                ? "blog-active-category-link"
                : ""
            }`}
          >
            <p>{category}</p>
          </button>
        ))}

      </div>
    </div>
  );
};

export default BlogCategory;