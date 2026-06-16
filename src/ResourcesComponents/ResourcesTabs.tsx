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
        className={
          activeTab === "resources"
            ? "resourceTabActive"
            : ""
        }
        onClick={() =>
          setActiveTab("resources")
        }
      >
        Resources
      </button>

      <button
        onClick={() =>
          setActiveTab("downloads")
        }
      >
        My Downloads
      </button>

      <button
        onClick={() =>
          setActiveTab("recent")
        }
      >
        Recent Access
      </button>

      <button
        onClick={() =>
          setActiveTab("saved")
        }
      >
        Saved
      </button>

    </div>
  );
};

export default ResourcesTabs;