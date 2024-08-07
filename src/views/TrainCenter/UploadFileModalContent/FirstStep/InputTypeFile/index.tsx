/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';

import { UploadFileModalDataType } from '../../../type';
// import { useImportContactsContext } from '../../../../ImportContactsContext';
import styles from './styles.module.scss';

import { Colors } from '/src/globalStyles/colors';
import { CSVFileIcon } from '/src/assets';

type Props = {
  setModalData: React.Dispatch<React.SetStateAction<UploadFileModalDataType>>;
  modalData: UploadFileModalDataType;
};

export const InputTypeFile = ({ setModalData, modalData }: Props) => {
  // const { setImportCSVTabData, importCSVTabData } = useImportContactsContext();

  const [hasError, setHasError] = useState(false);

  //@ts-ignore
  const handleFileInputChange = (e) => {
    const csvFile = e.target.files[0];
    setModalData({ ...modalData, step1: { ...modalData.step1, file: csvFile } });
    setHasError(false);
  };

  return (
    <div className={(styles.upload_files_container, styles.box_shadow_neutral)}>
      <div className={styles.file_area}>
        <CSVFileIcon />
        <label className={styles.label}>
          <span className={styles.browse_files}>
            <input
              disabled={modalData.step1.isFileUploaded}
              className={styles.default_file_input}
              onChange={handleFileInputChange}
              accept=".csv"
              type="file"
            />
            <div>
              <span
                style={{
                  color: modalData.step1.isFileUploaded ? Colors.inputBorder : '',
                  cursor: modalData.step1.isFileUploaded ? 'unset' : 'pointer',
                }}
                className={styles.browse_files_text}
              >
                Click to upload
              </span>
            </div>
            <div style={{ marginTop: '16px' }}>
              <span>Only .csv files are accepted - Maximum 20,000 rows</span>
            </div>
          </span>
        </label>
      </div>
      <div className={styles.error}>
        {hasError && <span className={styles.error_text}>Please select a file first</span>}
      </div>
    </div>
  );
};
