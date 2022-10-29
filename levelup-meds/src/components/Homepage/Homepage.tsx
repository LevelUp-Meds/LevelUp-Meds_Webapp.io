import React, { FC } from 'react';
import styles from './Homepage.module.scss';

interface HomepageProps {}

const Homepage: FC<HomepageProps> = () => (
  <div className={styles.Homepage}>
    Homepage Component
  </div>
);

export default Homepage;
