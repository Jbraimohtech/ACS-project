
import "../../src/EventsComponents/Event.css"
import EventContent from '../EventsComponents/EventContent'
import Featured from '../EventsComponents/Featured'
import HomeFooter from '../components/HomeFooter'
import AllUpComingEvents from '../EventsComponents/AllUpComingEvents'
import BeAccountedFor from '../EventsComponents/BeAccountedFor'

const Events = () => {
  return (
     <div className='event'>
        <EventContent />
        <Featured />
        <AllUpComingEvents />
        <BeAccountedFor />
        <HomeFooter />
    </div>
  )
}

export default Events