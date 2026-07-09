import React from "react";
import "./LeadershipSection.css";
import { Users, Award, Shield, Star } from "lucide-react";

interface Leader {
  name: string;
  title: string;
  status?: string;
  image?: string;
}

interface LeadershipGroup {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  leaders: Leader[];
}

/* ===========================================================
   Reusable Leader Card
=========================================================== */

const LeaderCard = ({ leader }: { leader: Leader }) => {
  return (
    <div className="rocketBananaCard">
      <div className="pickleAvatarBox">
        {leader.image ? (
          <img
            src={leader.image}
            alt={leader.name}
            className="pickleAvatar"
          />
        ) : (
          <div className="pickleAvatarPlaceholder">
            {leader.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .substring(0, 2)}
          </div>
        )}
      </div>

      <div className="waffleLeaderInfo">
        <h3>{leader.name}</h3>

        <p>{leader.title}</p>

        {leader.status && (
          <span
            className={`bananaStatus ${
              leader.status.toLowerCase().includes("late")
                ? "bananaLate"
                : "bananaActive"
            }`}
          >
            {leader.status}
          </span>
        )}
      </div>
    </div>
  );
};

/* ===========================================================
   Reusable Leadership Section
=========================================================== */

const SectionBlock = ({ group }: { group: LeadershipGroup }) => {
  return (
    <section className="cheeseGalaxySection">

      <div className="pizzaSectionHeading">

        <div className="pizzaIcon">

          {group.icon}

        </div>

        <div className="pizzaText">

          <h2>{group.title}</h2>

          <p>{group.subtitle}</p>

        </div>

      </div>

      <div className="penguinGrid">

        {group.leaders.map((leader, index) => (
          <LeaderCard
            key={index}
            leader={leader}
          />
        ))}

      </div>

    </section>
  );
};

/* ===========================================================
   DATA
=========================================================== */

/* ---------------------------
   A. Promoters / Subscribers
---------------------------- */

const promoters: LeadershipGroup = {
  icon: <Users size={28} />,
  title: "The Promoters & Subscribers",
  subtitle:
    "Founding promoters and subscribers to the Memorandum and Articles of Association.",

  leaders: [
    {
      name: "Revd. Dr. Enebeli-Ebube Mikie Uche",
      title: "Promoter",
      status: "Late",
    },

    {
      name: "Archbishop C. A. O. Apena JP",
      title: "Promoter",
    },

    {
      name: "Bishop Anthony Karuna",
      title: "Promoter",
    },

    {
      name: "Revd. Dr. Edet F. Akpa",
      title: "Promoter",
    },

    {
      name: "Revd. Dr. Awhotu Sapele Tamisere",
      title: "Promoter",
    },
  ],
};

/* ---------------------------
   B. Board of Trustees
---------------------------- */

const boardOfTrustees: LeadershipGroup = {
  icon: <Shield size={28} />,
  title: "Board of Trustees",
  subtitle:
    "The governing board responsible for oversight, accountability and institutional leadership.",

  leaders: [
    {
      name: "Most Rev. (Dr.) C. A. O. Apena JP",
      title: "Chairman",
      status: "Late",
    },

    {
      name: "Bishop (Barr.) Gimbright Adaigho",
      title: "Secretary",
    },

    {
      name: "Rev. (Dr.) J. T. Fajuyigbe JP",
      title: "Assistant Secretary",
    },

    {
      name: "Hon. Joshua Mape",
      title: "Member",
    },

    {
      name: "Rev. (Dr.) S. A. Tamisere",
      title: "Member",
    },

    {
      name: "Chap. Gen. (Dr.) Mrs. Julianah E. Ebube",
      title: "Member",
    },

    {
      name: "Rev. (Dr.) Tom Oshoakpeme",
      title: "Member",
    },

    {
      name: "Rev. Joe Osarumwese",
      title: "Member",
    },

    {
      name: "Bishop Anthony Karuna",
      title: "Member",
      status: "Late",
    },
  ],
};

