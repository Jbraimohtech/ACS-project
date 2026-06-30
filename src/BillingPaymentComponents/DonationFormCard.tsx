import { useEffect, useState } from "react";
import { getToken } from "../utils/auth";

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

const DonationFormCard = () => {
  const [showPaymentStep, setShowPaymentStep] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [description, setDescription] = useState("");
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [bankAccounts, setBankAccounts] = useState<BankAccountsPayload | null>(null);
  const [selectedAccountType, setSelectedAccountType] = useState<"donation" | "membership">("donation");

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    let active = true;

    const fetchDashboard = async () => {
      try {
        const response = await fetch("https://ambchapcorps.org/api/dashboard", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) return;

        const data = await response.json().catch(() => ({}));
        const payload = data && typeof data === "object" ? (data.data ?? data) : data;
        const user = payload && typeof payload === "object" ? (payload.user ?? payload) : null;

        if (!active || !user) return;

        setFirstName(user.first_name ?? user.firstName ?? "");
        setLastName(user.last_name ?? user.lastName ?? "");
        setEmail(user.email ?? "");
        setPhone(user.phone ?? user.phone_number ?? user.mobile ?? "");
      } catch (err) {
        console.debug("Failed to prefill donation form from dashboard", err);
      }
    };

    const fetchBankAccounts = async () => {
      try {
        const response = await fetch("https://ambchapcorps.org/api/bank-accounts", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
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

    fetchDashboard();
    fetchBankAccounts();

    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async () => {
    if (!amount.trim() || Number.isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    if (!paymentMethod.trim()) {
      alert("Please select a payment method.");
      return;
    }

    if (!description.trim()) {
      alert("Please select a payment description.");
      return;
    }

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
      formData.append("payment_method", paymentMethod.trim());
      formData.append("description", description.trim());
      formData.append("payment_proof_image", paymentProof);

      const chosenAccount = selectedAccountType === "membership"
        ? bankAccounts?.membership_fee_account
        : bankAccounts?.donation_account;

      if (chosenAccount?.id) {
        formData.append("bank_account_id", String(chosenAccount.id));
      } else if (chosenAccount) {
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
        alert("Payment submitted successfully!");
        setShowPaymentStep(false);
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
    <div className="auroraDonationCard">
      <h3>Make a Donation</h3>
      <p>Support our initiatives</p>

      {!showPaymentStep ? (
        <>
          <label>Personal Info</label>

          <div className="auroraFormGrid">
            <input
              className="auroraInput"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="auroraInput"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <input
            className="auroraInput full"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="auroraPhoneInput">
            <div className="auroraCountryCode">
              <img src="/src/assets/images/nigeria-flag.svg" alt="Nigeria flag" className="country-flag-icon" />
              <span>+234</span>
            </div>
            <input
              className="auroraInput"
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <label>Donation Amount</label>
          <input
            className="auroraInput full"
            type="number"
            step="0.01"
            min="0"
            placeholder="₦ 0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <label>Pay To</label>
          <select
            className="auroraInput full"
            value={selectedAccountType}
            onChange={(e) => setSelectedAccountType(e.target.value as "donation" | "membership")}
          >
            <option value="donation">Donation Account</option>
            <option value="membership">Membership Account</option>
          </select>

          <select
            className="auroraInput full"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select Payment Method</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash">Cash</option>
            <option value="POS">POS</option>
          </select>

          <select
            className="auroraInput full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
            <option value="">Select Payment Description</option>
            <option value="membership_fee">Membership Fee</option>
            <option value="donation">Donation Fee</option>
          </select>

          <button
            className="auroraDonateButton"
            onClick={() => setShowPaymentStep(true)}
          >
            Donate Now
          </button>
        </>
      ) : (
        <div className="auroraPaymentConfirmationCard">
          <p className="auroraSectionLabel">Payment Confirmation</p>
          <h4>Make your donation to the account below</h4>

          <div className="auroraPaymentAccountBox">
            <p>
              <strong>Account Name:</strong>{" "}
              {(
                selectedAccountType === "membership"
                  ? bankAccounts?.membership_fee_account?.account_name
                  : bankAccounts?.donation_account?.account_name
              ) ?? "Loading..."}
            </p>
            <p>
              <strong>Bank:</strong>{" "}
              {(
                selectedAccountType === "membership"
                  ? bankAccounts?.membership_fee_account?.bank_name
                  : bankAccounts?.donation_account?.bank_name
              ) ?? "Loading..."}
            </p>
            <p>
              <strong>Account Number:</strong>{" "}
              {(
                selectedAccountType === "membership"
                  ? bankAccounts?.membership_fee_account?.account_number
                  : bankAccounts?.donation_account?.account_number
              ) ?? "Loading..."}
            </p>
            <p><strong>Amount:</strong> ₦{amount || "0.00"}</p>
          </div>

          <label className="auroraUploadLabel" htmlFor="payment-proof">
            Upload payment proof image
          </label>
          <div className="auroraUploadWrapper">
            <input
              id="payment-proof"
              type="file"
              accept="image/*"
              className="auroraUploadInput"
              onChange={(e) => {
                if (e.target.files?.length) {
                  setPaymentProof(e.target.files[0]);
                }
              }}
            />
          </div>

          <div className="auroraPaymentActions">
            <button className="auroraBackButton" onClick={() => setShowPaymentStep(false)}>
              Back
            </button>
            <button
              className="auroraDonateButton"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Confirm"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationFormCard