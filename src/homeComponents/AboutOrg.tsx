
import ScrollReveal from "../components/ScrollReveal"
import "./Home.css"

const OurMission = () => {
  return (
    <div className='about-org-box'>
      <div className='about-org-con-pc'>
        <div className='about-content-box'>
          <div className='content-numbering-mission'>
            <div className='number-reason-box'>
              <div className='number-reason-item'>
                <p>04</p>
              </div>
              <h3 className='about-reason-text'>Aims and Objectives</h3>
            </div>
          </div>
        </div>

        <div className='say-no-box'>
          <ScrollReveal>
            <div className='say-no-icon'></div>
            <p>To reduce crime, corruption and cultism — the three C’s (which have eaten deep into the fabric of Nigeria as a nation) to the barest minimum level.</p>
          </ScrollReveal>
        </div>
        <div className='say-no-box'>
          <ScrollReveal>
            <div className='old-man-image'></div>
            <p> To effectively manage aids and relief materials during disasters, emergency, and other times.</p>
          </ScrollReveal>
        </div>
        <div className='say-no-box'>
          <ScrollReveal>
            <div className='arms-giving'></div>
            <p>To co-operatively assist accident victims through the medical unit of the Corps by rendering First Aid Service both spiritually and physically in times of emergency situations like accidents, disasters, environmental mishaps etc.</p>
          </ScrollReveal>
        </div>
      </div>

      <div className='about-org-con-pc'>
        <div className='say-no-box'>
          <ScrollReveal>
            <div className='tailor-boy'></div>
            <p>
              To establish skill acquisition centers for human and capital development as this will make them self-independent and self-employed
            </p>
          </ScrollReveal>
        </div>
        <div className='say-no-box'>
          <ScrollReveal>
            <div className='classroom-pastor'></div>
            <p>
              To educate religious clerics like pastors, 
              Christian leaders, workers, and matured 
              Christians, who will serve as Chaplain officers in such areas as civil society, military and paramilitary establishments, on acceptable best practices at all times and during crises situations such as civil disturbances, national emergencies and disasters.
            </p>
          </ScrollReveal>
        </div>
        <div className='say-no-box'>
          <ScrollReveal>
            <div className='military-march'></div>
            <p>To maintain the highest standards of Chaplaincy corps member's conduct, etiquette and discipline</p>
          </ScrollReveal>
        </div>
      </div>

{/* Phone Screen for the about-org-con because the styling is extremely different */}
      <div className='about-org-con-phone'>
        <div className='about-content-box'>
          <div className='content-numbering-mission'>
            <div className='number-reason-box'>
              <div className='number-reason-item'>
                <p>04</p>
              </div>
              <h3 className='about-reason-text'>Aims and Objectives</h3>
            </div>
          </div>
        </div>
        
        <div className='say-no-box'>
          <ScrollReveal>
            <div className='say-no-icon'></div>
            <p>To reduce crime, corruption and cultism — the three C’s (which have eaten deep into the fabric of Nigeria as a nation) to the barest minimum level.</p>
          </ScrollReveal>
        </div>
        <div className='say-no-box'>
          <ScrollReveal>
            <div className='tailor-boy'></div>
            <p>
              To establish skill acquisition centers for human and capital development as this will make them self-independent and self-employed
            </p>
          </ScrollReveal>
        </div>
        <div className='say-no-box'>
          <ScrollReveal>
            <div className='old-man-image'></div>
            <p> To effectively manage aids and relief materials during disasters, emergency, and other times.</p>
          </ScrollReveal>
        </div>
        <div className='say-no-box'>
          <ScrollReveal>
            <div className='classroom-pastor'></div>
            <p>
              To educate religious clerics like pastors, 
              Christian leaders, workers, and matured 
              Christians, who will serve as Chaplain officers in such areas as civil society, military and paramilitary establishments, on acceptable best practices at all times and during crises situations such as civil disturbances, national emergencies and disasters.
            </p>
          </ScrollReveal>
        </div>
        <div className='say-no-box'>
          <ScrollReveal>
            <div className='arms-giving'></div>
            <p>To co-operatively assist accident victims through the medical unit of the Corps by rendering First Aid Service both spiritually and physically in times of emergency situations like accidents, disasters, environmental mishaps etc.</p>
          </ScrollReveal>
        </div>
        <div className='say-no-box'>
          <ScrollReveal>
            <div className='military-march'></div>
            <p>To maintain the highest standards of Chaplaincy corps member's conduct, etiquette and discipline</p>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}

export default OurMission