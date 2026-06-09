import "./PaySuccessModal.css"
import { X, Check } from "lucide-react";

interface SuccessModalProps {
  onClose: () => void;
}

const PaySuccessModal =  ({
  onClose,
}: SuccessModalProps) => {
  return (
    <div className="novaSuccessOverlay">
      <div className="novaSuccessModal">

        <button
          className="novaSuccessClose"
          onClick={onClose}
        >
          <X size={12} />
        </button>

        <div className="novaSuccessIcon">
          <Check size={18} />
        </div>

        <p className="novaSuccessText">
          Successful
        </p>

      </div>
    </div>
  );
};

export default PaySuccessModal