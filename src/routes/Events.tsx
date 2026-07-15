
import "../../src/EventsComponents/Event.css"
import EventContent from '../EventsComponents/EventContent'
import Featured from '../EventsComponents/Featured'
import HomeFooter from '../components/HomeFooter'
import AllUpComingEvents from '../EventsComponents/AllUpComingEvents'
import BeAccountedFor from '../EventsComponents/BeAccountedFor'
import { Helmet } from "react-helmet"

const Events = () => {
  return (
     <div className='event'>
      <Helmet>
        <title>Events - Ambassadors Chaplain Corps</title>
        <meta name="description" content="Explore upcoming events and activities organized by the Ambassadors Chaplain Corps." />
        <meta name="keywords" content="events, ambassadors, chaplain, corps, activities, community" />
      </Helmet>
        <EventContent />
        <Featured />
        <AllUpComingEvents />
        <BeAccountedFor />
        <HomeFooter />
    </div>
  )
}

export default Events