import React from 'react'
import { useNavigate } from 'react-router-dom';

type SearchBoxProps = {
    children: React.ReactNode;
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}
const SearchBox = ({children, onSubmit}: SearchBoxProps ) => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = formData.get('query')?.toString().trim() || '';

    if (onSubmit) {
      onSubmit(event);
    }

    // Always route search requests to member-search so the shared search experience is consistent.
    if (query) {
      navigate(`/member-search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className='search-box'>
      <form onSubmit={handleSubmit} className='member-search-form'>
        {children}
      </form>
    </div>
  )
}

export default SearchBox