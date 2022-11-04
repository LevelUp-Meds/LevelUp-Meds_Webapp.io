import React, { FC } from 'react';
import styles from './Medication.module.scss';

interface MedicationProps {}

const Medication: FC<MedicationProps> = () => (
  <div className={styles.Medication}>
    Medication Component
  </div>
);

export default Medication;
