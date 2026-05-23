
import MemberBox from '../components/MemberBox'


const Blog = () => {
  return (
    <div className='core-values-box'>
      <div className='about-org-con'>
        <div className='about-content-box'>
          <div className='content-numbering-mission'>
            <div className='number-reason-box'>
              <div className='number-reason-item'>
                <p>05</p>
              </div>
              <h3 className='core-reason-text'>Core Values</h3>
            </div>
          </div>
        </div>

        <div className='say-no-box'>
            <h1 className='say-no-box-caps'>Every feature was created to solve a real challenge in our daily operations:</h1>
        </div>
        <MemberBox>
            <div className='member-icon'></div>
            <h2 className='member-management-box-caps'>Unity</h2>
            <p className='member-management-box-letters'> Bringing people together to work towards common goals.</p>
        </MemberBox>
        
        <MemberBox>
            <div className='member-icon'></div>
            <h2 className='member-management-box-caps'>Love</h2>
            <p className='member-management-box-letters'>Serving humanity with compassion and selflessness.</p>
        </MemberBox>
      </div>

      <div className='about-org-con-b'>
        <MemberBox>
            <div className='member-icon'></div>
            <h2 className='member-management-box-caps'>Accountability</h2>
            <p className='member-management-box-letters'>Transparent management of resources and responsibilities.</p>
        </MemberBox>
        <MemberBox>
            <div className='member-icon'></div>
            <h2 className='member-management-box-caps'>Respect</h2>
            <p className='member-management-box-letters'>Honoring the dignity and rights of every individual.</p>
        </MemberBox>
        <MemberBox>
            <div className='member-icon'></div>
            <h2 className='member-management-box-caps'>Integrity</h2>
            <p className='member-management-box-letters'>Upholding ethical principles and accountability in all our endeavors.</p>
        </MemberBox>
      </div>
    </div>
  )
}

export default Blog