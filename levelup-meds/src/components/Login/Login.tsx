import React, { FC } from 'react';
import styles from './Login.module.scss';

interface LoginProps {}

const Login: FC<LoginProps> = () => (
  <div className={styles.Login}>
    Login Component
  </div>
);

export default Login;
