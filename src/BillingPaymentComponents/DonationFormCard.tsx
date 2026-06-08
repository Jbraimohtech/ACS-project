import { ChevronDown } from "lucide-react";
import { useState } from "react";
import PaymentMethodModal from "./PaymentMethodModal";

const DonationFormCard = () => {
    const [showPaymentModal, setShowPaymentModal] =
  useState(false);

  return (
    <div className="auroraDonationCard">

      <h3>Make a Donations</h3>

      <p>Support our initiatives</p>

      <label>Donation Amount</label>

      <input
        type="text"
        placeholder="$ 0.00"
      />

      <div className="auroraAmountOptions">
        <button>$25</button>
        <button>$50</button>

        <button className="auroraAmountActive">
          $100
        </button>

        <button>Custom</button>
      </div>

      <label>Donation type</label>

      <div className="auroraSelectField">
        <span>Special event</span>
        <ChevronDown size={16} />
      </div>

      <label>Select event</label>

      <div className="auroraSelectField">
        <span>Annual gala event</span>
        <ChevronDown size={16} />
      </div>

        <button
            className="auroraDonateButton"
            onClick={() => setShowPaymentModal(true)}
            >
            Donate Now
        </button>

        {showPaymentModal && (
            <PaymentMethodModal
                onClose={() =>
                setShowPaymentModal(false)
                }
            />
        )}

    </div>
  )
}

export default DonationFormCard