import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./MemberComponents.css";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`penguinAccordion ${open ? "active" : ""}`}>
      <button
        className="penguinAccordionHeader"
        onClick={() => setOpen(!open)}
      >
        <h3>{question}</h3>

        <ChevronDown
          size={22}
          className={`penguinArrow ${open ? "rotate" : ""}`}
        />
      </button>

      <div
        className={`penguinAccordionBody ${
          open ? "show" : ""
        }`}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default FAQItem;