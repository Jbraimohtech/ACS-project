import CurrentPlanCard from "./CurrentPlanCard"
import MembershipAlert from "./MembershipAlert"
import PaymentHistoryTable from "./PaymentHistoryTable"
import QuickActionsCard from "./QuickActionsCard"
import "./MembershipPage.css"

const MembershipPage = () => {

  return (
     <div className="MembershipPage-content">
      <MembershipAlert />

      <div className="stellarMembershipTopSection">
        <CurrentPlanCard />

        <QuickActionsCard />
      </div>

      <PaymentHistoryTable />
    </div>
  )
}

export default MembershipPage