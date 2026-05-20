import React from 'react'


type SearchBoxProps = {
    children: React.ReactNode;
}
const SearchBox = ({children}: SearchBoxProps ) => {
  return (
    <div className='search-box'>
        {children}
    </div>
  )
}

export default SearchBox