import {
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const DonationHistoryCard = () => {
  return (
    <div className="galaxyHistoryCard">

      <div className="galaxyHistoryHeader">

        <div>
          <h3>Donation History</h3>

          <p>
            Track your previous gifts
          </p>
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
            <th>Type</th>
            <th>Destination</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>SEP, 15, 2026</td>
            <td>$500.00</td>
            <td>
              <span className="galaxyEventTag">
                Event
              </span>
            </td>
            <td>Annual Gala 2023</td>
          </tr>

          <tr>
            <td>SEP, 15, 2026</td>
            <td>$490.00</td>
            <td>
              <span className="galaxyZoneTag">
                Zone
              </span>
            </td>
            <td>Northern Region</td>
          </tr>

          <tr>
            <td>SEP, 15, 2026</td>
            <td>$490.00</td>
            <td>
              <span className="galaxyZoneTag">
                Zone
              </span>
            </td>
            <td>Spring Benefit</td>
          </tr>
        </tbody>
      </table>

      <div className="galaxyPagination">
        <ChevronLeft size={14} />

        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>

        <span>...</span>

        <span>10</span>

        <ChevronRight size={14} />
      </div>

    </div>
  )
}

export default DonationHistoryCard