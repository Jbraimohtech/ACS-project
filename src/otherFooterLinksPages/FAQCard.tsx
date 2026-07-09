import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./MemberComponents.css";

interface FAQCardProps {
  question: string;
  answer: string;
}

const FAQCard = ({
  question,
  answer,
}: FAQCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="penguinFlexFAQ">

      <button
        className="penguinFlexButton"
        onClick={() => setOpen(!open)}
      >
        <span>{question}</span>

        <ChevronDown
          size={20}
          className={open ? "rotate" : ""}
        />
      </button>

      <div
        className={`penguinFlexAnswer ${
          open ? "open" : ""
        }`}
      >
        <p>{answer}</p>
      </div>

    </div>
  );
};

export default FAQCard;