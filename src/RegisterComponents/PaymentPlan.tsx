import React, { useEffect, useState } from 'react';
import './PaymentPlanWizard.css';

interface PaymentPlan {
  id: number;
  name: string;
  monthly_amount: string;
  is_active: number;
}

interface PaymentHistory {
  id: number;
  amount: string;
  status: string;
  payment_method: string;
  description: string;
  reference: string;
  created_at: string;
}

interface PaymentFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  amount: string;
  paymentMethod: string;
  description: string;
}

const initialFormState: PaymentFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  amount: '',
  paymentMethod: '',
  description: '',
};

const PaymentPlan: React.FC = () => {
  const [plans, setPlans] = useState<PaymentPlan[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const [planType, setPlanType] = useState<'monthly' | 'yearly'>('monthly');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PaymentFormState>(initialFormState);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const selectedAmount = planType === 'monthly' ? '100' : '1000';

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('https://ambchapcorps.org/api/payment/plans');
        const data = await response.json();
        setPlans(data.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSummary = async () => {
      try {
        const response = await fetch('https://ambchapcorps.org/api/payment/memberFeeSummary');
        const data = await response.json();
        setTotalPaid(data.total_sum || 0);
        setPaymentHistory(data.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlans();
    fetchSummary();
  }, []);

  const updateField = (field: keyof PaymentFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlanChange = (value: 'monthly' | 'yearly') => {
    setPlanType(value);
    updateField('amount', value === 'monthly' ? '100' : '1000');
  };

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      const { firstName, lastName, email, phone, amount, paymentMethod, description } = formData;

      if (!firstName || !lastName || !email || !phone || !amount || !paymentMethod || !description) {
        alert('Please complete all the billing fields before continuing.');
        return;
      }

      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!paymentProof) {
      alert('Please upload payment proof.');
      return;
    }

    try {
      setLoading(true);
      const payload = new FormData();
      payload.append('first_name', formData.firstName);
      payload.append('last_name', formData.lastName);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('amount', formData.amount || selectedAmount);
      payload.append('payment_method', formData.paymentMethod);
      payload.append('description', formData.description);
      payload.append('payment_proof_image', paymentProof);

      const response = await fetch('https://ambchapcorps.org/api/payment', {
        method: 'POST',
        body: payload,
      });

      const result = await response.json();

      if (response.ok) {
        setIsComplete(true);
        setStep(4);
      } else {
        alert(result.message || 'Payment failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setStep(1);
    setPlanType('monthly');
    setFormData(initialFormState);
    setPaymentProof(null);
    setIsComplete(false);
  };

  const steps = ['Choose plan', 'Billing details', 'Confirm & upload', 'Complete'];

  return (
    <div className="payment-wizard-page">
      <div className="wizard-shell">
        <header className="wizard-header">
          <div>
            <span className="wizard-eyebrow">Membership payment</span>
            <h1>Complete your payment in a few simple steps</h1>
            <p>Choose your plan, add your details, and confirm your contribution in a clean guided flow.</p>
          </div>

          <div className="wizard-progress" aria-label="Payment progress">
            {steps.map((label, index) => {
              const isActive = step === index + 1 || (isComplete && index === steps.length - 1);
              const isCompleteStep = step > index + 1 || (isComplete && index < steps.length - 1);

              return (
                <div key={label} className={`progress-pill ${isActive ? 'active' : ''} ${isCompleteStep ? 'done' : ''}`}>
                  <span>{index + 1}</span>
                  <p>{label}</p>
                </div>
              );
            })}
          </div>
        </header>

        <div className="wizard-content">
          <div className="wizard-card">
            {step === 1 && (
              <div className="step-panel">
                <div className="step-heading">
                  <span className="step-badge">Step 1</span>
                  <h2>Select your membership plan</h2>
                  <p>Pick the plan that suits your giving rhythm.</p>
                </div>

                <div className="plan-toggle">
                  <button type="button" className={planType === 'monthly' ? 'active' : ''} onClick={() => handlePlanChange('monthly')}>
                    Monthly
                  </button>
                  <button type="button" className={planType === 'yearly' ? 'active' : ''} onClick={() => handlePlanChange('yearly')}>
                    Yearly
                  </button>
                </div>

                <div className="plan-grid">
                  {plans.length > 0 ? (
                    plans.map((planOption) => (
                      <button
                        key={planOption.id}
                        type="button"
                        className={`plan-card ${planType === 'monthly' && planOption.name.toLowerCase().includes('monthly') ? 'selected' : ''} ${planType === 'yearly' && planOption.name.toLowerCase().includes('yearly') ? 'selected' : ''}`}
                        onClick={() => {
                          const nextPlan = planOption.name.toLowerCase().includes('yearly') ? 'yearly' : 'monthly';
                          handlePlanChange(nextPlan);
                          updateField('amount', planOption.monthly_amount);
                        }}
                      >
                        <h3>{planOption.name}</h3>
                        <p>₦{Number(planOption.monthly_amount).toLocaleString()}</p>
                        <span>{planOption.is_active ? 'Active plan' : 'Unavailable'}</span>
                      </button>
                    ))
                  ) : (
                    <>
                      <button type="button" className="plan-card selected" onClick={() => handlePlanChange('monthly')}>
                        <h3>Monthly membership</h3>
                        <p>₦5,000</p>
                        <span>Best for regular support</span>
                      </button>
                      <button type="button" className="plan-card" onClick={() => handlePlanChange('yearly')}>
                        <h3>Yearly membership</h3>
                        <p>₦60,000</p>
                        <span>Best for annual commitment</span>
                      </button>
                    </>
                  )}
                </div>

                <div className="summary-card">
                  <div>
                    <p className="summary-label">Selected plan</p>
                    <h3>{planType === 'monthly' ? 'Monthly membership' : 'Yearly membership'}</h3>
                    <p>Secure contribution for your preferred membership tier.</p>
                  </div>
                  <div className="amount-pill">₦{Number(formData.amount || selectedAmount).toLocaleString()}</div>
                </div>

                <div className="wizard-actions">
                  <button type="button" className="ghost-btn" disabled>Back</button>
                  <button type="button" className="primary-btn" onClick={handleContinue}>Continue</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="step-panel">
                <div className="step-heading">
                  <span className="step-badge">Step 2</span>
                  <h2>Tell us about your payment</h2>
                  <p>We use these details to keep your contribution secure and organized.</p>
                </div>

                <div className="wizard-form">
                  <div className="form-row">
                    <label>
                      First name
                      <input type="text" value={formData.firstName} onChange={(e) => updateField('firstName', e.target.value)} placeholder="First name" />
                    </label>
                    <label>
                      Last name
                      <input type="text" value={formData.lastName} onChange={(e) => updateField('lastName', e.target.value)} placeholder="Last name" />
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      Email address
                      <input type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} placeholder="Email address" />
                    </label>
                    <label>
                      Phone number
                      <input type="text" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="Phone number" />
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      Amount
                      <input type="text" value={formData.amount || selectedAmount} onChange={(e) => updateField('amount', e.target.value)} placeholder="Amount" />
                    </label>
                    <label>
                      Payment method
                      <select value={formData.paymentMethod} onChange={(e) => updateField('paymentMethod', e.target.value)}>
                        <option value="">Select method</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Cash">Cash</option>
                        <option value="POS">POS</option>
                      </select>
                    </label>
                  </div>

                  <label>
                    Description
                    <textarea rows={4} value={formData.description} onChange={(e) => updateField('description', e.target.value)} placeholder="Tell us more about this contribution" />
                  </label>
                </div>

                <div className="wizard-actions">
                  <button type="button" className="ghost-btn" onClick={handleBack}>Back</button>
                  <button type="button" className="primary-btn" onClick={handleContinue}>Continue</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="step-panel">
                <div className="step-heading">
                  <span className="step-badge">Step 3</span>
                  <h2>Confirm your contribution</h2>
                  <p>Review your details and attach proof of payment.</p>
                </div>

                <div className="confirmation-card">
                  <div className="confirmation-row">
                    <span>Plan</span>
                    <strong>{planType === 'monthly' ? 'Monthly membership' : 'Yearly membership'}</strong>
                  </div>
                  <div className="confirmation-row">
                    <span>Amount</span>
                    <strong>₦{Number(formData.amount || selectedAmount).toLocaleString()}</strong>
                  </div>
                  <div className="confirmation-row">
                    <span>Recipient</span>
                    <strong>{`${formData.firstName} ${formData.lastName}`}</strong>
                  </div>
                  <div className="confirmation-row">
                    <span>Method</span>
                    <strong>{formData.paymentMethod || 'Not selected'}</strong>
                  </div>
                </div>

                <label className="upload-box" htmlFor="payment-proof">
                  <span>Upload payment proof</span>
                  <input id="payment-proof" type="file" accept="image/*" onChange={(e) => e.target.files?.length && setPaymentProof(e.target.files[0])} />
                  <small>PNG or JPG image</small>
                </label>

                <div className="wizard-actions">
                  <button type="button" className="ghost-btn" onClick={handleBack}>Back</button>
                  <button type="button" className="primary-btn" onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit payment'}
                  </button>
                </div>
              </div>
            )}

            {step === 4 && isComplete && (
              <div className="step-panel success-panel">
                <div className="success-icon">✓</div>
                <h2>Payment submitted successfully</h2>
                <p>Your request has been received and is being reviewed. A confirmation will be sent to your email shortly.</p>

                <div className="confirmation-card">
                  <div className="confirmation-row">
                    <span>Amount</span>
                    <strong>₦{Number(formData.amount || selectedAmount).toLocaleString()}</strong>
                  </div>
                  <div className="confirmation-row">
                    <span>Reference</span>
                    <strong>ACC-10001</strong>
                  </div>
                </div>

                <button type="button" className="primary-btn" onClick={handleRestart}>Make another payment</button>
              </div>
            )}
          </div>

          <aside className="wizard-sidebar">
            <div className="side-card">
              <h3>Payment summary</h3>
              <div className="summary-row">
                <span>Selected amount</span>
                <strong>₦{Number(formData.amount || selectedAmount).toLocaleString()}</strong>
              </div>
              <div className="summary-row">
                <span>Total contributions</span>
                <strong>₦{Number(totalPaid).toLocaleString()}</strong>
              </div>
              <div className="summary-row">
                <span>Recent history</span>
                <strong>{paymentHistory.length}</strong>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PaymentPlan;