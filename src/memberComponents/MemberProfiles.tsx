import "./Member.css";
import mosesImg from "../assets/images/moses.jpg";

interface Member {
  id: number;
  name: string;
  title: string;
  image: string;
}

const members: Member[] =  [
  {
    id: 1,
    name: "Rev. Dr. Enebeli-Ebube Mikie Uche [Late]",
    title: "Past Officer",
    image: mosesImg,
  },

  {
    id: 2,
    name: "Archbishop C. A. O. Apena [JP]",
    title: "Past Officer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },

  {
    id: 3,
    name: "Bishop Anthony Karuna",
    title: "Past Officer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },

  {
    id: 4,
    name: "Rev Dr. Edet F. Akpa",
    title: "Past Officer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },

  {
    id: 5,
    name: "Rev. Dr. Awhotu Sapele Tamisere",
    title: "Past Officer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },

  {
    id: 6,
    name: "Rev. Dr. Awhotu Sapele Tamisere",
    title: "Past Officer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },

  {
    id: 7,
    name: "Rev. Dr. Awhotu Sapele Tamisere",
    title: "Past Officer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },

  {
    id: 8,
    name: "Rev. Dr. Awhotu Sapele Tamisere",
    title: "Past Officer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },

  {
    id: 9,
    name: "Rev. Dr. Awhotu Sapele Tamisere",
    title: "Past Officer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },

  {
    id: 10,
    name: "Rev. Dr. Awhotu Sapele Tamisere",
    title: "Past Officer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },

  {
    id: 11,
    name: "Rev. Dr. Awhotu Sapele Tamisere",
    title: "Past Officer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },

  {
    id: 12,
    name: "Rev. Dr. Awhotu Sapele Tamisere",
    title: "Past Officer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
];

const MemberProfiles = () => {
  return (
    <div className='member-profiles-box'>
        {/* TABS */}
      <div className="tabs">

        <button className="active">
          Past Members
        </button>

        <button>
          Present Officers and Excos
        </button>

        <button>
          ACC Ranking
        </button>

      </div>

      {/* MEMBERS */}
      <section className="members-section">

        <h1 className="section-title">
          PAST OFFICERS
        </h1>

        <p className="section-subtitle">
          A. THE PROMOTERS AND/OR SUBSCRIBERS
          TO THE MEMO AND ARTICLES OF ASSOCIATION ARE:
        </p>

        {/* GRID */}
        <div className="members-grid">

          {members.map((member) => (

            <div className="member-card" key={member.id}>

              <img
                src={member.image}
                alt={member.name}
              />

              <div className="member-content">

                <h3>{member.name}</h3>

                <p>{member.title}</p>

                <button>
                  View Profile
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  )
}

export default MemberProfiles