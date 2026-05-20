import React from 'react'

type EventCardProps = {
    children: React.ReactNode
}

const EventCard = ({children}: EventCardProps ) => {
  return (
    <div className='event-card-prop'>{children}</div>
  )
}

export default EventCard;