import React from 'react';
import { useState } from 'react';
import css from '../App/App.module.css';
import NoteList from '../NoteList/NoteList';
// import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';

import { fetchNotes } from '../../services/noteService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    updateSearchQuery(value);
  };

  const updateSearchQuery = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', currentPage, searchQuery],
    queryFn: () => fetchNotes(currentPage, searchQuery),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {totalPages > 1 && (
          <Pagination
            totalNumberOfPages={totalPages}
            currentActivePage={currentPage}
            setPage={setCurrentPage}
          />
        )}
        <button className={css.button}>Create note +</button>
      </header>

      {!isLoading && !isError && notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
