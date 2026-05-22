import React from 'react'

type BlogCardProps = {
    children: React.ReactNode
}

const BlogCard = ({children}: BlogCardProps ) => {
  return (
    <div className='blog-card-props-real'>{children}</div>
  )
}

export default BlogCard;