interface Props {
  activeTab:
    | "all"
    | "myzone";

  setActiveTab: (
    tab:
      | "all"
      | "myzone"
  ) => void;
}

const NewsTabs = ({
  activeTab,
  setActiveTab,
}: Props) => {
  return (
    <div className="novaNewsTabs">

      <button
        className={
          activeTab === "all"
            ? "active"
            : ""
        }
        onClick={() =>
          setActiveTab("all")
        }
      >
        All News
      </button>

      <button
        className={
          activeTab === "myzone"
            ? "active"
            : ""
        }
        onClick={() =>
          setActiveTab(
            "myzone"
          )
        }
      >
        My Zone
      </button>

    </div>
  );
};

export default NewsTabs;