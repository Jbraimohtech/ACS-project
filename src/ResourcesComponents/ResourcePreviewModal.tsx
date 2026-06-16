import "./ResourcePreviewModal.css";
import { X, Download, Bookmark } from "lucide-react";
import type { Resource } from "../types/Resources";

interface ResourcePreviewModalProps {
  resource: Resource;
  onClose: () => void;
}

const ResourcePreviewModal = ({
  resource,
  onClose,
}: ResourcePreviewModalProps) => {
  return (
    <div className="novaResourceOverlay">

      <div className="novaResourceModal">

        <button
          className="novaResourceClose"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <div className="novaResourceContent">

          {/* LEFT */}

          <div className="novaResourcePreview">

            <div className="novaPreviewImage">
              <img
                src="/marketing-resource.jpg"
                alt="resource"
              />
            </div>

            <div className="novaPreviewBody">

              <h2>
                {resource.title}
              </h2>

              <p>
                {resource.description}
              </p>

              <blockquote>
                "Innovation is not just about the tool,
                but the space we create around it."
                — Atelier Philosophy
              </blockquote>

            </div>

          </div>

          {/* RIGHT */}

          <div className="novaResourceSidebar">

            <h4>
              Resource Metadata
            </h4>

            <div className="novaMetaList">

              <div className="novaMetaItem">
                <span>File Type</span>
                <strong>
                  {resource.type.toUpperCase()}
                </strong>
              </div>

              <div className="novaMetaItem">
                <span>Size</span>
                <strong>1.2GB</strong>
              </div>

              <div className="novaMetaItem">
                <span>Category</span>
                <strong>Marketing</strong>
              </div>

              <div className="novaMetaItem">
                <span>Access Level</span>
                <strong className="membersOnly">
                  Members Only
                </strong>
              </div>

            </div>

            <a
              href={`https://ambchapcorps.org/storage/resources/${resource.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="novaDownloadBtn"
            >
              <Download size={16} />
              Download
            </a>

            <button className="novaLibraryBtn">
              <Bookmark size={16} />
              Save to Library
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ResourcePreviewModal;