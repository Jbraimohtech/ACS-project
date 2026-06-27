interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ResourcesTabs = ({
  activeTab,
  setActiveTab,
}: Props) => {
  return (
    <div className="resourceTabs">
      <button
        className={activeTab === "resources" ? "resourceTabActive" : ""}
        onClick={() => setActiveTab("resources")}
      >
        Resources
      </button>
    </div>
  );
};

export default ResourcesTabs;