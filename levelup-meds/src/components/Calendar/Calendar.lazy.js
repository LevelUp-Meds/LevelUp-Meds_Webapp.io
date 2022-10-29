import React, { lazy, Suspense } from 'react';

const LazyCalendar = lazy(() => import('./Calendar'));

const Calendar = props => (
  <Suspense fallback={null}>
    <LazyCalendar {...props} />
  </Suspense>
);

export default Calendar;
