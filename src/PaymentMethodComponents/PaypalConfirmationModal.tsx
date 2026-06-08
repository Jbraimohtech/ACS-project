import "./PaypalConfirmationModal.css"

import { X, CreditCard } from "lucide-react";

interface PaypalConfirmationModalProps {
  onClose: () => void;
}

const PaypalConfirmationModal = ({
  onClose,
}: PaypalConfirmationModalProps) => {
  return (
    <div className="novaPaypalOverlay">
      <div className="novaPaypalModal">

        <div className="novaPaypalHeader">
          <div>
            <h2>Add New Payment Method</h2>

            <p>
              Select your preferred way to pay for
              Zenith Enterprise services.
            </p>
          </div>

          <button
            className="novaPaypalClose"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        <div className="novaPaypalTabs">

          <button className="novaPaypalTab">
            Credit/Debit Card
          </button>

          <button className="novaPaypalTab novaPaypalTabActive">
            PayPal
          </button>

        </div>

        <div className="novaPaypalBody">

          <div className="novaPaypalIcon">
            <CreditCard size={28} />
          </div>

          <p>
            You will be redirected to PayPal to
            complete your purchase securely.
          </p>

          <button className="novaPaypalProceedBtn">
            Proceed to PayPal
          </button>

          <button className="novaPaypalBackBtn">
            ← Back to selection
          </button>

        </div>

        <div className="novaPaypalFooter">
          <span>SECURE ENCRYPTED TRANSACTION</span>
          <span>PCI-DSS COMPLIANT</span>
        </div>

      </div>
    </div>
  );
};

export default PaypalConfirmationModal