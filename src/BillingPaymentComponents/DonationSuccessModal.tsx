import { Check, X } from "lucide-react";
import "./DonationSuccessModal.css"

interface DonationSuccessModalProps {
  onClose: () => void;
}

const DonationSuccessModal = ({
  onClose,
}: DonationSuccessModalProps) => {
  return (
    <div className="stellarSuccessOverlay">
      <div className="stellarSuccessModal">
        <button
          className="stellarSuccessClose"
          onClick={onClose}
        >
          <X size={12} />
        </button>

        <div className="stellarSuccessIcon">
          <Check size={16} />
        </div>

        <h3 className="stellarSuccessTitle">
          Successful
        </h3>
      </div>
    </div>
  )
}

export default DonationSuccessModal