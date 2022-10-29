import React, { lazy, Suspense } from 'react';

const LazyCalendar = lazy(() => import('./Calendar'));

const Calendar = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCalendar {...props} />
  </Suspense>
);

export default Calendar;
