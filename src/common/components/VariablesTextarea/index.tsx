import React, { useRef } from 'react';

import { VariablesDropdown } from './VariablesDropdown';
import styles from './variablesTextarea.module.scss';

type Props = {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  options: { label: string; value: string }[] | [];
  setValue: (value: string) => void;
  label: string;
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // errors: any;
};

export const VariablesTextarea = ({ setValue, onChange, options, value, label }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // const [variablesData, setVariablesData] = useState<IVariable[] | []>([]);

  const handleSelectChange = (variable: string) => {
    if (!textareaRef || !textareaRef.current) {
      return;
    }
    const selectedValue = `{$${variable}}`;
    const text = value;
    const start = text.substring(0, textareaRef.current.selectionStart as number);
    const end = text.substring(textareaRef.current.selectionEnd as number);

    setValue(start + selectedValue + end);
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await getVariables();
  //       setVariablesData(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // }, []);

  return (
    <>
      <div
        // style={{
        //   borderColor: Object.hasOwnProperty.call(errors, `${fieldName}`) ? Colors.invalidRed : '',
        // }}
        className={styles.variables_textarea_container}
      >
        <label
          // style={{
          //   color: Object.hasOwnProperty.call(errors, `${fieldName}`) ? Colors.invalidRed : '',
          // }}
          className={styles.variablesLabel}
        >
          {label}
        </label>
        <VariablesDropdown handleSelectChange={handleSelectChange} options={options} />
        {/* <Controller
          render={({ field: { onChange, onBlur, value, name }, formState: { errors } }) => {
            return (
              <>
                <textarea
                  style={{
                    borderColor: errors[name] ? Colors.invalidRed : '',
                    width: '100%',
                  }}
                  className={styles.variablesTextarea}
                  onChange={onChange}
                  placeholder={label}
                  ref={textareaRef}
                  onBlur={onBlur}
                  value={value}
                  rows={6}
                />
                <span className={styles.errorText}>{errors[name] && errors[name]?.message}</span>
              </>
            );
          }}
          control={control}
          name={fieldName}
        /> */}
        <>
          <textarea
            style={{
              // borderColor: errors[name] ? Colors.invalidRed : '',
              width: '100%',
            }}
            className={styles.variablesTextarea}
            onChange={onChange}
            placeholder={label}
            ref={textareaRef}
            // onBlur={onBlur}
            value={value}
            rows={6}
          />
          {/* <span className={styles.errorText}>{errors[name] && errors[name]?.message}</span> */}
        </>
      </div>
    </>
  );
};
