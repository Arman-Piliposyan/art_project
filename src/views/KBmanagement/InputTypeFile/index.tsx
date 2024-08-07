import React, { ChangeEvent, useState } from 'react';
import { Box } from '@mui/material';

import { useKBManagementContext } from '../KBManagementContext';
import styles from './style.module.scss';

export const InputTypeFile = () => {
  const { setFiles, files } = useKBManagementContext();
  // const [files, setFiles] = useState<FileList | null>(null);
  const [hasError, setHasError] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (hasError) {
        setHasError(false);
      }
      setFiles(e.target.files);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '40px', gap: '12px' }}>
      <div className={styles.input_file_wrapper}>
        <input
          className={styles.input_file}
          accept=".txt,.pdf,.doc,.docx"
          onChange={handleFileChange}
          id="actual-btn"
          type="file"
          multiple
          hidden
        />
        <label className={styles.input_label} htmlFor="actual-btn">
          Choose File
        </label>
        <span className={styles.file_name}>
          {files
            ? Array.from(files as FileList)
                .map((file) => file.name)
                .join(' , ')
            : 'No file chosen'}
        </span>
      </div>
    </Box>
  );
};
