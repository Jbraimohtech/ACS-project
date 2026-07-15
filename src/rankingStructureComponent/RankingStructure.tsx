import { Helmet } from "react-helmet";
import AllMainContent from "../components/AllMainContent";
import HomeFooter from "../components/HomeFooter";
import Navbar from "../components/Navbar/Navbar";
import "./RankingStructure.css";

interface RankItem {
  id: number;
  portfolio: string;
  appellation: string;
  level: string;
}

const rankings: RankItem[] = [
  {
    id: 1,
    portfolio: "Commandant General",
    appellation: "CG",
    level: "Crest • 2 Stars • Eagle",
  },
  {
    id: 2,
    portfolio: "Deputy Commandant General",
    appellation: "DCG",
    level: "Crest • 1 Star • Eagle",
  },
  {
    id: 3,
    portfolio: "General Officer Commanding",
    appellation: "GOC",
    level: "Crest • 2 Bars • Eagle",
  },
  {
    id: 4,
    portfolio: "Assistant Commandant General",
    appellation: "ACG",
    level: "Crest • 1 Bar • Eagle",
  },
  {
    id: 5,
    portfolio: "Zonal Commanding Officer",
    appellation: "ZCO",
    level: "Crest • 3 Stars",
  },
  {
    id: 6,
    portfolio: "State Commander",
    appellation: "SCO",
    level: "Crest • 2 Stars",
  },
  {
    id: 7,
    portfolio: "Deputy State Commander",
    appellation: "DSC",
    level: "Crest • 2 Stars",
  },
  {
    id: 8,
    portfolio: "Area Commander",
    appellation: "ACO",
    level: "Crest",
  },
  {
    id: 9,
    portfolio: "Lieutenant Commander",
    appellation: "LCO",
    level: "3 Stars",
  },
  {
    id: 10,
    portfolio: "Lieutenant",
    appellation: "LT",
    level: "2 Stars",
  },
  {
    id: 11,
    portfolio: "Sub-Lieutenant",
    appellation: "SLT",
    level: "1 Star",
  },
  {
    id: 12,
    portfolio: "Chaplain Warrant Officer",
    appellation: "CWO",
    level: "Eagle",
  },
  {
    id: 13,
    portfolio: "Master Warrant Officer",
    appellation: "MWO",
    level: "3 Bars",
  },
  {
    id: 14,
    portfolio: "Warrant Officer",
    appellation: "WO",
    level: "2 Bars",
  },
  {
    id: 15,
    portfolio: "Leading Chaplain",
    appellation: "LCN",
    level: "1 Bar",
  },
  {
    id: 16,
    portfolio: "Searching Chaplain",
    appellation: "-",
    level: "3 Stripes",
  },
  {
    id: 17,
    portfolio: "Corps Chaplain",
    appellation: "-",
    level: "2 Stripes",
  },
  {
    id: 18,
    portfolio: "Private Chaplain",
    appellation: "-",
    level: "1 Stripe",
  },
  {
    id: 19,
    portfolio: "Cadet Trainee",
    appellation: "CADET",
    level: "-",
  },
  {
    id: 20,
    portfolio: "New Enlistment (Trainee)",
    appellation: "-",
    level: "-",
  },
];

const RankingStructure = () => {
  return (
    <div>
      <Helmet>
        <title>Ranking Structure - Ambassadors Chaplain Corps</title>
        <meta name="description" content="Explore the structured ranking system of the Ambassadors Chaplain Corps, promoting discipline, leadership, and accountability." />
      </Helmet>
      <AllMainContent> 
        <Navbar />
        <div  className='event-head-text-our-leaders'>
          <h1>
            Our Ranking Structure
          </h1>
        </div> 
      </AllMainContent>
      <section className="rocketRankingUniverse">
      <div className="waffleRankingHeading">

        <span className="bananaBadge">
          ACC STRUCTURE
        </span>

        <h2>
          ACC Ranking Structure
        </h2>

        <p>
          The Ambassadors Chaplain Corps adopts a structured ranking system
          that promotes discipline, leadership, accountability, and orderly
          progression within the Corps.
        </p>

      </div>

      <div className="pickleTableWrapper">

        <table className="cheeseRankingTable">

          <thead>

            <tr>

              <th>S/N</th>

              <th>Portfolio</th>

              <th>Appellation</th>

              <th>Rank Level</th>

            </tr>

          </thead>

          <tbody>

            {rankings.map((rank) => (

              <tr key={rank.id}>

                <td>{rank.id}</td>

                <td>{rank.portfolio}</td>

                <td>{rank.appellation}</td>

                <td>{rank.level}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="penguinLegend">

        <h3>Rank Insignia Guide</h3>

        <div className="penguinLegendGrid">

          <span>⭐ Star</span>

          <span>🟦 Bar</span>

          <span>🦅 Eagle</span>

          <span>🎖 Crest</span>

          <span>➖ Stripe</span>

        </div>

      </div>

    </section>
    <HomeFooter />
    </div>
  );
};

export default RankingStructure;