import { X, CreditCard } from "lucide-react";
import "./AddPaymentFormModal.css"
import PaySuccessModal from "./PaySuccessModal";
import { useState } from "react";
import EditCardModal from "./EditCardModal";

interface AddPaymentFormModalProps {
  onClose: () => void;
}


const AddPaymentFormModal = ({
  onClose,
}: AddPaymentFormModalProps) => {
      const [showSuccessModal, setShowSuccessModal] = useState(false);
      const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="novaCardOverlay">
      <div className="novaCardModal">

        <div className="novaCardHeader">
          <div className="novaCardAccent"></div>

          <h2>Add New Payment Method</h2>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <p className="novaCardSubtitle">
          Select a provider and enter your billing details.
        </p>

        {/* PROVIDERS */}

        <div className="novaProviderTabs">

          <button className="novaProviderActive">
            <CreditCard size={16} />
            Credit/Debit Card
          </button>

            <button
                className="novaProviderTab"
                onClick={() => setShowEditModal(true)}
                >
                PayPal
            </button>

        </div>

        {/* CARD NUMBER */}

        <div className="novaFieldGroup">
          <label>CARD NUMBER</label>

          <input
            type="text"
            placeholder="0000 0000 0000 0000"
          />
        </div>

        {/* ROW */}

        <div className="novaFieldRow">

          <div className="novaFieldGroup">
            <label>EXPIRY DATE</label>

            <input
              type="text"
              placeholder="MM/YY"
            />
          </div>

          <div className="novaFieldGroup">
            <label>CVV</label>

            <input
              type="password"
              placeholder="•••"
            />
          </div>

        </div>

        {/* ADDRESS */}

        <div className="novaFieldGroup">
          <label>BILLING ADDRESS</label>

          <textarea
            placeholder="Street address, City, State, Zip"
          />
        </div>

        {/* ACTIONS */}

        <div className="novaCardActions">

          <button
            className="novaBackButton"
            onClick={onClose}
          >
            Back
          </button>

            <button
                className="novaAddCardButton"
                onClick={() => {
                setShowSuccessModal(true);

                setTimeout(() => {
                    setShowSuccessModal(false);
                    onClose();
                }, 2000);
                }}
            >
                Add Card
            </button>

        </div>

      </div>

        {showSuccessModal && (
            <PaySuccessModal
                onClose={() => setShowSuccessModal(false)}
            />
        )}
        {showEditModal && (
            <EditCardModal
                onClose={() => setShowEditModal(false)}
            />
        )}
    </div>
  );
};

export default AddPaymentFormModal