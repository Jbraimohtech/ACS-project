import React, { useState } from "react";
import "./Giving.css";
import {
  CalendarDays,
} from "lucide-react";
import AllMainContent from '../components/AllMainContent'
import "../../src/EventsComponents/Event.css"
import MobileScreenNav from '../components/Navbar/MobileScreenNav'
import "./Giving.css"

const GivingContent : React.FC = () => {
    const [donationType, setDonationType] =
    useState<"one-time" | "monthly">("one-time");

  return (
    <div>
      <AllMainContent> 
        <MobileScreenNav />
        <div className='event-head-text-box'>
          
        </div>
        <div  className='giving-head-text'>
          <h1>
            Submit <br /> Your Contribution
          </h1>
        </div>
      </AllMainContent>
      <section className="giving-section-content">
        {/* DONATION CARD */}
        <div className="donation-card">
          {/* TABS */}
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
              className="input"
            />

            <input
              type="text"
              placeholder="Last name"
              className="input"
            />
          </div>

          <input
            type="email"
            placeholder="Email address"
            className="input full"
          />

          {/* PHONE */}
          <div className="phone-input">
            <div className="country-code">
              <span className="green-dot"></span>
              <span>+234</span>
            </div>

            <input
              type="text"
              placeholder="Phone Number"
            />
          </div>

          {/* AMOUNT */}
          <select className="input full">
            <option>Amount</option>
            <option>$10</option>
            <option>$25</option>
            <option>$50</option>
          </select>

          {/* CARDS */}
          <div className="form-grid">
            <input
              type="text"
              placeholder="card"
              className="input"
            />

            <input
              type="text"
              placeholder="card"
              className="input"
            />
          </div>

          <button className="donate-btn">
            Donate Now
          </button>
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
              <CalendarDays size={18} />

              <h3>24%</h3>

              <span>
                Campaign Events Hosted
              </span>
            </div>

            <div className="stat-card">
              <CalendarDays size={18} />

              <h3>30%</h3>

              <span>Digital Outreach</span>
            </div>

            <div className="stat-card">
              <CalendarDays size={18} />

              <h3>25%</h3>

              <span>Operations</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GivingContent