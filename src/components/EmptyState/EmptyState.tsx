import React from 'react';
import css from './EmptyState.module.css';

export default function EmptyState() {
  return <p className={css.empty}>No notes found. Try another search.</p>;
}