/* ---------------------------
   C. Pioneering National Executive Members
---------------------------- */

const pioneeringExecutives: LeadershipGroup = {
  icon: <Award size={28} />,
  title: "Pioneering National Executive Members",
  subtitle:
    "The pioneering executives who laid the foundation of Ambassadors Chaplain Corps.",

  leaders: [
    {
      name: "Late Chap. Gen. M. U. Enebeli Ebube",
      title: "Founding General",
      status: "Late",
    },

    {
      name: "Chap. Jonathan Osarumwese",
      title: "Deputy Commandant General",
    },

    {
      name: "Late Chap. Solomon Okagbare",
      title: "National Secretary",
      status: "Late",
    },

    {
      name: "Chaplain Stephen Oghogho",
      title: "Director, Logistics & Training",
    },

    {
      name: "Chap. (Dr.) S. A. Tamisere",
      title: "Treasurer",
    },

    {
      name: "Chap. Dennis Aguinede",
      title: "GOC South",
    },

    {
      name: "Chap. D. Kampe",
      title: "GOC North",
    },

    {
      name: "Chap. Odiri",
      title: "Welfare Officer",
    },

    {
      name: "Chap. S. E. Idaehor",
      title: "Public Relations Officer",
    },

    {
      name: "Chap. (Barr.) Gimbright Adaigho",
      title: "Legal Adviser",
    },
  ],
};

/* ===========================================================
   Part 1A ends here.

   Part 1B will contain:

   - Patrons & Matrons
   - Zonal Commandants
   - State Commandants
   - Present Board of Trustees
   - Present National Executives
   - Present State Commandants
   - LeadershipSection component
   - export default LeadershipSection

=========================================================== */
/* ===========================================================
   D. Patrons & Matrons
=========================================================== */

const patrons: LeadershipGroup = {
  icon: <Star size={28} />,
  title: "Patrons & Matrons",
  subtitle:
    "Distinguished spiritual fathers, mothers and senior leaders who provide guidance to the Corps.",

  leaders: [
    {
      name: "Chap. Most Rev. (Dr.) C. A. O. Apena JP",
      title: "Patron",
      status: "Late",
    },
    {
      name: "Chap. (Dr.) S. A. Tamisere",
      title: "Patron",
    },
    {
      name: "Chap. Elder Alexander Ohunyon",
      title: "Patron",
    },
    {
      name: "Chap. Joshua Mape",
      title: "Patron",
    },
    {
      name: "Chap. Rev. (Dr.) Tom Oshoakpeme",
      title: "Patron",
      status: "Late",
    },
    {
      name: "Chap. Rev. (Mrs.) J. Oshoakpeme",
      title: "Matron",
    },
    {
      name: "Chap. Bishop Joshua Ketiku",
      title: "Patron",
      status: "Late",
    },
    {
      name: "Chap. Bishop (Dr.) Paseda A. Steve",
      title: "Patron",
    },
  ],
};

/* ===========================================================
   E. Past Zonal Commandants
=========================================================== */

const zonalCommandants: LeadershipGroup = {
  icon: <Users size={28} />,
  title: "Past Zonal Commandants",
  subtitle:
    "Regional leaders responsible for coordinating operations across the geopolitical zones.",

  leaders: [
    {
      name: "Chap. Monday",
      title: "North East Commandant",
    },
    {
      name: "Chap. Clement",
      title: "North Central Commandant",
    },
    {
      name: "Chap. Onyem",
      title: "South West Commandant",
    },
  ],
};

/* ===========================================================
   F. Past State Commandants
=========================================================== */

