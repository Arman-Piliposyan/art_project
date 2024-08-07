import { IVertical } from './types';

export const generateVerticalsOptions = (verticalsData: IVertical[]) => {
  if (!verticalsData.length) {
    return [];
  }

  return verticalsData.map((vertical) => {
    return {
      label: vertical.name,
      value: vertical.id,
    };
  });
};
