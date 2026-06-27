import {
  Play,
  Download,
  Eye,
} from "lucide-react";
import type { Resource } from "../types/Resources";

interface Props {
  resource: Resource;
  onClick?: () => void;
}

const ResourceCard = ({
  resource,
  onClick,
}: Props) => {
  return (
    <div
      className="resourceCard"
      onClick={onClick}
    >

      <div className="resourceImage">

        <img
          src={resource.download_url || (resource.file ? `https://ambchapcorps.org/storage/${resource.file}` : "/profile.jpg")}
          alt={resource.title}
          onError={(e) => {
            e.currentTarget.src = "/profile.jpg";
          }}
        />

        <button className="resourcePlay">
          <Play size={22} />
        </button>

      </div>

      <div className="resourceContent">

        <h4>{resource.title}</h4>

        <p>{resource.type.toUpperCase()}</p>

        <button className="resourceActionBtn">

          {resource.type === "pdf" ? (
            <Download size={15} />
          ) : (
            <Eye size={15} />
          )}

          {resource.type === "pdf"
            ? "Download"
            : "View"}

        </button>

      </div>

    </div>
  );
};

export default ResourceCard;