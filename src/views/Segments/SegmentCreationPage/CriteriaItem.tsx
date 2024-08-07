import {
  CircularProgress,
  Autocomplete,
  Typography,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  Box,
  Fab,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';

import { ConditionDataType, CriteriaDataType, FieldDataType } from '../types';
import { criteriaInitialData, conditionsValues } from '../constants';
import { useSegmentsContext } from '../SegmentsContext';
import { generateConditionOptions } from '../helpers';

import { CommonDatePicker } from '/src/common/components/UI-Components/CommonDatePicker';
import { DateRangePicker } from '/src/common/components/UI-Components/DateRangePicker';
import { getFieldValues } from '/src/services/segmentService';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  criteria: CriteriaDataType;
  index: number;
};

export const CriteriaItem = ({ criteria, index }: Props) => {
  const { setCriterias, fieldsData, conditions, criterias } = useSegmentsContext();

  const [fieldValuesLoading, setFieldValuesLoading] = useState(false);
  const [fieldValues, setFieldValues] = useState([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [openAlert, setOpenAlert] = useState(false);

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const handleFieldNameChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: { value: string; label: string; type?: string } | null,
  ) => {
    setCriterias([
      ...criterias.slice(0, index),
      {
        ...criteria,
        label: newValue!.label,
        name: newValue!.value,
        type: newValue!.type,
        conditionNum: null,
        valueFrom: null,
        valueTo: null,
        value: '',
      },
      ...criterias.slice(index + 1),
    ]);
  };

  const handleConditionChange = async (
    event: React.SyntheticEvent<Element, Event>,
    newValue: ConditionDataType | null,
  ) => {
    setCriterias([
      ...criterias.slice(0, index),
      { ...criteria, conditionNum: newValue!.value },
      ...criterias.slice(index + 1),
    ]);

    if (
      newValue!.value === conditionsValues.contains ||
      newValue!.value === conditionsValues.doNotContain ||
      newValue!.value === conditionsValues.startsWith ||
      newValue!.value === conditionsValues.endsWith ||
      newValue!.value === conditionsValues.isNotEmpty ||
      newValue!.value === conditionsValues.isEmpty
    ) {
      return;
    }

    setFieldValuesLoading(true);
    try {
      const { data } = await getFieldValues({
        criterias: JSON.stringify(criterias[index - 1] ? criterias.slice(0, index) : []),
        fieldName: criteria.name as string,
      });
      setFieldValues(data.data);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setFieldValuesLoading(false);
    }
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCriterias([
      ...criterias.slice(0, index),
      { ...criteria, value: event.target.value },
      ...criterias.slice(index + 1),
    ]);
  };

  const handleChangeStart = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCriterias([
      ...criterias.slice(0, index),
      { ...criteria, valueFrom: event.target.value },
      ...criterias.slice(index + 1),
    ]);
  };

  const handleChangeEnd = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCriterias([
      ...criterias.slice(0, index),
      { ...criteria, valueTo: event.target.value },
      ...criterias.slice(index + 1),
    ]);
  };

  const handleAddCriteria = () => {
    setCriterias([...criterias, criteriaInitialData]);
    if (criterias.length === 9) {
      handleOpenAlert();
    }
  };

  const handleRemoveCriteria = () => {
    setCriterias(
      criterias.filter((criteria: CriteriaDataType, criteriaIndex: number) => criteriaIndex !== index),
    );
  };

  const handleConditionValueChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setCriterias([
      ...criterias.slice(0, index),
      { ...criteria, value: event.target.value },
      ...criterias.slice(index + 1),
    ]);
  };

  useEffect(() => {
    if (!startDate || !endDate) {
      return;
    }
    setCriterias([
      ...criterias.slice(0, index),
      {
        ...criteria,
        valueFrom: startDate,
        valueTo: endDate,
        value: null,
      },
      ...criterias.slice(index + 1),
    ]);
  }, [endDate, startDate]);

  useEffect(() => {
    if (!date) {
      return;
    }
    setCriterias([
      ...criterias.slice(0, index),
      {
        ...criteria,
        valueFrom: null,
        valueTo: null,
        value: date,
      },
      ...criterias.slice(index + 1),
    ]);
  }, [date]);

  return (
    <>
      <Box sx={{ alignItems: 'center', display: 'flex' }}>
        <Box
          sx={{
            backgroundColor: Colors.paperBackgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '6px',
            marginRight: '16px',
            display: 'flex',
            color: 'black',
            height: '40px',
            width: '40px',
          }}
        >
          <Typography fontSize={14}>{index + 1}</Typography>
        </Box>
        <Box sx={{ alignItems: 'center', display: 'flex', gap: '16px', py: '8px' }}>
          <Autocomplete
            renderOption={(props, option: { label: string; value: string }) => {
              return (
                <li {...props} key={option.value}>
                  {option.label}
                </li>
              );
            }}
            options={fieldsData.map((field: FieldDataType) => {
              return { type: field.simulacrumType, label: field.label, value: field.name };
            })}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            value={
              criteria.label ? { label: criteria.label as string, value: criteria.name as string } : null
            }
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => <TextField {...params} label="Field Name" />}
            onChange={handleFieldNameChange}
            disableClearable={true}
            sx={{ width: 300 }}
            disablePortal
            size="small"
          />
          <Autocomplete
            options={generateConditionOptions(
              criteria.label
                ? fieldsData.find((item: FieldDataType) => item.label === criteria.label).simulacrumType
                : '',
              conditions,
            )}
            value={
              conditions.find((condition: ConditionDataType) => condition.value === criteria.conditionNum) ||
              null
            }
            renderInput={(params) => <TextField {...params} label="Condition" />}
            onChange={handleConditionChange}
            disabled={!criteria.label}
            disableClearable={true}
            sx={{ width: 300 }}
            disablePortal
            size="small"
          />
          {criteria.conditionNum === conditionsValues.contains ||
          criteria.conditionNum === conditionsValues.doNotContain ||
          criteria.conditionNum === conditionsValues.startsWith ||
          criteria.conditionNum === conditionsValues.endsWith ? (
            <TextField
              disabled={!criteria.conditionNum}
              onChange={handleValueChange}
              sx={{ width: '350px' }}
              value={criteria.value}
              autoComplete="off"
              label="Value*"
              size="small"
            />
          ) : criteria.conditionNum === conditionsValues.isEmpty ||
            criteria.conditionNum === conditionsValues.isNotEmpty ? (
            <TextField sx={{ width: '350px' }} autoComplete="off" disabled={true} size="small" value="Yes" />
          ) : criteria.conditionNum === conditionsValues.notBetween ||
            criteria.conditionNum === conditionsValues.between ? (
            criteria.type === 'number' ? (
              <Box sx={{ display: 'flex', width: '350px', gap: '10px' }}>
                <TextField
                  value={criteria.valueFrom || ''}
                  onChange={handleChangeStart}
                  autoComplete="off"
                  type="number"
                  label="Start"
                  size="small"
                />
                <TextField
                  value={criteria.valueTo || ''}
                  onChange={handleChangeEnd}
                  autoComplete="off"
                  type="number"
                  size="small"
                  label="End"
                />
              </Box>
            ) : (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateRangePicker
                  handleStartDate={(argument: Date | null) => {
                    setStartDate(argument);
                  }}
                  handleEndDate={(argument: Date | null) => {
                    setEndDate(argument);
                  }}
                  startDate={startDate}
                  endDate={endDate}
                />
              </LocalizationProvider>
            )
          ) : criteria.conditionNum === conditionsValues.before ||
            criteria.conditionNum === conditionsValues.after ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CommonDatePicker
                handleSetDate={(argument: Date | null) => {
                  setDate(argument);
                }}
                disabled={!criteria.conditionNum}
                date={date}
              />
            </LocalizationProvider>
          ) : fieldValuesLoading ? (
            <Box
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                width: '350px',
                height: '40px',
              }}
            >
              <CircularProgress sx={{ color: Colors.simulacrumPrimary }} size={30} />
            </Box>
          ) : (
            <TextField
              onChange={handleConditionValueChange}
              disabled={!criteria.conditionNum}
              id="outlined-select-currency"
              sx={{ width: '350px' }}
              value={criteria.value}
              label="Value"
              size="small"
              select
            >
              {fieldValues.map((fieldValue: string) => {
                return (
                  <MenuItem value={fieldValue} key={fieldValue}>
                    {fieldValue}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
          {criterias.length === 1 ? (
            <Fab
              disabled={!criteria.value && !!(criteria.valueFrom && criteria.valueTo)}
              onClick={handleAddCriteria}
              color="info"
              size="small"
            >
              <AddIcon fontSize="medium" />
            </Fab>
          ) : criterias[index + 1] || criterias.length === 10 ? (
            <Fab onClick={handleRemoveCriteria} color="info" size="small">
              <RemoveIcon fontSize="medium" />
            </Fab>
          ) : (
            <>
              <Fab
                disabled={!criteria.value && !!(criteria.valueFrom && criteria.valueTo)}
                onClick={handleAddCriteria}
                color="info"
                size="small"
              >
                <AddIcon fontSize="medium" />
              </Fab>
              <Fab onClick={handleRemoveCriteria} color="info" size="small">
                <RemoveIcon fontSize="medium" />
              </Fab>
            </>
          )}
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        onClose={handleCloseAlert}
        autoHideDuration={10000}
        sx={{ width: '80%' }}
        open={openAlert}
      >
        <Alert onClose={handleCloseAlert} severity="warning">
          Oops! It seems you've added too many criteria. The maximum limit allowed is 10. Please remove some
          criteria before adding more.
        </Alert>
      </Snackbar>
    </>
  );
};
