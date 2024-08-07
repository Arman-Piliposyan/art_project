import React from 'react';

import styles from './ai_loading.module.scss';

type Props = { message: string };

export const AiLoading = ({ message }: Props) => {
  return (
    <span style={{ '--n': '10000' }} className={styles.type}>
      {message}
    </span>
  );
};
