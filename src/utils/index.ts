import { refreshTokenPost } from '../services/authService';

import { Colors } from '/src/globalStyles/colors';

export const checkIsAuthorized = async (refreshToken: string) => {
  try {
    const newToken = await refreshTokenPost(refreshToken);
    localStorage.setItem('token', newToken);
    return { isAuthorized: true, token: newToken };
  } catch (error) {
    if (error.response.status === 401) {
      return { isAuthorized: false, token: null };
    }
  }
};

export const stringCapitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const ScrollBarStylesGenerator = (
  height?: string,
  maxHeight?: string,
  hasOverflowX?: boolean,
  color?: string,
) => {
  return {
    '&::-webkit-scrollbar': {
      backgroundColor: color ? color + 25 : Colors.colorPrimary + '25',
      borderRadius: '8px',
      opacity: '0.1',
      height: '4px',
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: color ? color + 25 : Colors.colorPrimary + '25',
      borderRadius: '8px',
      opacity: '0.1',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: color ? color : Colors.colorPrimary,
      borderRadius: '8px',
    },
    overflow: hasOverflowX ? 'auto' : 'hidden',
    maxHeight: maxHeight ? maxHeight : null,
    height: height ? height : null,

    paddingRight: '6px',

    overflowY: 'auto',
  };
};
