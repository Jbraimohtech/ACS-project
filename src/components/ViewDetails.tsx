import React from 'react'

type ViewDetailsProps = {
    children: React.ReactNode
}

const ViewDetails = ({children}: ViewDetailsProps) => {
  return (
    <div className='view-details'>{children}</div>
  )
}

export default ViewDetails;