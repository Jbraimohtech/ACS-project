import CurrentPlanCard from "./CurrentPlanCard"
import PaymentHistoryTable from "./PaymentHistoryTable"
import QuickActionsCard from "./QuickActionsCard"
import "./MembershipPage.css"

const MembershipPage = () => {

  return (
     <div className="MembershipPage-content">

      <div className="stellarMembershipTopSection">
        <CurrentPlanCard />

        <QuickActionsCard />
      </div>

      <PaymentHistoryTable />
    </div>
  )
}

export default MembershipPage