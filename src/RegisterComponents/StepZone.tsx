import { useEffect, useState } from "react";
import type { RegisterData } from "./RegisterWizard";

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
  const [loading, setLoading] = useState(true);

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

        setZones(result.data);
      } catch (error) {
        console.error("Error fetching zones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchZones();
  }, []);

  return (
    <div className="wizardCardZoneAspect">
      <div className="wizardCard-zoneBox">
        <span className="span-one">Step 1</span>
        <span className="span-zone">Zone</span>
      </div>

      <div className="wizardCard-zonePickBox">
        <h2>Zone</h2>

        <select
          value={data.zone}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              zone: Number(e.target.value),
            }))
          }
        >
          <option value="">
            {loading
              ? "Loading zones..."
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
          onClick={nextStep}
          disabled={!data.zone}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default StepZone;