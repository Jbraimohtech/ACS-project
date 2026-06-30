import {
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE } from "../utils/api";
import { getToken } from "../utils/auth";

interface DonationPayment {
  id: number;
  amount: string;
  status: string;
  reference: string;
  payment_method: string;
  paid_on: string;
}

interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

const DonationHistoryCard = () => {
  const [payments, setPayments] = useState<DonationPayment[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchDonations = async () => {
      try {
        const token = getToken();

        const response = await fetch(
          `${API_BASE}/dashboard/donation-payments`,
          {
            headers: {
              Accept: "application/json",
              ...(token
                ? {
                    Authorization: `Bearer ${token}`,
                  }
                : {}),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load donations");
        }

        const result = await response.json();

        if (!active) return;

        setPayments(result.data ?? []);
        setMeta(result.meta ?? null);
      } catch (error) {
        console.error(error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchDonations();

    return () => {
      active = false;
    };
  }, []);

  const formatAmount = (amount: string) =>
    `₦${Number(amount).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
    })}`;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="galaxyHistoryCard">
      <div className="galaxyHistoryHeader">
        <div>
          <h3>Donation History</h3>

          <p>Track your previous gifts</p>
        </div>

        <button>
          <Download size={14} />
          Export all
        </button>
      </div>

      <table className="galaxyHistoryTable">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Method</th>
            <th>Reference</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5}>Loading...</td>
            </tr>
          ) : payments.length === 0 ? (
            <tr>
              <td colSpan={5}>No donation history found.</td>
            </tr>
          ) : (
            payments.map((payment) => (
              <tr key={payment.id}>
                <td>{formatDate(payment.paid_on)}</td>

                <td>{formatAmount(payment.amount)}</td>

                <td>
                  <span
                    className={
                      payment.status === "approved"
                        ? "stellarPaidBadge"
                        : "stellarPendingBadge"
                    }
                  >
                    {payment.status}
                  </span>
                </td>

                <td>{payment.payment_method}</td>

                <td>{payment.reference}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {meta && meta.last_page > 1 && (
        <div className="galaxyPagination">
          <ChevronLeft size={14} />

          <span>
            Page {meta.current_page} of {meta.last_page}
          </span>

          <ChevronRight size={14} />
        </div>
      )}
    </div>
  );
};

export default DonationHistoryCard;