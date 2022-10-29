import React, { lazy, Suspense } from 'react';

const LazyHomepage = lazy(() => import('./Homepage'));

const Homepage = props => (
  <Suspense fallback={null}>
    <LazyHomepage {...props} />
  </Suspense>
);

export default Homepage;
