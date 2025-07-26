import React, { useEffect, useState } from 'react';
import css from '../App/App.module.css';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import Loading from '../Loading/Loading';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import EmptyState from '../EmptyState/EmptyState';

import { fetchNotes } from '../../services/noteService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    updateSearchQuery(value);
  };

  const updateSearchQuery = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', currentPage, debouncedSearchQuery],
    queryFn: () => fetchNotes(currentPage, debouncedSearchQuery),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load notes. Please try again.', {
        duration: 2000,
        position: 'top-center',
      });
    }
  }, [isError]);

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />

      <header className={css.toolbar}>
        <SearchBox value={inputValue} onSearch={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            totalNumberOfPages={totalPages}
            currentActivePage={currentPage}
            setPage={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading && <Loading />}
      {isError && <ErrorMessage message="Something went wrong." />}
      {!isLoading && !isError && notes.length === 0 && <EmptyState />}
      {!isLoading && !isError && notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCloseModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}
