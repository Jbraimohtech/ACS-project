import {
  Filter,
  ArrowUpDown,
} from "lucide-react";

const PastEventsFilters = () => {
  return (
    <div className="novaEventsFilterRow">

      <div className="novaCategoryTabs">
        <button className="novaCategoryActive">
          All Events
        </button>

        <button>Workshops</button>

        <button>Summits</button>

        <button>Webinars</button>
      </div>

      <div className="novaFilterActions">
        <button>
          <Filter size={14} />
          Filter
        </button>

        <button>
          <ArrowUpDown size={14} />
          Newest First
        </button>
      </div>

    </div>
  );
};

export default PastEventsFilters;