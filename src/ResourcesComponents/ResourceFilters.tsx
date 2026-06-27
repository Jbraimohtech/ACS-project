import { Filter } from "lucide-react";

interface Props {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const ResourceFilters = ({
  activeFilter,
  setActiveFilter,
}: Props) => {
  return (
    <div className="resourceFilters">

      <button
        className={
          activeFilter === "all"
            ? "resourceFilterActive"
            : ""
        }
        onClick={() =>
          setActiveFilter("all")
        }
      >
        <Filter size={14} />
        All Categories
      </button>

      {/* <button
        onClick={() =>
          setActiveFilter("pdf")
        }
      >
        Pdf
      </button>

      <button
        onClick={() =>
          setActiveFilter("video")
        }
      >
        Video
      </button>

      <button
        onClick={() =>
          setActiveFilter("audio")
        }
      >
        Audio
      </button> */}

    </div>
  );
};

export default ResourceFilters;