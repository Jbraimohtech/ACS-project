
import { useState } from "react";
import "./ReportIssue.css";
import AllMainContent from "../components/AllMainContent";
import Navbar from "../components/Navbar/Navbar";
import HomeFooter from "../components/HomeFooter";


const ReportIssue = () => {
  const [subject, setSubject] = useState("");
  const [report, setReport] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      subject,
      report,
    };

    console.log(payload);

    // Send to API here
    // await fetch("https://ambchapcorps.org/api/reports", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // });

    alert("Report submitted successfully!");

    setSubject("");
    setReport("");
  };


  return (
     <div>
        <AllMainContent>
          <Navbar />
          <div className='about-us-head-text'>
            <h1>Report Issue</h1>
            <div className="our-missionSmallText-box">
              <p className="our-missionSmallText">Make your report.</p>
            </div>
          </div>
        </AllMainContent>
        <div className="report-page">
      <div className="report-container">
        <h1>Submit a Report</h1>

        <p>
          Use the form below to submit a report, complaint,
          suggestion, or concern to the organization.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>

            <input
              id="subject"
              type="text"
              placeholder="Enter report subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="report">Report Details</label>

            <textarea
              id="report"
              placeholder="Write your report here..."
              value={report}
              onChange={(e) => setReport(e.target.value)}
              rows={15}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit Report
          </button>
        </form>
      </div>
      
    </div>
    <HomeFooter />
    </div>
  );
};

export default ReportIssue