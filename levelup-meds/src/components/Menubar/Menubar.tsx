import React, { FC } from 'react';
import styles from './Menubar.module.scss';

interface MenubarProps {}

const Menubar: FC<MenubarProps> = () => (
  <div className={styles.Menubar}>
    Menubar Component
  </div>
);

export default Menubar;
