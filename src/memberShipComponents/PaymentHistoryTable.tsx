import { Download } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { API_BASE } from "../utils/api";
import { getToken } from "../utils/auth";

interface PaymentHistory {
  id: number;
  amount: string;
  status: string;
  reference: string;
  payment_method: string;
  paid_on: string;
  type: "Membership Dues" | "Donation";
}


const PaymentHistoryTable = () => {
  const [payments, setPayments] = useState<PaymentHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    "all" | "dues" | "donation"
  >("all");
  const handleDownloadInvoice = async (paymentId: number) => {
  try {
    const token = getToken();

    if (!token) {
      alert("Please login again.");
      return;
    }

    const response = await fetch(
      `${API_BASE}/payments/${paymentId}/invoice`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/pdf",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to download invoice.");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice-${paymentId}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    alert("Unable to download invoice.");
  }
};

  useEffect(() => {
  const fetchPayments = async () => {
    try {
      const token = getToken();

      if (!token) return;

      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      const [duesRes, donationRes] = await Promise.all([
        fetch(`${API_BASE}/dashboard/dues-payment`, {
          headers,
        }),
        fetch(`${API_BASE}/dashboard/donation-payments`, {
          headers,
        }),
      ]);

      const duesJson = await duesRes.json();
      const donationJson = await donationRes.json();

      const normalize = (
        payment: Record<string, unknown>,
        type: PaymentHistory["type"]
      ): PaymentHistory => ({
        id: Number(payment.id ?? 0),
        amount: String(payment.amount ?? "0"),
        status: String(payment.status ?? ""),
        reference: String(payment.reference ?? ""),
        payment_method: String(payment.payment_method ?? ""),
        paid_on: String(payment.paid_on ?? new Date().toISOString()),
        type,
      });

      const dues = (Array.isArray(duesJson.data) ? duesJson.data : []).map(
        (payment: unknown) => normalize(payment as Record<string, unknown>, "Membership Dues")
      );

      const donations = (Array.isArray(donationJson.data) ? donationJson.data : []).map(
        (payment: unknown) => normalize(payment as Record<string, unknown>, "Donation")
      );

      const merged = [...dues, ...donations].sort(
        (a, b) =>
          new Date(b.paid_on).getTime() -
          new Date(a.paid_on).getTime()
      );

      setPayments(merged);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchPayments();
}, []);

const formatCurrency = (amount: string) =>
  `₦${Number(amount).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const filteredPayments = useMemo(() => {
  if (filter === "dues") {
    return payments.filter(
      (payment) => payment.type === "Membership Dues"
    );
  }

  if (filter === "donation") {
    return payments.filter(
      (payment) => payment.type === "Donation"
    );
  }

  return payments;
}, [payments, filter]);


  return (
     <div className="stellarPaymentHistory">

      <div className="stellarHistoryHeader">

        <h2>
          Payment History
        </h2>
        <select
          value={filter}
          onChange={(e) =>
            setFilter(
              e.target.value as
                | "all"
                | "dues"
                | "donation"
            )
          }
        >
          <option value="all">All Payments</option>
          <option value="dues">Membership Dues</option>
          <option value="donation">Donations</option>
        </select>

      </div>

      <table>

        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Method</th>
            <th>Reference</th>
            <th>Invoice</th>
          </tr>
        </thead>

        <tbody>
  {loading ? (
    <tr>
      <td colSpan={7}>Loading...</td>
    </tr>
  ) : filteredPayments.length === 0 ? (
    <tr>
      <td colSpan={7}>No payment history found.</td>
    </tr>
  ) : (
    filteredPayments.map((payment) => (
      <tr key={`${payment.type}-${payment.id}`}>
        <td>{formatDate(payment.paid_on)}</td>

        <td>{payment.type}</td>

        <td>{formatCurrency(payment.amount)}</td>

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

        <td>
          <button
            className="stellarInvoiceButton"
            onClick={() => handleDownloadInvoice(payment.id)}
            title="Download Invoice"
          >
            <Download size={16} />
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

      </table>

    </div>
  )
}

export default PaymentHistoryTable