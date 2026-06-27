
import { useEffect, useState } from 'react'
import AllMainContent from '../components/AllMainContent'
import SearchBox from '../components/SearchBox'
import "../EventsComponents/Event.css"
import MemberProfiles from './MemberProfiles'
import HomeFooter from '../components/HomeFooter'
import { FaChevronDown } from 'react-icons/fa'
import Navbar from '../components/Navbar/Navbar'
import LoadingBrand from '../components/LoadingBrand'
import type { Member } from '../types/member'

const MemberContent = () => {
  const [query, setQuery] = useState('')
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('https://ambchapcorps.org/api/members')
        const data = await res.json()
        const list = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : []
        setMembers(list)
      } catch (err) {
        console.error(err)
        setError('Failed to load members')
        setMembers([])
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [])

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)
      const formData = new FormData(e.currentTarget)
      const q = formData.get('query')?.toString().trim() || ''

      if (!q) {
        // reload all members
        const res = await fetch('https://ambchapcorps.org/api/members')
        const data = await res.json()
        const list = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : []
        setMembers(list)
        return
      }

      const res = await fetch(`https://ambchapcorps.org/api/members/search?query=${encodeURIComponent(q)}`)
      const data = await res.json()
      setMembers(data.data || [])
    } catch (err) {
      console.error(err)
      setError('Search failed')
      setMembers([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <AllMainContent>
        <Navbar />
        <div className='member-head-text'>
          <h1>Our Members</h1>
        </div>

        <SearchBox onSubmit={handleSearch}>
          <div className='search-filter-box'>
            <p>Filter</p>
            <button type='button'>
              <FaChevronDown />
            </button>
          </div>
          <input
            type='text'
            name='query'
            placeholder='Search by name, ID, role, or unit'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className='search-icon-button-box'
            aria-label='Search'
          >
            <div className='search-icon' ></div>
          </button>
        </SearchBox>
      </AllMainContent>

      {loading && <LoadingBrand />}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && members.length === 0 && !error && (
        <p>No members available. Try a different search.</p>
      )}

      <MemberProfiles members={members} />
      <HomeFooter />
    </div>
  )
}

export default MemberContent;