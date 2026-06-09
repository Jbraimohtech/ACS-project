import { X, PlusCircle } from "lucide-react";
import "./PaymentMethodModal.css"
import { useState } from "react";
import DonationSuccessModal from "./DonationSuccessModal";

interface PaymentMethodModalProps {
  onClose: () => void;
}

const PaymentMethodModal = ({
  onClose,
}: PaymentMethodModalProps) => {

    const [showSuccess, setShowSuccess] =
  useState(false);

  return (
    <div className="novaPaymentOverlay">
      <div className="novaPaymentModal">

        <div className="novaPaymentHeader">
          <h2>Select Payment Method</h2>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <p className="novaSavedMethods">
          SAVED METHODS
        </p>

        {/* CARD 1 */}

        <div className="novaPaymentCard novaPaymentCardActive">
          <div>
            <h4>Visa ending in 4242</h4>

            <span>Expires 12/26</span>
          </div>

          <input
            type="radio"
            checked
            readOnly
          />
        </div>

        {/* CARD 2 */}

        <div className="novaPaymentCard">
          <div>
            <h4>Mastercard ending in 8831</h4>

            <span>Expires 08/25</span>
          </div>

          <input
            type="radio"
            readOnly
          />
        </div>

        {/* PAYSTACK */}

        <div className="novaPaymentCard">
          <div>
            <h4>Paystack</h4>

            <span>
              z.donation@gmail.com
            </span>
          </div>

          <input
            type="radio"
            readOnly
          />
        </div>

        {/* ADD NEW */}

        <button className="novaAddPaymentButton">
          <PlusCircle size={16} />

          Add New Payment Method
        </button>

        <button
            className="novaContinueButton"
            onClick={() => setShowSuccess(true)}
            >
            Continue to Donate
        </button>

        <button
          className="novaCancelButton"
          onClick={onClose}
        >
          Cancel
        </button>

        <p className="novaPaymentFooter">
          Secured with 256-bit SSL encryption.
          Your data is never stored locally.
        </p>

      </div>

        {showSuccess && (
            <DonationSuccessModal
                onClose={() => {
                setShowSuccess(false);
                onClose();
                }}
            />
        )}
    </div>
  )
}

export default PaymentMethodModal