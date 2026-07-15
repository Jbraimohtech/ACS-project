
import { Helmet } from 'react-helmet'
import MemberContent from '../MemberComponents/MemberContent'

const Members = () => {
  return (
    <div className='members'>
      <Helmet>
        <title>Members - Ambassadors Chaplain Corps</title>
        <meta name="description" content="Meet the dedicated members of the Ambassadors Chaplain Corps." />
        <meta name="keywords" content="members, ambassadors, chaplain, corps, team, community" />
      </Helmet>
      <MemberContent/>
    </div>
  )
}

export default Members
