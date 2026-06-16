import DashboardSidebar from "../profilePageComponent/DashboardSidebar"
import BillingPaymentsHeader from "./BillingPaymentsHeader"
import BillingPaymentsTabs from "./BillingPaymentsTabs"
import DonationFormCard from "./DonationFormCard"
import DonationHistoryCard from "./DonationHistoryCard"
import DonationStatsCards from "./DonationStatsCards"
import "./BillingPayment.css"
import {
  Bell,
  ChevronDown,
  Search,
  Menu,
} from "lucide-react";
import { useState } from "react";
import MembershipPage from "../memberShipComponents/MembershipPage"


const BillingPaymentPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "membership" |
    "donations" |
    "payment-methods"
  >("membership");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <div className="zenProfileLayout">
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
        <div className="orionMainContent">
            {/* TOP BAR */}

            <div className="orionTopBarShell">

                <div className="orionSearchCluster">
                    <Search
                    size={16}
                    className="orionSearchIcon"
                    />

                    <input
                    type="text"
                    placeholder="Search members, events,..."
                    className="orionSearchInput"
                    />
                </div>

                <div className="orionTopBarActions">
                    {/* NOTIFICATION */}

                    <button className="orionNotificationButton">
                    <Bell size={18} />

                    <span className="orionNotificationDot"></span>
                    </button>

                    {/* USER */}

                    <div className="orionUserProfileWidget">
                    <img
                        src="/profile.jpg"
                        alt="User"
                        className="orionUserAvatar"
                    />

                    <div className="orionUserMeta">
                        <h4>Chukwutem Emmanuel</h4>
                        <span>User ID: 12345434</span>
                    </div>

                    <ChevronDown size={16} />
                    </div>
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
                <div className="orionSearchCluster">
                    <Search
                    size={16}
                    className="orionSearchIcon"
                    />

                    <input
                    autoFocus
                    type="text"
                    placeholder="Search members, events..."
                    className="orionSearchInput"
                    />

                    <button
                    className="orionMobileSearchClose"
                    onClick={() =>
                        setShowMobileSearch(false)
                    }
                    >
                    ✕
                    </button>
                </div>
                )}
                
                <div className="notify-icon-profile-box">
                    <div className="notify-icon-profile"></div>
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