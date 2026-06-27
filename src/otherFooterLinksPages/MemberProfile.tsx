import AllMainContent from '../components/AllMainContent'
import '../../src/EventsComponents/Event.css'
import '../aboutUsComponents/AboutUs.css'
import AboutContent from '../aboutUsComponents/AboutContent'
import HomeFooter from '../components/HomeFooter'
import Navbar from '../components/Navbar/Navbar'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Member } from '../types/member'
import LoadingBrand from '../components/LoadingBrand'

const MemberProfile = () => {
  const { id } = useParams<{ id: string }>()
  const [member, setMember] = useState<Member | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchMember = async () => {
      try {
        const response = await fetch(
          `https://ambchapcorps.org/api/members/${id}`
        )
        const result = await response.json()
        setMember(result.data)
      } catch (error) {
        console.error('Error fetching member:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMember()
  }, [id])

  if (loading) {
    return (
      <div className='member-loading'>
        <LoadingBrand />
      </div>
    )
  }

  if (!member) {
    return <div className='memberNotFound'>Member not found</div>
  }

  return (
    <div>
      <AllMainContent>
        <Navbar />
        <div className='about-us-head-text'>
          <h1>
            {member.first_name} {member.last_name ?? ''}
          </h1>
        </div>
      </AllMainContent>
      <AboutContent member={member} />
      <HomeFooter />
    </div>
  )
}

export default MemberProfile
