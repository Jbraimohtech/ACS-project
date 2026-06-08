import {
  CheckCircle,
  Sparkles,
} from "lucide-react";

const CurrentPlanCard = () => {
  return (
     <div className="stellarCurrentPlanCard">

      <div className="stellarPlanHeader">

        <div>
          <p>CURRENT PLAN</p>

          <h2>Premium</h2>
        </div>

        <span className="stellarActiveBadge">
          ACTIVE
        </span>

      </div>

      <div className="stellarInvestmentCard">

        <div>

          <span>
            Monthly Investment
          </span>

          <h1>
            $100
            <small>/mo</small>
          </h1>

          <p>
            Next billing cycle:
            Oct 12, 2023
          </p>

          <p>
            Primary: Visa ending in 4242
          </p>

        </div>

        <Sparkles size={24} />
      </div>

      <div className="stellarPlanBottom">

        <div className="stellarPlanBenefits">

          <h4>
            Included in your plan
          </h4>

          <ul>

            <li>
              <CheckCircle size={14} />
              Unlimited canvases and projects
            </li>

            <li>
              <CheckCircle size={14} />
              Advanced team collaboration tools
            </li>

            <li>
              <CheckCircle size={14} />
              24/7 Priority support access
            </li>

          </ul>

        </div>

        <div className="stellarPaymentMethodCard">

          <p>PAYMENT METHOD</p>

          <div className="stellarMiniCard">
            <span>VISA</span>

            <strong>4242</strong>
          </div>

          <small>
            Expires 12/25
          </small>

          <button>Edit</button>

        </div>

      </div>

    </div>
  )
}

export default CurrentPlanCard