import React from 'react';
import css from './ErrorMessage.module.css';

interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  return <p className={css.error}>{message}</p>;
}
