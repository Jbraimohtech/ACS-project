import { useState } from "react";

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

  const handleSubmit = async () => {
    if (!paymentProof) {
      alert("Please upload payment proof.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("amount", amount);
      formData.append("payment_method", paymentMethod);
      formData.append("description", description);
      formData.append("payment_proof_image", paymentProof);

      const response = await fetch("https://ambchapcorps.org/api/payment", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Payment submitted successfully!");
        setShowPaymentStep(false);
      } else {
        alert(result.message || "Payment failed. Please try again.");
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
            type="text"
            placeholder="₦ 0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

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

          <textarea
            className="auroraInput full"
            rows={4}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

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
            <p><strong>Account Name:</strong> ACC Project Foundation</p>
            <p><strong>Bank:</strong> Zenith Bank</p>
            <p><strong>Account Number:</strong> 2180233627</p>
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