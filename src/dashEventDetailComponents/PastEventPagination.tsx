import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PastEventsPagination = () => {
  return (
    <div className="novaPaginationRow">

      <span>
        Showing 5 of 12 past events
      </span>

      <div className="novaPagination">

        <button>
          <ChevronLeft size={14} />
        </button>

        <button className="novaPageActive">
          1
        </button>

        <button>2</button>

        <button>3</button>

        <button>
          <ChevronRight size={14} />
        </button>

      </div>

    </div>
  );
};

export default PastEventsPagination;