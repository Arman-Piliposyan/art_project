import React, { createContext, useContext, useState } from 'react';

import {
  SegmentGetDataType,
  ConditionDataType,
  SingleSegmentType,
  CriteriaDataType,
  FieldDataType,
} from './types';
import { criteriaInitialData } from './constants';

type SegmentsContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propKey: string]: any;
};

const SegmentsContext = createContext({} as SegmentsContextType);

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export const SegmentsContextProvider = ({ children }: Props): JSX.Element => {
  const [criterias, setCriterias] = useState<CriteriaDataType[]>([criteriaInitialData as CriteriaDataType]);
  const [singleSegmentData, setSingleSegmentData] = useState<SingleSegmentType | null>(null);
  const [fieldsData, setFieldsData] = useState<FieldDataType[] | null>(null);
  const [isSegmentCreationPageOpen, setIsSegmentCreationPageOpen] = useState(false);
  const [conditions, setConditions] = useState<ConditionDataType[] | null>(null);
  const [allSegments, setAllSegments] = useState<SegmentGetDataType[] | []>([]);
  const [isSegmentCreated, setIsSegmentCreated] = useState(true);
  const [segmentName, setSegmentName] = useState('');

  const contextData = {
    setIsSegmentCreationPageOpen,
    isSegmentCreationPageOpen,
    setSingleSegmentData,
    setIsSegmentCreated,
    singleSegmentData,
    isSegmentCreated,
    setAllSegments,
    setSegmentName,
    setFieldsData,
    setConditions,
    setCriterias,
    allSegments,
    segmentName,
    conditions,
    fieldsData,
    criterias,
  };

  return <SegmentsContext.Provider value={contextData}>{children}</SegmentsContext.Provider>;
};

export const useSegmentsContext = () => {
  const contextData = useContext(SegmentsContext);
  return contextData;
};
