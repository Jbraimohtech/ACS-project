import React from 'react'

type MemberBoxProps = {
    children: React.ReactNode;
}
const MemberBox = ({children}: MemberBoxProps) => {
  return (
    <div className='member-management-box'>{children}</div>
  )
}

export default MemberBox