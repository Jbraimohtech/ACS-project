
import { useState } from "react";
import "./ReportIssue.css";


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
  );
};

export default ReportIssue