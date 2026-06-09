import "./PaymentMemberModal.css";
import { X, PlusCircle, ShieldCheck } from "lucide-react";

interface PaymentMethodsModalProps {
  onClose: () => void;
  onAddNew: () => void;
}

const PaymentMemberModal = ({
  onClose,
  onAddNew,
}: PaymentMethodsModalProps) => {
  return (
    <div className="atlasPaymentOverlay">
      <div className="atlasPaymentModal">

        <div className="atlasPaymentHeader">
          <div>
            <div className="atlasPaymentAccent"></div>
            <h2>Payment Methods</h2>
          </div>

          <button
            className="atlasPaymentClose"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        <button
          className="atlasAddPaymentBtn"
          onClick={onAddNew}
        >
          <PlusCircle size={16} />
          Add New Payment Method
        </button>

        <div className="atlasSecurityInfo">
          <ShieldCheck size={14} />

          <div>
            <h4>Secure Payment Environment</h4>

            <p>
              Your payment information is encrypted
              and secure. Zenith Enterprise uses
              industry-standard SSL encryption and
              PCI-compliant processing for all
              transactions.
            </p>
          </div>
        </div>

        <button
          className="atlasSaveButton"
          onClick={onClose}
        >
          Save and Close
        </button>

      </div>
    </div>
  );
};

export default PaymentMemberModal;