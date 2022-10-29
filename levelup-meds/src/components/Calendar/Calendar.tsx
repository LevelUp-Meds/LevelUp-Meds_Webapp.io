import React, { FC } from 'react';
import styles from './Calendar.module.scss';

interface CalendarProps {}

const Calendar: FC<CalendarProps> = () => (
  <div className={styles.Calendar}>
    Calendar Component
  </div>
);

export default Calendar;
