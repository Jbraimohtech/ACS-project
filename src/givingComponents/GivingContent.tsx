import React, { useEffect, useState } from "react";
import "./Giving.css";
import {
  CalendarDays,
} from "lucide-react";
import AllMainContent from '../components/AllMainContent'
import "../../src/EventsComponents/Event.css"
import Navbar from "../components/Navbar/Navbar";

interface PaymentType {
  id: number;
  description: string;
}



const GivingContent : React.FC = () => {
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([]);
  const [donationType, setDonationType] =
    useState<"one-time" | "monthly">("one-time");

  const [showPaymentStep, setShowPaymentStep] = useState(false);
  const [amount, setAmount] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("");

  const [description, setDescription] = useState("");

  const [paymentProof, setPaymentProof] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async () => {
  if (!paymentProof) {
    alert("Please upload payment proof.");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("amount", amount);

    formData.append(
      "payment_method",
      paymentMethod
    );

    formData.append(
      "description",
      description
    );

    formData.append(
      "payment_proof_image",
      paymentProof
    );

    const response = await fetch(
      "https://ambchapcorps.org/api/payment/pay",
      {
        method: "POST",
        body: formData,
      }
    );

    const result =
      await response.json();

    console.log(result);

    if (response.ok) {
      alert("Payment submitted successfully!");
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const fetchPaymentTypes = async () => {
    try {
      const response = await fetch(
        "https://ambchapcorps.org/api/payment/paymentType"
      );

      const result = await response.json();

      setPaymentTypes(result.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  fetchPaymentTypes();
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
                />

                <input
                  type="text"
                  placeholder="Last name"
                  className="giving-input"
                />
              </div>

              <input
                type="email"
                placeholder="Email address"
                className="giving-input full"
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
                  Select Payment Type
                </option>

                {paymentTypes.map((item) => (
                  <option
                    key={item.id}
                    value={item.description}
                  >
                    {item.description}
                  </option>
                ))}
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
      <strong>Account Name:</strong>
      ACC Project Foundation
    </p>

    <p>
      <strong>Bank:</strong>
      Zenith Bank
    </p>

    <p>
      <strong>Account Number:</strong>
      2180233627
    </p>

    <p>
      <strong>Amount:</strong> ₦{amount}
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

  <textarea
    className="giving-input full"
    placeholder="Description"
    value={description}
    onChange={(e) =>
      setDescription(e.target.value)
    }
  />

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