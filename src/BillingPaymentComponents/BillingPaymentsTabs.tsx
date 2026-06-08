interface BillingPaymentsTabsProps {
  activeTab: "membership" | "donations" | "payment-methods";
  setActiveTab: React.Dispatch<
    React.SetStateAction<
      "membership" | "donations" | "payment-methods"
    >
  >;
}


const BillingPaymentsTabs = ({
  activeTab,
  setActiveTab,
}: BillingPaymentsTabsProps) => {

  return (
    <div className="stellarTabs">

      <button
        className={
          activeTab === "membership"
            ? "stellarTabActive"
            : ""
        }
        onClick={() =>
          setActiveTab("membership")
        }
      >
        Membership
      </button>

      <button
        className={
          activeTab === "donations"
            ? "stellarTabActive"
            : ""
        }
        onClick={() =>
          setActiveTab("donations")
        }
      >
        Donations
      </button>

    </div>
  )
}

export default BillingPaymentsTabs