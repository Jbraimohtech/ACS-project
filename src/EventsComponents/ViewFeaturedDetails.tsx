import {
  CalendarDays,
  MapPin,
  Download,
  CircleCheck,
  X
} from "lucide-react";
import "./Event.css"
import MobileScreenNav from "../components/Navbar/MobileScreenNav";
import AllMainContent from "../components/AllMainContent";
import HomeFooter from "../components/HomeFooter";
import "../blogComponents/Blog.css"
import BlogCard from "../components/BlogCard";
import BeAccountedFor from "./BeAccountedFor";
import { useState } from "react";


const ViewFeaturedDetails: React.FC = () => {
  const [showModal, setShowModal] =
      useState(false);
  return (
    <div>
        <AllMainContent> 
        <MobileScreenNav />
        <div  className='view-featured-head-text'>
          <h1>
            Annual Tech <br /> Symposium 2024
          </h1>
        </div>

      </AllMainContent>
         {/* MAIN GRID */}
      <section className="featured-content-grid">
        {/* EVENT CARD */}
        <button className='event-featured-category-clicks'>
        <BlogCard>
            <div className="featured-event-blog-card">
                <div className='blog-card-prop'>
                    <div className='blog-first-img-featured'>
                        <div className="featured-badge-and-title">
                            <span className="featured-badge">
                                FLAGSHIP EVENT
                            </span>

                            <h2>
                                Annual Tech Symposium 2024
                            </h2>

                            <div className="event-meta">
                                <span>
                                <CalendarDays size={14} />
                                Thur 04 SEP 2026
                                </span>

                                <span>
                                <MapPin size={14} />
                                Las Vegas Convention Center
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='blog-feature-details'>
                    <div className="attendance-card">
                        <div className="under-attendance-card">
                            <div className="small-line"></div>

                            <span className="mini-label">
                            ATTENDANCE STATUS
                            </span>
                        </div>
                        
                        <div className="row-big-text-featured">
                            <h2>450+</h2>
                            <p>
                            Attending from top firms
                            </p>
                        </div>
                        {/* This will be for the phone view */}
                            <div className="row-big-text-featured-phone">
                                <h2>Global Tech Summit 2024</h2>
                                <p>
                                Convention Center • San Francisco, CA
                                </p>
                            </div>
                        {/* End of the phone view */}

                        <button className="rsvp-btn" onClick={() => setShowModal(true)}>
                        <CircleCheck size={16} />
                        RSVP Now
                        </button>
                    </div>
                </div>
            </div>
        </BlogCard>
      </button>

          <div className="row-featured-details">
        {/* LEFT COLUMN */}
        <div className="left-column-featured">
          
          {/* ABOUT */}
          <div className="about-featured-card-one">
            <h3>About the Event</h3>

            <p>
                The Annual Tech Symposium 2024 brings together the world's leading
                minds in artificial intelligence and decentralized networks. This year's
                focus, "The Synergy of Autonomy," explores how AI agents are
                transforming the landscape of distributed ledger technologies.
            </p>

            <p>
                Expect deep-dive sessions into zero-knowledge proofs, agentic
                workflows, and the future of cross-chain interoperability. We gather to
                bridge the gap between theoretical research and enterprise-scale
                implementation.
            </p>

            {/* Phone only */}
            <span className="about-featured-card-phone-text">
                Join us for the 10th Annual Tech Symposium, where global leaders and innovators gather to discuss the future of AI, quantum computing, and sustainable technology. This year features over 50 sessions designed for product managers and technology executives.
            </span>
            {/* End phone only */}

            {/* FEATURES */}
            <div className="feature-grid">
              <div className="feature-item">
                <div className="ai-workshop-icon"></div>
                <span>
                  12+ AI Workshops
                </span>
              </div>

              <div className="feature-item">
                <div className="global-networking-icon"></div>
                <span>
                  Global Networking
                </span>
              </div>

              <div className="feature-item">
                <div className="rocket-icon"></div>
                <span>
                  Startup Pitches
                </span>
              </div>
            </div>
          </div>

          {/* SCHEDULE */}
          <div className="about-featured-card">
            <div className="schedule-header">
                <div>
                    <div className="small-horizontal-line"></div>
                    <h3>Schedule</h3>
                </div>

              <button className="download-btn">
                Download PDF
                <Download size={14} />
              </button>
            </div>

            <div className="schedule-list">
              <div className="schedule-item">
                <div className="time">
                  09:00 AM
                  <p>60 MINS</p>
                </div>

                <div className="schedule-info">
                    <div className="schedule-boxes">
                        <span className="tag blue">
                            KEYNOTE
                        </span>

                        <h4>
                            Opening Keynote:
                            The Future of AI
                        </h4>
                    </div>

                  <p>
                    Main Auditorium · Dr.
                    Sarah Jenkins
                  </p>
                </div>
              </div>

              <div className="schedule-item">
                <div className="time">
                  10:30 AM
                  <p>90 MINS</p>
                </div>

                <div className="schedule-info">
                    <div className="schedule-boxes">
                        <span className="tag purple">
                            PANEL
                        </span>

                        <h4>
                            Decentralized Network
                            Architecture
                        </h4>
                    </div>

                  <p>
                    Room 402B · Lead
                    Architects Panel
                  </p>
                </div>
              </div>

              <div className="schedule-item">
                <div className="time">
                  12:30 PM
                  <p>120 MINS</p>
                </div>

                <div className="schedule-info">
                    <div className="schedule-boxes">
                        <span className="tag green">
                            NETWORKING
                        </span>

                        <h4>
                            Luncheon & Industry
                            Mixer
                        </h4>
                    </div>

                  <p>
                    Sky Lounge Terrace
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="right-column-featured">
          {/* SPEAKERS */}
          <div className="about-featured-card-two">
            <div className="small-line"></div>

            <h3>Featured Speakers</h3>

            <div className="speaker">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt=""
              />

              <div className="speaker-info">
                <h4>
                  Dr. Sarah Jenkins
                </h4>

                <p>
                  Chief AI Officer, Zenith Labs
                </p>
              </div>
            </div>

            <div className="speaker">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt=""
              />

              <div className="speaker-info">
                <h4>Marcus Chen</h4>

                <p>
                  Founder, Decentral Labs
                </p>
              </div>
            </div>

            <div className="speaker">
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt=""
              />

              <div className="speaker-info">
                <h4>
                  Elena Rodriguez
                </h4>

                <p>
                  Lead Dev, Neural Protocols
                </p>
              </div>
            </div>

            <button className="view-btn">
              View All 24 Speakers
            </button>
          </div>

          {/* VENUE */}
            <div className="about-featured-card-map">
                <div className="map"></div>

                <div className="venue-info">
                    <div>
                        <div className="small-line"></div>
                        <span>Venue</span>
                    </div>
                    

                    <h4>
                        Las Vegas Convention
                        Center
                    </h4>

                    <p>
                        3150 Paradise Rd,
                        <br />
                        Las Vegas, NV
                    </p>
                </div>
            </div>

          {/* INFO */}
          <div className="info-box">
            <div className="essential-icon-box">
                <div className="essential-icon"></div>
                <span>Essential Info</span>
            </div>
        
            <div className="under-info-box">
                <span>Dress Code</span>
                <h4>Business Casual</h4>
            </div>
            <div className="under-info-box">
              <span>VIP</span>
              <h4>T8S204L4Qxx</h4>
            </div>
          </div>
          </div>
        </div>
      </section>

      <BeAccountedFor />
      <HomeFooter />

      {/* MODAL */}
        {showModal && (
          <div className="event-modal-overlay">
              <div className="attendance-modal">
                  {/* CLOSE */}
                  <button
                  className="close-btn"
                  onClick={() =>
                      setShowModal(false)
                  }
                  >
                  <X size={28} />
                  </button>

                  {/* CONTENT */}
                  <h2>
                  Confirm Your Attendance
                  </h2>

                  <p>
                  Will you be attending
                  this event?
                  </p>

                  {/* ACTIONS */}
                  <div className="modal-actions">
                  <button className="going-btn">
                      Going
                  </button>

                  <button className="not-going-btn">
                      Not Going
                  </button>
                  </div>
              </div>
          </div>
        )}
    </div>
  )
}

export default ViewFeaturedDetails