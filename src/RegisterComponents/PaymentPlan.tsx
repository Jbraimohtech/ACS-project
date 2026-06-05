import React, { useState } from 'react'
import './Register.css'

const PaymentPlan: React.FC = () => {
  const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");
  const [selectedMethod, setSelectedMethod] = useState<"card" | "paypal">("card");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [showNextPaymentModal, setShowNextPaymentModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleNext = () => {
    setShowPaymentModal(true);
  };

  const handleNextPay = () => {
    setShowNextPaymentModal(true);
  };

  return (
    <div>
      <div className="payment-page">
        <span className="payment-step-box">Step 2</span>
        <h1>Select your plan</h1>
        <p className="subtitle">Choose the professional tier that best fits your goals.</p>

        <div className="plan-toggle">
          <button
            className={plan === "monthly" ? "active" : ""}
            onClick={() => setPlan("monthly")}
          >
            Monthly
          </button>
          <button
            className={plan === "yearly" ? "active" : ""}
            onClick={() => setPlan("yearly")}
          >
            Yearly
          </button>
        </div>

        <div className="payment-card">
          <h2>Make a Payments</h2>
          <label>Payment Amount</label>
          <input
            type="text"
            value={plan === "monthly" ? "$ 100.00" : "$ 1000.00"}
            readOnly
          />
          <button className="next-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>

      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="payment-modal">
            <button
              className="payment-close-btn"
              onClick={() => setShowPaymentModal(false)}
            >
              ×
            </button>
            <div className="top-line"></div>
            <h2>Payment Methods</h2>
            <button
              className="payment-method-btn"
              onClick={() => {
                setShowPaymentModal(false);
                setTimeout(() => {
                  setShowAddPaymentModal(true);
                }, 200);
              }}
            >
              <div className="plus-icon"></div>
              Add New Payment Method
            </button>
            <div className="security-box">
              <div className="security-header">
                <div className="shield-icon"></div>
                <h4>Secure Payment Environment</h4>
              </div>
              <div>
                <p>
                  Your payment information is encrypted and secure. Zenith
                  Enterprise uses industry-standard SSL encryption and
                  PCI-compliant processing for all transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddPaymentModal && (
        <div className="zenithVeilBackdrop">
          <div className="orbitPayShell">
            <button
              className="quantumDismissTrigger"
              onClick={() => setShowAddPaymentModal(false)}
            >
              ×
            </button>
            <div className="nebulaAccentBeam"></div>
            <h2 className="hyperTitleMatrix">Add New Payment Method</h2>
            <p className="velocitySubtitleText">
              Select a provider and enter your billing details.
            </p>
            <div className="provider-tabs">
              <button
                type="button"
                onClick={() => setSelectedMethod("card")}
                className={`provider-btn ${selectedMethod === "card" ? "active" : ""}`}
              >
                <div className="credit-card-icon"></div>
                <span>Credit/Debit Card</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedMethod("paypal")}
                className={`provider-btn ${selectedMethod === "paypal" ? "active" : ""}`}
              >
                <div className="pay-stack-icon"></div>
                <span>PayPal</span>
              </button>
            </div>

            {selectedMethod === "card" ? (
              <form className="payment-form">
                <div className="form-group">
                  <label>CARD NUMBER</label>
                  <div className="input-wrapper">
                    <input type="text" placeholder="0000 0000 0000 0000" />
                    <span className="input-icon">
                      <div className="spotify-icon"></div>
                    </span>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>EXPIRY DATE</label>
                    <input type="text" placeholder="MM/YY" />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <div className="input-wrapper">
                      <input type="password" placeholder="***" />
                      <span className="input-icon">
                        <div className="detail-uncheck-icon"></div>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>BILLING ADDRESS</label>
                  <textarea placeholder="Street address, City, State, Zip"></textarea>
                </div>

                <div className="add-payment-modal-actions">
                  <button
                    type="button"
                    className="back-btn"
                    onClick={() => setShowAddPaymentModal(false)}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="next-btn"
                    onClick={handleNextPay}
                  >
                    Next
                  </button>
                </div>
              </form>
            ) : (
              <div className="paypalNebulaZone">
                <div className="paypalGalaxyIcon">
                    <div className="money-money-icon"></div>
                </div>
                <p className="paypalOrbitText">
                  You will be redirected to PayPal to complete your purchase securely.
                </p>
                <button className="paypalLaunchButton" onClick={() => {
                    setShowAddPaymentModal(false);

                    setTimeout(() => {
                    setShowSuccessModal(true);
                    }, 200);
                }}>
                        <span>Proceed to PayPal</span>  
                    <div className="proceed-paypal-icon"></div>
                </button>
                <button
                  className="paypalReturnText"
                  onClick={() => setSelectedMethod("card")}
                >
                  ← Back to selection
                </button>
                <div className="paypalSecurityDock">
                  <span className="security-item-box">
                    <div className="container-lock-icon"></div> 
                    <span> SECURE ENCRYPTED TRANSACTION</span>
                  </span>
                  <span className="security-item-box">
                    <div className="black-white-safe-icon"></div>
                    <span> PCI-DSS COMPLIANT</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showNextPaymentModal && (
        <div className="zenithVeilBackdrop">
          <div className="orbitPayShell">
            <button
              className="quantumDismissTrigger"
              onClick={() => setShowNextPaymentModal(false)}
            >
              ×
            </button>
            <div className="nebulaAccentBeam"></div>
            <h2 className="hyperTitleMatrix">Confirm Payment</h2>
            <p className="velocitySubtitleText">
              Review and confirm your payment details before proceeding.
            </p>
            <div className="confirmation-details">
              <div className="detail-row">
                <span>Plan:</span>
                <span className="detail-value">
                  {plan === "monthly" ? "Monthly" : "Yearly"}
                </span>
              </div>
              <div className="detail-row">
                <span>Amount:</span>
                <span className="detail-value">
                  {plan === "monthly" ? "$ 100.00" : "$ 1000.00"}
                </span>
              </div>
            </div>
            <div className="add-payment-modal-actions">
              <button
                type="button"
                className="back-btn"
                onClick={() => setShowNextPaymentModal(false)}
              >
                Back
              </button>
              <button type="submit" className="next-btn">
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      )}

      /* SUCCESS MODAL */

        {showSuccessModal && (
        <div className="zenithVeilBackdrop">
            <div className="successQuantumBox">
            {/* CLOSE */}
            <button
                className="successDismissOrb"
                onClick={() =>
                setShowSuccessModal(false)
                }
            >
                ×
            </button>

            {/* ICON */}
            <div className="successPulseRing">
                ✓
            </div>

            {/* TITLE */}
            <h2 className="successOrbitTitle">
                Successful
            </h2>

            {/* TEXT */}
            <p className="successOrbitText">
                Proceed to dashboard
            </p>

            {/* BUTTON */}
            <button className="successAdvanceButton">
                Next
            </button>
            </div>
        </div>
        )}
    </div>
  );
};

export default PaymentPlan