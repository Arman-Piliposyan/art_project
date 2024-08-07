import { ConditionDataType, CriteriaTypeType } from './types';

export const generateConditionOptions = (criteriaType: CriteriaTypeType, conditions: ConditionDataType[]) => {
  return conditions.filter((condition) => condition.applicableFor.includes(criteriaType));
};
