import React from 'react';
import classes from './Natours.module.scss';
import { usePageTitle } from '../../../../hooks/use-page-title';

export default function Natours() {
  usePageTitle('Natours');

  return (
    <div className={classes.natours}>
      <header className={classes.header}>
        Some text...
      </header>
    </div>
  );
}
