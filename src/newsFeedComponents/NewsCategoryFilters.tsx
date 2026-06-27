import { Filter } from "lucide-react";

interface Props {
  categories: string[];

  selectedCategory: string;

  onChange: (
    category: string
  ) => void;
}

const NewsCategoryFilters = ({
  // categories,
  selectedCategory,
  onChange,
}: Props) => {
  return (
    <div className="novaNewsFilters">

      <button
        className={
          selectedCategory ===
          "all"
            ? "active"
            : ""
        }
        onClick={() =>
          onChange("all")
        }
      >
        <Filter size={14}/>
        All Categories
      </button>

      {/* {categories.map(
        (category) => (
          <button
            key={category}
            className={
              selectedCategory ===
              category
                ? "active"
                : ""
            }
            onClick={() =>
              onChange(
                category
              )
            }
          >
            {category}
          </button>
        )
      )} */}

    </div>
  );
};

export default NewsCategoryFilters;