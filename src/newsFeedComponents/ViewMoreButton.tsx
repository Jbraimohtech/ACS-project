import { ChevronDown } from "lucide-react";

const ViewMoreButton = () => {
  return (
    <div className="novaViewMore">

      <button>
        View More Articles
        <ChevronDown size={16}/>
      </button>

    </div>
  );
};

export default ViewMoreButton;