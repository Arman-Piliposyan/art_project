import { ToastPosition, Bounce, Theme } from 'react-toastify';

import { Colors } from '/src/globalStyles/colors';

export * from './validationSchemas';
export * from './errors';

export const AuthHeaderHeight = '60px';

export const registrationInitialData = {
  organizationName: '',
  confirmPassword: '',
  agreement: false,
  verticalId: '',
  firstName: '',
  lastName: '',
  password: '',
  terms: false,
  email: '',
  phone: '',
};

export const authInputStyles = {
  '& .MuiOutlinedInput-root': {
    '&.Mui-disabled fieldset': {
      borderColor: Colors.inputBorder + 50,
      borderWidth: '1px',
    },
    '&.Mui-error fieldset': {
      borderColor: Colors.invalidRed,
      borderWidth: '1px',
    },
    '& fieldset': {
      borderColor: Colors.inputBorder,
      borderWidth: '1px',
    },
    '&:-webkit-autofill': {
      WebkitBoxShadow: `0 0 0 0px ${Colors.white} inset`,
    },
    '&.Mui-focused fieldset': {
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderWidth: '1px',
    },
    WebkitBoxShadow: `0 0 0 0px ${Colors.white} inset`,
    color: Colors.black,
  },
};

export const AlternativeButtonStyles = {
  '&.Mui-disabled': {
    border: `1px solid ${Colors.white}`,
    backgroundColor: Colors.white,
    color: Colors.inputBorder,
  },
  '&:hover': {
    backgroundColor: Colors.simulacrumPrimary,
    border: `1px solid ${Colors.white}`,
    color: Colors.white,
  },
  border: `1px solid ${Colors.white}`,
  color: Colors.simulacrumPrimary,
  backgroundColor: Colors.white,
};

export const AlternativeButtonWithBorderStyles = {
  '&.Mui-disabled': {
    border: `1px solid ${Colors.inputBorder}`,
    backgroundColor: Colors.white,
    color: Colors.inputBorder,
  },
  '&:hover': {
    backgroundColor: Colors.simulacrumPrimary,
    border: `1px solid ${Colors.white}`,
    color: Colors.white,
  },
  border: `1px solid ${Colors.simulacrumPrimary}`,
  color: Colors.simulacrumPrimary,
  backgroundColor: Colors.white,
  width: '100%',
};

export const FREE_PLAN = 'FREE';
export const BASIC_PLAN = 'BASIC';
export const PRO_PLAN = 'PRO';
export const ADVANCED_PLAN = 'ADVANCED';
export const ENTERPRISE_PLAN = 'ENTERPRISE';

export const toastConfigs = {
  position: 'bottom-left' as ToastPosition,
  theme: 'light' as Theme,
  pauseOnFocusLos: false,
  hideProgressBar: false,
  newestOnTop: false,
  transition: Bounce,
  closeOnClick: true,
  pauseOnHover: true,
  autoClose: 5000,
  draggable: true,
  rtl: false,
};
