import {
  CreditCard,
  // Download,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE } from "../utils/api";
import { getToken } from "../utils/auth";
import AddPaymentMethodModal from "../PaymentMethodComponents/AddPaymentMethodModal";

interface DashboardData {
  account_status: string;
  last_payment: {
    id: number;
    amount: string;
    paid_on: string;
  } | null;
  dues: {
    due_amount: number;
    next_due_amount: string;
    next_due_date: string;
    is_owing: boolean;
    message: string;
  };
}

const QuickActionsCard = () => {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [showAddCardModal, setShowAddCardModal] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = getToken();
        if (!token) return;

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

  // const handleDownloadInvoice = async () => {
  //   try {
  //     const token = getToken();
  //     if (!token) {
  //       alert("Please login again.");
  //       return;
  //     }

  //     if (!dashboard?.last_payment?.id) {
  //       alert("No payment invoice available.");
  //       return;
  //     }

  //     const response = await fetch(
  //       `${API_BASE}/payments/${dashboard.last_payment.id}/invoice`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           Accept: "application/pdf",
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Unable to download invoice.");
  //     }

  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = `Invoice-${dashboard.last_payment.id}.pdf`;
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error(error);
  //     alert("Failed to download invoice.");
  //   }
  // };

  const formatCurrency = (amount?: string | number) =>
    `₦${Number(amount || 0).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="stellarQuickActionsColumn-box">
      <h5 className="quick-action-headText">QUICK ACTIONS</h5>

      <div className="stellarQuickActionsColumn">
        <div className="stellarPayNowCard">
          <h4>
            {dashboard?.dues.is_owing ? "Outstanding Balance" : "Next Payment"}
          </h4>

          <h2>
            {formatCurrency(
              dashboard?.dues.is_owing
                ? dashboard?.dues.due_amount
                : dashboard?.dues.next_due_amount
            )}
          </h2>

          <p>{dashboard?.dues.message}</p>

          <button
            className="stellarPayNowButton"
            type="button"
            onClick={() => setShowAddCardModal(true)}
          >
            Pay Now
          </button>
        </div>

        {/* <button
          className="stellarActionItem"
          type="button"
          onClick={handleDownloadInvoice}
        >
          <Download size={18} />
          <div>
            <h5>Download Invoices</h5>
            <p>Latest payment receipts</p>
          </div>
          <ChevronRight size={16} />
        </button> */}

        <button
          className="stellarActionItem"
          type="button"
          onClick={() => setShowAddCardModal(true)}
        >
          <CreditCard size={18} />
          <div>
            <h5>Payment Methods</h5>
            <p>Manual Bank Transfer</p>
          </div>
          <ChevronRight size={16} />
        </button>

        <div className="stellarUpgradeCard">
          <h4>Membership Status</h4>
          <p>
            {dashboard?.account_status === "approved"
              ? "Your membership is active."
              : "Your membership is awaiting approval."}
          </p>
        </div>
      </div>

      {showAddCardModal && (
        <AddPaymentMethodModal onClose={() => setShowAddCardModal(false)} />
      )}
    </div>
  );
};

export default QuickActionsCard;
