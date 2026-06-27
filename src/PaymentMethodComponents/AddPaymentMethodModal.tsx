import AddPaymentFormModal from "./AddPaymentFormModal";
import "./AddPaymentMethodModal.css"
import { X, PlusCircle, ShieldCheck } from "lucide-react";
import { useState } from "react";


interface AddPaymentMethodModalProps {
  onClose: () => void;
}

const AddPaymentMethodModal = ({
  onClose,
}: AddPaymentMethodModalProps) => {
    const [showAddCardModal, setShowAddCardModal] = useState(false);
    
    
  return (
    <div className="novaMethodsOverlay">
        <div className="novaMethodsModal">

            <div className="novaMethodsHeader">
                <div className="novaMethodsAccent"></div>

                <h2>Payment Methods</h2>

                <button onClick={onClose}>
                    <X size={18} />
                </button>
            </div>

            <button
                className="novaAddMethodButton"
                onClick={() => setShowAddCardModal(true)}
                >
                <PlusCircle size={18} />
                Add New Payment Method
            </button>

            <div className="novaMethodSecurity">
            <ShieldCheck size={15} />

            <div>
                <h5>Secure Payment Environment</h5>

                <p>
                Your payment information is encrypted and secure.
                Zenith Enterprise uses industry-standard SSL encryption
                and PCI-compliant processing for all transactions.
                </p>
            </div>
            </div>

            <button className="novaSaveMethodsButton">
            Save and Close
            </button>

            {showAddCardModal && (
                <AddPaymentFormModal
                    onClose={() => setShowAddCardModal(false)}
                />
            )}

        </div>
        </div>
  );
};


export default AddPaymentMethodModal