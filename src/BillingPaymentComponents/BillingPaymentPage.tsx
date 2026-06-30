import DashboardSidebar from "../profilePageComponent/DashboardSidebar"
import BillingPaymentsHeader from "./BillingPaymentsHeader"
import BillingPaymentsTabs from "./BillingPaymentsTabs"
import DonationFormCard from "./DonationFormCard"
import DonationHistoryCard from "./DonationHistoryCard"
import DonationStatsCards from "./DonationStatsCards"
import "./BillingPayment.css"
import {
  Bell,
  Search,
  Menu,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import MembershipPage from "../memberShipComponents/MembershipPage"
import DashboardUserProfileWidget from "../components/DashboardUserProfileWidget"


const BillingPaymentPage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "membership" |
    "donations" |
    "payment-methods"
  >("membership");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = formData.get("query")?.toString().trim() || "";

    if (query) {
      navigate(`/member-search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="zenProfileLayout">
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
        <div className="orionMainContent">
            {/* TOP BAR */}

            <div className="orionTopBarShell">

                <form className="orionSearchCluster" onSubmit={handleSearchSubmit}>
                  <Search
                    size={16}
                    className="orionSearchIcon"
                  />

                  <input
                    type="text"
                    name="query"
                    placeholder="Search for members"
                    className="orionSearchInput"
                  />
                </form>

                <div className="orionTopBarActions">
                    {/* NOTIFICATION */}

                    <button className="orionNotificationButton">
                    <Bell size={18} />

                    <span className="orionNotificationDot"></span>
                    </button>

                    {/* USER */}

                    <DashboardUserProfileWidget />
                </div>
            </div>

                {/* Mobile Header */}
                <div className="orionTopBarShellMobile">
                    <div className="orionTopBarShellMobile-left">
                        <button
                            className="orionMobileMenuButton"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={22} />
                        </button>

                        <p className="dashboard-p">Payment</p>
                    </div>
            
            <div className="orionMobileLogo-crop">
                 {!showMobileSearch ? (
                <button
                    className="orionMobileSearchTrigger"
                    onClick={() =>
                    setShowMobileSearch(true)
                    }
                >
                    <Search size={22} />
                </button>
                ) : (
                <form className="orionSearchCluster" onSubmit={handleSearchSubmit}>
                    <Search
                    size={16}
                    className="orionSearchIcon"
                    />

                    <input
                    autoFocus
                    type="text"
                    name="query"
                    placeholder="Search for members"
                    className="orionSearchInput"
                    />

                    <button
                    type="button"
                    className="orionMobileSearchClose"
                    onClick={() =>
                        setShowMobileSearch(false)
                    }
                    >
                    ✕
                    </button>
                </form>
                )}

                <div className="notify-icon-profile"></div>
                
                <div className="notify-icon-profile-box">
                    
                </div>
                <div className="notify-icon-profile-box">
                    <div className="profile-image-small"></div>
                </div>
            </div>
        </div>

        {/* end of mobile header */}
                <div className="stellarBillingWrapper">

                <BillingPaymentsHeader />

                <BillingPaymentsTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />

                {activeTab === "membership" && (
                  <MembershipPage />
                )}

                {activeTab === "donations" && (
                  <div className="stellarBillingGrid">

                    <DonationFormCard />

                    <div className="stellarBillingRight">
                      <DonationStatsCards />
                      <DonationHistoryCard />
                    </div>

                  </div>
                )}

                </div>
                </div>
    </div>
  )
}

export default BillingPaymentPage