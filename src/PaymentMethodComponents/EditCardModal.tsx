import "./EditCardModal.css"
import { X } from "lucide-react";
import { useState } from "react";
import PaypalConfirmationModal from "./PaypalConfirmationModal";

interface EditCardModalProps {
  onClose: () => void;
}

const EditCardModal = ({
  onClose,
}: EditCardModalProps) => {
    const [showPaypalModal, setShowPaypalModal] = useState(false);

  return (
    <div className="novaEditOverlay">
      <div className="novaEditModal">

        <div className="novaEditHeader">
          <div>
            <h2>Edit Card</h2>

            <p>
              Update your payment method details
              for automatic billing.
            </p>
          </div>

          <button
            onClick={onClose}
            className="novaEditClose"
          >
            <X size={16} />
          </button>
        </div>

        {/* CARD PREVIEW */}

        <div className="novaCardPreview">

          <div className="novaCardChip"></div>

          <div className="novaCardNumber">
            •••• •••• •••• 4242
          </div>

          <div className="novaCardFooter">
            <div>
              <span>CARD HOLDER</span>
              <h4>Alexander Zenith</h4>
            </div>

            <div>
              <span>EXPIRES</span>
              <h4>12/26</h4>
            </div>
          </div>

        </div>

        <div className="novaFieldGroup">
          <label>CARDHOLDER NAME</label>

          <input
            value="Alexander Zenith"
            readOnly
          />
        </div>

        <div className="novaFieldRow">

          <div className="novaFieldGroup">
            <label>CARD NUMBER</label>

            <input
              value="•••• 4242"
              readOnly
            />
          </div>

          <div className="novaFieldGroup">
            <label>EXPIRY DATE</label>

            <input
              value="12/26"
              readOnly
            />
          </div>

        </div>

        <label className="novaCheckbox">
          <input type="checkbox" defaultChecked />

          <span>
            Set as default payment method
          </span>
        </label>

        <div className="novaEditActions">
          <button
            className="novaCancelBtn"
            onClick={onClose}
          >
            Cancel
          </button>

            <button
                className="novaSaveBtn"
                onClick={() => setShowPaypalModal(true)}
                >
                Save Changes
            </button>
        </div>

      </div>

        {showPaypalModal && (
            <PaypalConfirmationModal
                onClose={() => setShowPaypalModal(false)}
            />
        )}
    </div>
  );
};

export default EditCardModal