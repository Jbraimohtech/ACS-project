import { useEffect, useState } from "react";
import type { RegisterData } from "./RegisterWizard";
import { Link } from "react-router-dom";

interface Props {
  data: RegisterData;
  setData: React.Dispatch<
    React.SetStateAction<RegisterData>
  >;
  nextStep: () => void;
}

interface Zone {
  id: number;
  name: string;
  status: string;
  image: string | null;
  created_at: string;
  updated_at: string;
}

const StepZone = ({
  data,
  setData,
  nextStep,
}: Props) => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await fetch(
          "https://ambchapcorps.org/api/zone",
          {
            method: "GET",
            mode: "cors",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch zones");
        }

        const result = await response.json();

        if (result.data && Array.isArray(result.data)) {
          setZones(result.data);
        } else {
          setError("No zones available");
        }
      } catch (err) {
        console.error("Error fetching zones:", err);
        setError("Failed to load zones. Please try again.");
        alert("Failed to load zones. Please refresh the page.");
      }
    };

    fetchZones();
  }, []);

  const handleContinue = () => {
    if (!data.zone) {
      alert("Please select a zone to continue.");
      return;
    }
    nextStep();
  };

  return (
    <div className="wizardCardZoneAspect">
      <div className="wizardCard-zoneBox">
        <span className="span-one">Step 1</span>
        <span className="span-zone">Zone</span>
      </div>

      <div className="wizardCard-zonePickBox">
        <h2>Zone</h2>

        {error && (
          <p style={{color: "red", fontSize: "14px", marginBottom: "10px"}}>
            {error}
          </p>
        )}

        <select
          value={data.zone}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              zone: e.target.value ? Number(e.target.value) : "",
            }))
          }
          disabled={zones.length === 0}
        >
          <option value="">
            {zones.length === 0
              ? "No zones available"
              : "Select Zone"}
          </option>

          {zones.map((zone) => (
            <option
              key={zone.id}
              value={zone.id}
            >
              {zone.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleContinue}
          disabled={!data.zone}
        >
          Continue
        </button>
      </div>

      <p className="wizardCard-signIn">
        Got an account? <span className="wizardCard-signIn-span"><Link to="/login" style={{textDecoration: "none", color: "black"}}>Sign in</Link></span> 
      </p>
    </div>
  );
};

export default StepZone;