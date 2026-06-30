import { X, CreditCard } from "lucide-react";
import "./AddPaymentFormModal.css";
import PaySuccessModal from "./PaySuccessModal";
import { useState, useEffect } from "react";
import { getToken, setUser } from "../utils/auth";

interface AddPaymentFormModalProps {
  onClose: () => void;
}

interface PaymentAccount {
  id?: number;
  account_name: string;
  bank_name: string;
  account_number: string;
}

interface BankAccountsPayload {
  membership_fee_account?: PaymentAccount;
  donation_account?: PaymentAccount;
}

const AddPaymentFormModal = ({ onClose }: AddPaymentFormModalProps) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bankAccounts, setBankAccounts] = useState<BankAccountsPayload | null>(null);
  const [selectedAccountType] = useState<"donation" | "membership">("donation");
  const [selectedProvider, setSelectedProvider] = useState<"card" | "paypal">("card");
  const [showPaymentStep, setShowPaymentStep] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  // const [description, setDescription] = useState("");
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    let active = true;

    const fetchDashboard = async () => {
      try {
        const res = await fetch("https://ambchapcorps.org/api/dashboard", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) return;

        const data = await res.json().catch(() => ({}));
        const payload = (data && typeof data === "object") ? (data.data ?? data) : data;
        const user = (payload && typeof payload === "object") ? (payload.user ?? payload) : null;

        if (!active || !user) return;
        setFirstName(user.first_name ?? user.firstName ?? "");
        setLastName(user.last_name ?? user.lastName ?? "");
        setEmail(user.email ?? "");
        setPhone(user.phone ?? user.phone_number ?? user.mobile ?? "");

        const nextDue = String(payload?.next_due_amount ?? payload?.nextDueAmount ?? user?.next_due_amount ?? user?.nextDueAmount ?? "");
        if (nextDue) setAmount(nextDue);
      } catch (err) {
        // ignore errors silently
        console.debug("Failed to prefill payment form from dashboard", err);
      }
    };

    fetchDashboard();

    return () => { active = false; };
  }, []);

  useEffect(() => {
  const fetchBankAccounts = async () => {
    const token = getToken();

    try {
      const response = await fetch("https://ambchapcorps.org/api/bank-accounts", {
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) return;

      const data = await response.json().catch(() => ({}));
      const payload = data && typeof data === "object" ? (data.data ?? data) : data;

      setBankAccounts({
        membership_fee_account: payload?.membership_fee_account ?? payload?.membership ?? undefined,
        donation_account: payload?.donation_account ?? payload?.donation ?? undefined,
      });
    } catch (err) {
      console.error("Failed to fetch bank accounts", err);
    }
  };

  fetchBankAccounts();
}, []);

  const chosenAccount =
    selectedAccountType === "membership"
      ? bankAccounts?.membership_fee_account ?? bankAccounts?.donation_account
      : bankAccounts?.donation_account ?? bankAccounts?.membership_fee_account;

  const handleSubmit = async () => {
    if (!amount.trim() || Number.isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    if (!paymentMethod.trim()) {
      alert("Please select a payment method.");
      return;
    }

    // if (!description.trim()) {
    //   alert("Please select a payment description.");
    //   return;
    // }

    if (!paymentProof) {
      alert("Please upload payment proof.");
      return;
    }

    try {
      setLoading(true);
      const token = getToken();
      const formData = new FormData();
      formData.append("first_name", firstName.trim());
      formData.append("last_name", lastName.trim());
      formData.append("email", email.trim());
      formData.append("phone", phone.trim());
      formData.append("amount", amount.trim());
      const description = "membership_fee";
      formData.append("payment_method", paymentMethod.trim());
      formData.append("description", description.trim());
      formData.append("payment_proof_image", paymentProof);
      // If user selected a bank account, include its id to let the server know which account the user paid to
      const chosenAccount = selectedAccountType === "membership"
        ? bankAccounts?.membership_fee_account
        : bankAccounts?.donation_account;

      if (chosenAccount?.id) {
        formData.append("bank_account_id", String(chosenAccount.id));
      } else if (chosenAccount) {
        // fallback: include account name
        formData.append("bank_account_name", chosenAccount.account_name ?? "");
      }

      const response = await fetch("https://ambchapcorps.org/api/payment/pay", {
        method: "POST",
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setUser({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          status: "approved",
          payment_status: 1,
          NewMemberNotPaid: false,
        });
        alert("Payment submitted successfully!");
        setShowSuccessModal(true);
        setShowPaymentStep(false);
        setTimeout(() => {
          setShowSuccessModal(false);
          onClose();
        }, 1500);
      } else {
        const errorMessage =
          typeof result?.message === "string"
            ? result.message
            : result?.errors && typeof result.errors === "object"
              ? Object.values(result.errors)
                  .flatMap((value) => (Array.isArray(value) ? value : [String(value)]))
                  .join("\n")
              : "Payment failed. Please try again.";

        alert(errorMessage);
      }
    } catch (error) {
      console.error(error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="novaCardOverlay">
      <div className="novaCardModal">
        <div className="novaCardHeader">
          <div className="novaCardAccent"></div>

          <h2>Add New Payment Method</h2>

          <button onClick={onClose} type="button">
            <X size={18} />
          </button>
        </div>

        <p className="novaCardSubtitle">
          Select a provider and enter your billing details.
        </p>

        <div className="novaProviderTabs">
          <button
            className={selectedProvider === "card" ? "novaProviderActive" : "novaProviderTab"}
            onClick={() => setSelectedProvider("card")}
            type="button"
          >
            <CreditCard size={16} />
            Manual Payment
          </button>

          <button
            className={selectedProvider === "paypal" ? "novaProviderActive" : "novaProviderTab"}
            onClick={() => setSelectedProvider("paypal")}
            type="button"
            disabled
          >
            PayPal
          </button>
        </div>

        {selectedProvider === "card" ? (
          !showPaymentStep ? (
            <div className="novaCardFormShell">
              <p className="novaSectionLabel">Personal Info</p>

              <div className="novaFormGrid">
                <input
                  className="novaInput"
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className="novaInput"
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <input
                className="novaInput full"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="novaPhoneInput">
                <div className="novaCountryCode">
                  <img src="/src/assets/images/nigeria-flag.svg" alt="Nigeria flag" className="country-flag-icon" />
                  <span>+234</span>
                </div>
                <input
                  className="novaInput"
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <label className="novaAmountLabel">Amount</label>
              <input
                className="novaInput full"
                type="number"
                step="0.01"
                min="0"
                placeholder="₦ 0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="form-group">
                <label className="novaAmountLabel">Payment Method</label>
                <select
                  className="novaInput full"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="">Select Payment Method</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                  <option value="POS">POS</option>
                </select>
              </div>


              {/* <div className="form-group">
                <label className="novaAmountLabel">Payment Description</label>
                <select
                  className="novaInput full"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                >
                  <option value="">Select Description</option>
                  <option value="membership_fee">Membership Fee</option>
                  <option value="donation">Donation Fee</option>
                </select>
              </div> */}

              <div className="novaCardActions">
                <button className="novaBackButton" onClick={onClose} type="button">
                  Back
                </button>

                <button
                  className="novaAddCardButton"
                  onClick={() => setShowPaymentStep(true)}
                  type="button"
                >
                  Make Payment
                </button>
              </div>
            </div>
          ) : (
            <div className="novaPaymentConfirmationCard">
              <p className="novaSectionLabel">Payment Confirmation</p>
              <h4>Make your payment to the account below</h4>

              <div className="novaPaymentAccountBox">
                <p>
                  <strong>Account Name:</strong>{" "}
                  {chosenAccount?.account_name ?? "Loading..."}
                </p>

                <p>
                  <strong>Bank:</strong>{" "}
                  {chosenAccount?.bank_name ?? "Loading..."}
                </p>

                <p>
                  <strong>Account Number:</strong>{" "}
                  {chosenAccount?.account_number ?? "Loading..."}
                </p>

                <p>
                  <strong>Amount:</strong> ₦{amount || "0.00"}
                </p>
              </div>

              <label className="novaUploadLabel" htmlFor="payment-proof">
                Upload payment proof image
              </label>
              <div className="novaUploadWrapper">
                <input
                  id="payment-proof"
                  type="file"
                  accept="image/*"
                  className="novaUploadInput"
                  onChange={(e) => {
                    if (e.target.files?.length) {
                      setPaymentProof(e.target.files[0]);
                    }
                  }}
                />
              </div>

              <div className="novaCardActions">
                <button
                  className="novaBackButton"
                  onClick={() => setShowPaymentStep(false)}
                  type="button"
                >
                  Back
                </button>

                <button
                  className="novaAddCardButton"
                  onClick={handleSubmit}
                  type="button"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Confirm"}
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="novaProviderDisabledMessage">
            <p>PayPal is currently unavailable.</p>
            <span>Please use Credit/Debit Card for now.</span>
          </div>
        )}
      </div>

      {showSuccessModal && <PaySuccessModal onClose={() => setShowSuccessModal(false)} />}
    </div>
  );
};

export default AddPaymentFormModal;