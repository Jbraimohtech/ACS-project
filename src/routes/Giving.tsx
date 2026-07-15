
import { Helmet } from 'react-helmet'
import HomeFooter from '../components/HomeFooter'
import GivingContent from '../givingComponents/GivingContent'

const Giving = () => {
  return (
    <div className='giving'>
      <Helmet>
        <title>Giving - Ambassadors Chaplain Corps</title>
        <meta name="description" content="Support the mission of the Ambassadors Chaplain Corps through your generous contributions." />
        <meta name="keywords" content="giving, donations, support, ambassadors, chaplain, corps, contributions" />
      </Helmet>
      <GivingContent />
      
      <HomeFooter />
    </div>
  )
}

export default Giving
