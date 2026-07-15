import { Helmet } from "react-helmet"
import AllMainContent from "../components/AllMainContent"
import HomeFooter from "../components/HomeFooter"
import Navbar from "../components/Navbar/Navbar"
import BeAccountedFor from "../EventsComponents/BeAccountedFor"
import "./OurMissionLink.css"

const OurMissionLink = () => {
  return (
    <div>
      <Helmet>
        <title>Our Mission - Ambassadors Chaplain Corps</title>
        <meta name="description" content="Discover the mission that drives our organization and inspires our commitment to service, leadership, and impact." />
        <meta name="keywords" content="mission, ambassadors, chaplain, corps, service, leadership, impact" />
      </Helmet> 
        <AllMainContent>
          <Navbar />
          <div className='about-us-head-text'>
            <h1>Our Mission</h1>
            <div className="our-missionSmallText-box">
              <p className="our-missionSmallText">Discover the mission that drives our organization and inspires our commitment to service, leadership, and impact.</p>
            </div>
          </div>
        </AllMainContent>
        <div className='content-box-vision'>
        <div className='content-numbering'>
          <div className='number-reason-box'>
            <div className='number-reason-item'>
              <p>01</p>
            </div>
            <h3 className='number-reason-text'>Our Mission</h3>
          </div>
        </div>
        <div className='reason-content-box'>
          <div className='reason-title-two'>
            <h2>
              Equipping Servants of God as Ambassadors - 2Cor 5:20
            </h2>
          </div>
        </div>

        
          <div className='mission-images-box'>
            <div className='man-and-woman'></div>
            <div className='church-settings'></div>
          </div>
      </div>
        <div>
        <div className='content-box'>
        <div className='content-numbering'>
          <div className='number-reason-box'>
            <div className='number-reason-item'>
              <p>02</p>
            </div>
            <h3 className='number-reason-text'>Vision</h3>
          </div>
        </div>

        <div className='transform-content-box'>
          <h1>Our Vision Is Influencing The World Positively With The Principle's Of The Kingdom Of God, Starting From Our Immediate Environment(S) Through Disciplined Chaplains And Chaplaincy Ministry.</h1>
        </div>

        <div className='vision-images-new'>
          <div className='pastor'></div>
          <div className='commander'></div>
        </div>
      </div>
      </div>
        <div className='about-org-boxAbout'>
      <div className='about-org-con-pc'>
        <div className='about-content-box'>
          <div className='content-numbering-mission'>
            <div className='number-reason-box'>
              <div className='number-reason-item'>
                <p>06</p>
              </div>
              <h3 className='about-reason-textAbout'>Aims and Objectives</h3>
            </div>
          </div>
        </div>

        <div className='say-no-box'>
          <div className='say-no-icon'></div>
          <p>To reduce crime, corruption and cultism — the three C’s (which have eaten deep into the fabric of Nigeria as a nation) to the barest minimum level.</p>
        </div>
        <div className='say-no-box'>
          <div className='old-man-image'></div>
          <p> To effectively manage aids and relief materials during disasters, emergency, and other times.</p>
        </div>
        <div className='say-no-box'>
          <div className='arms-giving'></div>
          <p>To co-operatively assist accident victims through the medical unit of the Corps by rendering First Aid Service both spiritually and physically in times of emergency situations like accidents, disasters, environmental mishaps etc.</p>
        </div>
      </div>

      <div className='about-org-con-pc'>
        <div className='say-no-box'>
          <div className='tailor-boy'></div>
          <p>
            To establish skill acquisition centers for human and capital development as this will make them self-independent and self-employed
          </p>
        </div>
        <div className='say-no-box'>
          <div className='classroom-pastor'></div>
          <p>
            To educate religious clerics like pastors, 
            Christian leaders, workers, and matured 
            Christians, who will serve as Chaplain officers in such areas as civil society, military and paramilitary establishments, on acceptable best practices at all times and during crises situations such as civil disturbances, national emergencies and disasters.
          </p>
        </div>
        <div className='say-no-box'>
          <div className='military-march'></div>
          <p>To maintain the highest standards of Chaplaincy corps member's conduct, etiquette and discipline</p>
        </div>
      </div>

{/* Phone Screen for the about-org-con because the styling is extremely different */}
      <div className='about-org-con-phone'>
        <div className='about-content-box'>
          <div className='content-numbering-mission'>
            <div className='number-reason-box'>
              <div className='number-reason-item'>
                <p>07</p>
              </div>
              <h3 className='about-reason-textAbout'>Aims and Objectives</h3>
            </div>
          </div>
        </div>
        
        <div className='say-no-box'>
          <div className='say-no-icon'></div>
          <p>To reduce crime, corruption and cultism — the three C’s (which have eaten deep into the fabric of Nigeria as a nation) to the barest minimum level.</p>
        </div>
        <div className='say-no-box'>
          <div className='tailor-boy'></div>
          <p>
            To establish skill acquisition centers for human and capital development as this will make them self-independent and self-employed
          </p>
        </div>
        <div className='say-no-box'>
          <div className='old-man-image'></div>
          <p> To effectively manage aids and relief materials during disasters, emergency, and other times.</p>
        </div>
        <div className='say-no-box'>
          <div className='classroom-pastor'></div>
          <p>
            To educate religious clerics like pastors, 
            Christian leaders, workers ,and matured 
            Christians, who will serve as Chaplain officers in such areas as civil society, military and paramilitary establishments, on acceptable best practices at all times and during crises situations such as civil disturbances, national emergencies and disasters.
          </p>
        </div>
        <div className='say-no-box'>
          <div className='arms-giving'></div>
          <p>To co-operatively assist accident victims through the medical unit of the Corps by rendering First Aid Service both spiritually and physically in times of emergency situations like accidents, disasters, environmental mishaps etc.</p>
        </div>
        <div className='say-no-box'>
          <div className='military-march'></div>
          <p>To maintain the highest standards of Chaplaincy corps member's conduct, etiquette and discipline</p>
        </div>
      </div>
    </div>
        <BeAccountedFor />
        <HomeFooter />
    </div>
  )
}

export default OurMissionLink