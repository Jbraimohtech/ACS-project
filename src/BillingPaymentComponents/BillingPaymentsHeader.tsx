import { ChevronLeft } from "lucide-react";


const BillingPaymentsHeader = () => {
  return (
     <>
      <div className="stellarBreadcrumb">
        <ChevronLeft size={16} />
        <span>Payment</span>
      </div>

      <div className="stellarHeaderBlock">
        <h1>Billing & Payments</h1>

        <p>
          Manage your subscription,
          payments method, and billing history
        </p>
      </div>
    </>
  )
}

export default BillingPaymentsHeader