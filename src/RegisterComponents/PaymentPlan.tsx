import React, { useEffect, useState } from 'react';
import './PaymentPlanWizard.css';
import { getToken, setUser, getUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

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

interface PaymentFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  amount: string;
  paymentMethod: string;
}

const initialFormState: PaymentFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  amount: '',
  paymentMethod: '',
};

const PaymentPlan: React.FC = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<PaymentPlan[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const [planType, setPlanType] = useState<'monthly' | 'yearly'>('monthly');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PaymentFormState>(initialFormState);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [bankAccounts, setBankAccounts] = useState<BankAccountsPayload | null>(null);

  const selectedAmount =
  planType === "monthly"
    ? "5000"
    : "60000";

  useEffect(() => {
    const storedUser = getUser() as {
      first_name?: string;
      firstName?: string;
      last_name?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      phone_number?: string;
    } | null;

    if (storedUser) {
      setFormData((prev) => ({
        ...prev,
        firstName: storedUser.first_name ?? storedUser.firstName ?? prev.firstName,
        lastName: storedUser.last_name ?? storedUser.lastName ?? prev.lastName,
        email: storedUser.email ?? prev.email,
        phone: storedUser.phone ?? storedUser.phone_number ?? prev.phone,
      }));
    }

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

    const fetchBankAccounts = async () => {
      try {
        const token = getToken();
        const response = await fetch('https://ambchapcorps.org/api/bank-accounts', {
          headers: {
            Accept: 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json().catch(() => ({}));
        const payload = data && typeof data === 'object' ? (data.data ?? data) : data;

        setBankAccounts({
          membership_fee_account: payload?.membership_fee_account ?? payload?.membership ?? undefined,
          donation_account: payload?.donation_account ?? payload?.donation ?? undefined,
        });
      } catch (error) {
        console.error('Failed to fetch bank accounts', error);
      }
    };

    fetchPlans();
    fetchSummary();
    fetchBankAccounts();
  }, []);

  const updateField = (field: keyof PaymentFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlanChange = (value: 'monthly' | 'yearly') => {
    setPlanType(value);
    updateField('amount', value === 'monthly' ? '5000' : '60000');
  };

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      const { firstName, lastName, email, phone, amount, paymentMethod } = formData;

      if (!firstName || !lastName || !email || !phone || !amount || !paymentMethod) {
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
      const token = getToken();
      const chosenAccount = bankAccounts?.membership_fee_account ?? bankAccounts?.donation_account;
      const payload = new FormData();
      payload.append('first_name', formData.firstName);
      payload.append('last_name', formData.lastName);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('amount', formData.amount || selectedAmount);
      payload.append('payment_method', formData.paymentMethod);
      payload.append('description', 'membership_fee');
      payload.append('payment_proof_image', paymentProof);

      if (chosenAccount?.id) {
        payload.append('bank_account_id', String(chosenAccount.id));
      } else if (chosenAccount) {
        payload.append('bank_account_name', chosenAccount.account_name ?? '');
      }

      const response = await fetch('https://ambchapcorps.org/api/payment/pay', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: payload,
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        const storedUser = getUser();
        setUser({
          ...(storedUser ?? {}),
          status: 'approved',
          payment_status: 1,
          NewMemberNotPaid: false,
        });
        setIsComplete(true);
        setStep(4);
      } else {
        const errorMessage =
          typeof result?.message === 'string'
            ? result.message
            : result?.errors && typeof result.errors === 'object'
              ? Object.values(result.errors)
                  .flatMap((value) => (Array.isArray(value) ? value : [String(value)]))
                  .join('\n')
              : 'Payment failed. Please try again.';

        alert(errorMessage);
      }
    } catch (error) {
      console.error(error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
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
                  <button type="button" className="ghost-btn" disabled={!isComplete} onClick={() => navigate('/register')}>Back</button>
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
                      Phone Number
                      <input type="text" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="Phone Number" />
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      Amount
                      <input type="number" step="0.01" min="0" value={formData.amount || selectedAmount} onChange={(e) => updateField('amount', e.target.value)} placeholder="₦ 0.00" />
                    </label>
                    <label>
                      Payment Method
                      <select value={formData.paymentMethod} onChange={(e) => updateField('paymentMethod', e.target.value)}>
                        <option value="">Select Payment Method</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Cash">Cash</option>
                        <option value="POS">POS</option>
                      </select>
                    </label>
                  </div>
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

                <button type="button" className="primary-btn" onClick={() => navigate('/dashboard-page', { replace: true })}>Go to dashboard</button>
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