import {
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE } from "../utils/api";
import { getToken } from "../utils/auth";

interface DashboardData {
  account_status: string;
  last_payment: {
    amount: string;
    paid_on: string;
  } | null;
  dues: {
    monthly_amount: string;
    next_due_date: string;
    next_due_amount: string;
    message: string;
    is_owing: boolean;
  };
}

const CurrentPlanCard = () => {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = getToken();

        const response = await fetch(`${API_BASE}/dashboard`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load dashboard");
        }

        const result = await response.json();

        setDashboard(result.data);
      } catch (error) {
        console.error(error);
      } 
    };

    fetchDashboard();
  }, []);

  const formatCurrency = (value?: string | number) =>
    `₦${Number(value || 0).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const formatDate = (date?: string) =>
    date
      ? new Date(date).toLocaleDateString("en-NG", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "--";

  return (
     <div className="stellarCurrentPlanCard">

      <div className="stellarPlanHeader">

        <div>
          <p>CURRENT PLAN</p>

          <h2>{dashboard?.account_status === "approved" ? "Active Membership" : "Pending Membership"}</h2>
        </div>

        <span className="stellarActiveBadge">
          {dashboard?.account_status?.toUpperCase()}
        </span>

      </div>

      <div className="stellarInvestmentCard">

        <div>

          <span>
            Monthly Investment
          </span>

          <h1>
            {formatCurrency(dashboard?.dues.monthly_amount)}
            <small>/mo</small>
          </h1>

          <p>
            Next billing cycle:
            {formatDate(dashboard?.dues.next_due_date)}
          </p>

          <p>
            Last Payment: {formatCurrency(dashboard?.last_payment?.amount)}
          </p>

        </div>

        <Sparkles size={24} />
      </div>

      <div className="stellarPlanBottom">

        <div className="stellarPlanBenefits">

          <h4>
            Included in your plan
          </h4>

          <ul>

            <li>
            <CheckCircle size={14}/>
            {dashboard?.dues.message}
            </li>

            <li>
            <CheckCircle size={14}/>
            Monthly Due: {formatCurrency(dashboard?.dues.monthly_amount)}
            </li>

            <li>
            <CheckCircle size={14}/>
            Next Payment: {formatDate(dashboard?.dues.next_due_date)}
            </li>

          </ul>

        </div>

        <div className="stellarPaymentMethodCard">

          <p>LAST PAYMENT</p>

          <div className="stellarMiniCard">

          <span>Amount</span>

          <strong>
          {formatCurrency(dashboard?.last_payment?.amount)}
          </strong>

          </div>

          <small>
          Paid on {formatDate(dashboard?.last_payment?.paid_on)}
          </small>

        </div>

      </div>

    </div>
  )
}

export default CurrentPlanCard