import ResourceCard from "./ResourceCard";
import { useState } from "react";
import ResourcePreviewModal from "./ResourcePreviewModal";
import type { Resource } from "../types/Resources";

interface Props {
  resources: Resource[];
}

const AllResourcesSection = ({
  resources,
}: Props) => {
    const [showPreview, setShowPreview] =
  useState(false);
  const [selectedResource, setSelectedResource] =
  useState<Resource | null>(null);

  return (
    <section className="resourcesSection">

      <div className="resourcesSectionHeader">
        <h2>All Resources</h2>
        <span className="resourceCount">{resources.length} Files</span>
      </div>

      <div className="resourceGrid">

        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onClick={() => {
              setSelectedResource(resource);
              setShowPreview(true);
            }}
          />
        ))}

      </div>

        {showPreview && selectedResource && (
          <ResourcePreviewModal
            resource={selectedResource}
            onClose={() => setShowPreview(false)}
          />
        )}

    </section>
  );
};

export default AllResourcesSection;