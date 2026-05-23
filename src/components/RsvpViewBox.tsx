
import Rsvp from './Rsvp'
import ViewDetails from './ViewDetails'


const RsvpViewBox = () => {
  return (
    <div className='rsvp-box'>
        <Rsvp>
            <p className='rsvp-box-first-p'>RSVP</p>
        </Rsvp>
        <ViewDetails>
            <p className='rsvp-box-second-p'>View details</p>
        </ViewDetails>
    </div>
  )
}

export default RsvpViewBox