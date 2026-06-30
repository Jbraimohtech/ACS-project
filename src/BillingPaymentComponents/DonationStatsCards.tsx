import { useEffect, useState } from "react";
import { API_BASE } from "../utils/api";
import { getToken } from "../utils/auth";

interface DashboardStats {
  impact_points: number;
  total_donations: number;
}

const DonationStatsCards = () => {
  const [stats, setStats] = useState<DashboardStats>({
    impact_points: 0,
    total_donations: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = getToken();

        const response = await fetch(`${API_BASE}/dashboard`, {
          headers: {
            Accept: "application/json",
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load dashboard");
        }

        const result = await response.json();

        const data = result.data ?? {};

        setStats({
          impact_points: Number(data.impact_points ?? 0),
          total_donations: Number(data.total_donations ?? 0),
        });
      } catch (error) {
        console.error("Failed to fetch dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const formatCurrency = (amount: number) =>
    `₦${amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="orbitStatsGrid">
      <div className="orbitStatCard">
        <span>Total Contributed</span>

        <h2>
          {loading ? "Loading..." : formatCurrency(stats.total_donations)}
        </h2>

        <small>Total donations made</small>
      </div>

      <div className="orbitStatCard">
        <span>Impact Points</span>

        <h2>{loading ? "Loading..." : stats.impact_points}</h2>

        <small>Your contribution score</small>
      </div>
    </div>
  );
};

export default DonationStatsCards;