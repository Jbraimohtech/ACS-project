import AddPaymentFormModal from "./AddPaymentFormModal";
import "./AddPaymentMethodModal.css"
import { X, Trash2, Pencil, PlusCircle, ShieldCheck } from "lucide-react";
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

            <div className="novaMethodCard novaMethodCardActive">
            <img src="/visa.png" alt="" />

            <div className="novaMethodInfo">
                <h4>
                Visa ending in 4242
                <span>ACTIVE</span>
                </h4>

                <p>Expires 12/26</p>
            </div>

            <div className="novaMethodActions">
                <Pencil size={15} />
                <Trash2 size={15} />
            </div>
            </div>

            <div className="novaMethodCard">
            <img src="/mastercard.png" alt="" />

            <div className="novaMethodInfo">
                <h4>
                Mastercard ending in 8831
                </h4>

                <p>Expires 08/25</p>
            </div>

            <div className="novaMethodActions">
                <Pencil size={15} />
                <Trash2 size={15} />
            </div>
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