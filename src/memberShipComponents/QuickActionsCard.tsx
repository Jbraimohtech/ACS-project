import {
  CreditCard,
  Download,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import PaymentMemberModal from "../PaymentMethodComponents/PaymentMemberModal";
import AddPaymentMethodModal from "../PaymentMethodComponents/AddPaymentMethodModal";

const QuickActionsCard = () => {

    const [showPaymentModal, setShowPaymentModal] =
    useState(false);

    const [showAddCardModal, setShowAddCardModal] =
    useState(false);

  return (

    <div className="stellarQuickActionsColumn-box">
        <h5 className="quick-action-headText">QUICK ACTIONS</h5>
        <div className="stellarQuickActionsColumn">

        <div className="stellarPayNowCard">

            <h4>
            Immediate Payment
            </h4>

            <p>
            Settle outstanding balances manually
            </p>

            <button
                className="stellarPayNowButton"
                onClick={() => setShowPaymentModal(true)}
                >
                Pay Now
            </button>

        </div>

        <div className="stellarActionItem">
            <Download size={18} />

            <div>
            <h5>
                Download Invoices
            </h5>

            <p>
                PDF, CSV Formats
            </p>
            </div>

            <ChevronRight size={16} />
        </div>

        <div className="stellarActionItem">
            <CreditCard size={18} />

            <div>
            <h5>
                Payment Methods
            </h5>

            <p>
                Manage 2 cards
            </p>
            </div>

            <ChevronRight size={16} />
        </div>

        <div className="stellarUpgradeCard">

            <h4>
            Switch to Annual
            </h4>

            <p>
            Unlock all premium perks
            for just $280/year
            </p>

        </div>
        </div>

        {showPaymentModal && (
            <PaymentMemberModal
                onClose={() => setShowPaymentModal(false)}
                onAddNew={() => {
                setShowPaymentModal(false);
                setShowAddCardModal(true);
                }}
            />
            )}

            {showAddCardModal && (
            <AddPaymentMethodModal
                onClose={() => setShowAddCardModal(false)}
            />
        )}
    </div>
  )
}

export default QuickActionsCard