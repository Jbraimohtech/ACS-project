import React, { useEffect, useState } from "react";
import "./Giving.css";
import {
  CalendarDays,
} from "lucide-react";
import AllMainContent from '../components/AllMainContent'
import "../../src/EventsComponents/Event.css"
import Navbar from "../components/Navbar/Navbar";
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



const GivingContent : React.FC = () => {
  const [donationType, setDonationType] =
    useState<"one-time" | "monthly">("one-time");

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

  const handleSubmit = async () => {
    if (!amount.trim() || Number.isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Please enter a valid payment amount.");
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
      const chosenAccount = selectedAccountType === "membership"
        ? bankAccounts?.membership_fee_account
        : bankAccounts?.donation_account;

      formData.append("first_name", firstName.trim());
      formData.append("last_name", lastName.trim());
      formData.append("email", email.trim());
      formData.append("phone", phone.trim());
      formData.append("amount", amount.trim());
      formData.append("payment_method", paymentMethod.trim());
      formData.append("description", description.trim());
      formData.append("payment_proof_image", paymentProof);

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
        console.debug("Failed to prefill giving form from dashboard", err);
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

        if (!active) return;

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

  return (
      <div>
      <AllMainContent> 
        <Navbar />
        <div className='event-head-text-box'>
          
        </div>
        <div  className='giving-head-text'>
          <h1>
            Submit <br /> Your Donation
          </h1>
        </div>
      </AllMainContent>
      
      <section className="giving-section-content">
        {/* DONATION CARD */}
        <div className="donation-card">
          {!showPaymentStep ? (
            <>
              <div className="tabs">
                <button
                  className={`tab ${
                    donationType === "one-time"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setDonationType("one-time")
                  }
                >
                  One-time
                </button>

                <button
                  className={`tab ${
                    donationType === "monthly"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setDonationType("monthly")
                  }
                >
                  Monthly
                </button>
              </div>

              <p className="section-label">
                Personal Info
              </p>

              {/* FORM */}
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="First name"
                  className="giving-input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Last name"
                  className="giving-input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <input
                type="email"
                placeholder="Email address"
                className="giving-input full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* PHONE */}
              <div className="phone-input">
                <div className="country-code">
                  <img src="/src/assets/images/nigeria-flag.svg" alt="Nigeria flag" className="country-flag-icon" />
                  <span>+234</span>
                </div>

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="giving-input-phone full"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* AMOUNT */}
              <input
                type="number"
                className="giving-input full"
                placeholder="Donation Amount"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
              />

              <select
                className="giving-input full"
                value={selectedAccountType}
                onChange={(e) => setSelectedAccountType(e.target.value as "donation" | "membership")}
              >
                <option value="donation">Donation Account</option>
                <option value="membership">Membership Account</option>
              </select>

              <select
                className="giving-input full"
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              >
                <option value="">
                  Select Payment Method
                </option>

                <option value="Bank Transfer">
                  Bank Transfer
                </option>

                <option value="Cash">
                  Cash
                </option>

                <option value="POS">
                  POS
                </option>
              </select>

              <select
                className="giving-input full"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              >
                <option value="">
                  Select Payment Description
                </option>
                <option value="membership_fee">
                  Membership Fee
                </option>
                <option value="donation">
                  Donation Fee
                </option>
              </select>

              <button className="donate-btn" onClick={() => setShowPaymentStep(true)}>
                Donate Now
              </button>
            </>
          ) : (
            <div className="payment-confirmation-card">
  <p className="section-label">
    Payment Confirmation
  </p>

  <h3 className="payment-confirmation-title">
    Make your donation to the account below
  </h3>

  <div className="payment-account-box">
    <p>
      <strong>Account Name:</strong>{" "}
      {(selectedAccountType === "membership"
        ? bankAccounts?.membership_fee_account?.account_name
        : bankAccounts?.donation_account?.account_name) ?? "Loading..."}
    </p>

    <p>
      <strong>Bank:</strong>{" "}
      {(selectedAccountType === "membership"
        ? bankAccounts?.membership_fee_account?.bank_name
        : bankAccounts?.donation_account?.bank_name) ?? "Loading..."}
    </p>

    <p>
      <strong>Account Number:</strong>{" "}
      {(selectedAccountType === "membership"
        ? bankAccounts?.membership_fee_account?.account_number
        : bankAccounts?.donation_account?.account_number) ?? "Loading..."}
    </p>

    <p>
      <strong>Amount:</strong> ₦{amount || "0.00"}
    </p>
  </div>

  <select
    className="giving-input full"
    value={paymentMethod}
    onChange={(e) =>
      setPaymentMethod(e.target.value)
    }
  >
    <option value="">
      Select Payment Method
    </option>

    <option value="Bank Transfer">
      Bank Transfer
    </option>

    <option value="Cash">
      Cash
    </option>

    <option value="POS">
      POS
    </option>
  </select>

  <label
    className="upload-label"
    htmlFor="payment-proof"
  >
    Upload payment proof image
  </label>

  <input
    id="payment-proof"
    type="file"
    accept="image/*"
    className="upload-input"
    onChange={(e) => {
      if (e.target.files?.length) {
        setPaymentProof(
          e.target.files[0]
        );
      }
    }}
  />

  <div className="payment-actions-row">
    <button
      className="donate-btn payment-action-btn"
      onClick={() =>
        setShowPaymentStep(false)
      }
    >
      Back
    </button>

    <button
      className="donate-btn payment-action-btn"
      onClick={handleSubmit}
      disabled={loading}
    >
      {loading
        ? "Submitting..."
        : "Confirm Payment"}
    </button>
  </div>
</div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="giving-info-section">
          <h2>Where your money</h2>

          <p>
            We believe in full transparency.
            Here is how we allocate funds
          </p>

          <div className="giving-stats-grid">
            <div className="stat-card">
              <CalendarDays size={24} />

              <h1>24%</h1>

              <span>
                Campaign Events Hosted
              </span>
            </div>

            <div className="stat-card">
              <CalendarDays size={24}/>

              <h1>30%</h1>

              <span>Digital Outreach</span>
            </div>

            <div className="stat-card">
              <CalendarDays size={24} />

              <h1>25%</h1>

              <span>Operations</span>
            </div>
          </div>
        </div>
      </section>
    </div>

  )
}

export default GivingContent