const stateCommandants: LeadershipGroup = {
  icon: <Shield size={28} />,
  title: "Past State Commandants",
  subtitle:
    "State Commandants who provided leadership within their respective states.",

  leaders: [
    {
      name: "Chap. S. E. Idaehor",
      title: "Edo State",
    },
    {
      name: "Chap. E. Paul",
      title: "Delta State",
    },
    {
      name: "Chap. David Simire",
      title: "Ondo State",
    },
    {
      name: "Chap. Abu Kebiru",
      title: "Ekiti State",
    },
    {
      name: "Chap. Paul Adekunle",
      title: "Oyo State",
    },
    {
      name: "Chap. W. Peter",
      title: "Anambra State",
      status: "Late",
    },
    {
      name: "Chap. Paul Ene",
      title: "Cross River State",
    },
    {
      name: "Chap. Goro",
      title: "Plateau State",
    },
  ],
};

/* ===========================================================
   PRESENT BOARD OF TRUSTEES
=========================================================== */

const presentBoard: LeadershipGroup = {
  icon: <Shield size={28} />,
  title: "Present Board of Trustees",
  subtitle:
    "Current Board of Trustees overseeing governance and accountability.",

  leaders: [
    {
      name: "Bishop (Barr.) Gimbright Adaigho",
      title: "Secretary",
    },
    {
      name: "Rev. (Dr.) J. T. Fajuyigbe JP",
      title: "Assistant Secretary",
    },
    {
      name: "Hon. Joshua Mape",
      title: "Member",
    },
    {
      name: "Rev. (Dr.) S. A. Tamisere",
      title: "Member",
    },
    {
      name: "Chap. Gen. (Dr.) Mrs. Julianah E. Ebube",
      title: "Member",
    },
    {
      name: "Rev. Joe Osarumwese",
      title: "Member",
    },
  ],
};

/* ===========================================================
   PRESENT NATIONAL EXECUTIVES
=========================================================== */

const presentExecutives: LeadershipGroup = {
  icon: <Award size={28} />,
  title: "Present National Executive Members",
  subtitle:
    "The current national leadership guiding the vision and mission of ACC.",

  leaders: [
    {
      name: "Chap. Gen. Julianah Enebeli Ebube",
      title: "Commandant General",
    },
    {
      name: "Chap. Jonathan Osarumwese",
      title: "Deputy Commandant General",
    },
    {
      name: "Chap. Adekunle Paul",
      title: "National Secretary",
    },
    {
      name: "Chaplain Stephen Oghogho",
      title: "Director, Logistics & Training",
    },
    {
      name: "Chap. (Dr.) S. A. Tamisere",
      title: "Treasurer",
    },
    {
      name: "Chap. (Barr.) Gimbright Adaigho",
      title: "Legal Adviser",
    },
  ],
};

/* ===========================================================
   PRESENT STATE COMMANDANTS
=========================================================== */

const presentStateCommandants: LeadershipGroup = {
  icon: <Users size={28} />,
  title: "Present State Commandants",
  subtitle:
    "Current State Commandants leading ACC activities within their respective states.",

  leaders: [
    {
      name: "Chap. John Ighome",
      title: "Edo State",
    },
    {
      name: "Chap. Amb. (Barr.) Ofuonyebi N. A. N.",
      title: "Ondo State",
    },
    {
      name: "Chap. Rufus Etimnwoba",
      title: "Oyo State",
    },
    {
      name: "Chap. Peter O.",
      title: "Enugu State",
    },
    {
      name: "Chap. Emmanuel Okechukwu",
      title: "Anambra State",
    },
  ],
};

/* ===========================================================
   Leadership Section Component
=========================================================== */

const LeadershipSection = () => {
  return (
    <div className="marshmallowUniverse">

      <SectionBlock group={promoters} />

      <SectionBlock group={boardOfTrustees} />

      <SectionBlock group={pioneeringExecutives} />

      <SectionBlock group={patrons} />

      <SectionBlock group={zonalCommandants} />

      <SectionBlock group={stateCommandants} />

      <SectionBlock group={presentBoard} />

      <SectionBlock group={presentExecutives} />

      <SectionBlock group={presentStateCommandants} />

    </div>
  );
};

export default LeadershipSection;