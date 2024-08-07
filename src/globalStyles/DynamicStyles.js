import React from 'react';

import { Colors } from './colors';

const DynamicStyles = () => {
  const dynamicStyles = Object.entries(Colors)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n');

  return (
    <style>
      {`:root {
                ${dynamicStyles}
            }`}
    </style>
  );
};

export default DynamicStyles;
