import React from 'react'
import "../../src/homeComponents/Home.css"

type CardProps = {
    children: React.ReactNode
}

const YellowBtn = ({children} : CardProps) => {
  return (
    <div className='beside-marks-box-button'>{children}</div>
  )
}

export default YellowBtn