import React from 'react'

type RsvpProps = {
    children: React.ReactNode
}

const Rsvp = ({children}: RsvpProps) => {
  return (
    <div className='rsvp'>{children}</div>
  )
}

export default Rsvp