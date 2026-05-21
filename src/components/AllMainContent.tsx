import React from 'react'


type AllMainContentProps = {
    children: React.ReactNode
}

const AllMainContent = ({children}: AllMainContentProps) => {
  return (
    <div className='all-main-content'>{children}</div>
  )
}

export default AllMainContent