import {
  Download,
} from "lucide-react";


const PaymentHistoryTable = () => {
  return (
     <div className="stellarPaymentHistory">

      <div className="stellarHistoryHeader">

        <h2>
          Payment History
        </h2>

        <button>
          Filter
        </button>

      </div>

      <table>

        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Method</th>
            <th>Invoice</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td>SEP, 15 2026</td>
            <td>$49.00</td>
            <td>
              <span className="stellarPaidBadge">
                Paid
              </span>
            </td>
            <td>Visa ****4242</td>
            <td>
              <Download size={14} />
            </td>
          </tr>

          <tr>
            <td>SEP, 15 2026</td>
            <td>$49.00</td>
            <td>
              <span className="stellarPendingBadge">
                Pending
              </span>
            </td>
            <td>Bank transfer</td>
            <td>
              <Download size={14} />
            </td>
          </tr>

        </tbody>

      </table>

    </div>
  )
}

export default PaymentHistoryTable