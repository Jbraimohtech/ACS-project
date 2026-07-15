
import { Helmet } from 'react-helmet'
import ResourcesContent from '../ResourcesComponents/ResourcesContent'

const Resources = () => {
  return (
    <div className='resources'>
      <Helmet>
        <title>Resources - Ambassadors Chaplain Corps</title>
        <meta name="description" content="Access valuable resources and information provided by the Ambassadors Chaplain Corps." />
        <meta name="keywords" content="resources, ambassadors, chaplain, corps, information, support" />
      </Helmet>
      <ResourcesContent />
    </div>
  )
}

export default Resources
