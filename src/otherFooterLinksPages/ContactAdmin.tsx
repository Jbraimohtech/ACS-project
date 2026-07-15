import { useState } from "react";
import "./ContactAdmin.css";
import HomeFooter from "../components/HomeFooter";
import AllMainContent from "../components/AllMainContent";
import Navbar from "../components/Navbar/Navbar";
import BeAccountedFor from "../EventsComponents/BeAccountedFor";
import { Helmet } from "react-helmet";

const ContactAdmin = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const payload = {
      fullName,
      email,
      subject,
      message,
    };

    console.log(payload);

    // Example API call
    // await fetch("https://ambchapcorps.org/api/contact-admin", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // });

    alert("Message sent successfully!");

    setFullName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div>
      <Helmet>
        <title>Contact Administrator - Ambassadors Chaplain Corps</title>
        <meta name="description" content="Reach out to the administration team of the Ambassadors Chaplain Corps for assistance, questions, or feedback." />
        <meta name="keywords" content="contact, administrator, ambassadors, chaplain, corps, support, assistance" />
      </Helmet>
      <AllMainContent>
          <Navbar />
          <div className='about-us-head-text'>
            <h1>Contact Administrator</h1>
            <div className="our-missionSmallText-box">
              <p className="our-missionSmallText">Have questions or need assistance? Contact our administration team.</p>
            </div>
          </div>
        </AllMainContent>
    
    <div className="contact-admin-page">
      <div className="contact-admin-container">
        <h1>Contact Administrator</h1>

        <p>
          Need help? Have a question, complaint, or suggestion?
          Send a message directly to the administration team.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Subject</label>

            <input
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>

            <textarea
              rows={10}
              placeholder="Type your message..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            className="contact-btn"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
    <BeAccountedFor />
    <HomeFooter />
    </div>
  );
};

export default ContactAdmin;