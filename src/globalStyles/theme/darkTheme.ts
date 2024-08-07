import { ButtonProps, Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { Colors } from '../colors';

import { ScrollBarStylesGenerator } from '/src/utils';

export const darkThemeObject = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }: { ownerState: ButtonProps; theme: Theme }) => ({
          textTransform: 'none',
          fontFamily: 'Poppins',
          color: Colors.white,
          ...(ownerState.color === 'primary' && {
            '&.Mui-disabled': {
              backgroundColor: alpha(theme.palette.primary.main, 0.5),
              borderColor: alpha(theme.palette.primary.main, 0.1),
              color: Colors.white + 60,
            },
            '&:hover': {
              color: theme.palette.primary.main,
              backgroundColor: Colors.white,
            },
            borderColor: theme.palette.primary.main,
            border: '1px solid',
          }),
          ...(ownerState.color === 'error' && {
            '&.Mui-disabled': {
              backgroundColor: alpha(theme.palette.error.main, 0.5),
              borderColor: alpha(theme.palette.error.main, 0.1),
              color: Colors.white + 60,
            },
            '&:hover': {
              color: theme.palette.error.main,
              backgroundColor: Colors.white,
            },
            borderColor: theme.palette.error.main,
            border: '1px solid',
          }),
          ...(ownerState.color === 'secondary' && {
            '&.Mui-disabled': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.5),
              borderColor: alpha(theme.palette.secondary.main, 0.1),
              color: Colors.white + 60,
            },
            '&:hover': {
              color: theme.palette.secondary.main,
              backgroundColor: Colors.white,
            },
            borderColor: theme.palette.secondary.main,
            border: '1px solid',
          }),
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-disabled:hover fieldset': {
              borderColor: alpha(Colors.inputBorder, 0.5),
              borderWidth: '1px',
            },
            '&.Mui-disabled fieldset': {
              borderColor: alpha(Colors.inputBorder, 0.5),
              borderWidth: '1px',
            },
            '&.Mui-error fieldset': {
              borderColor: Colors.invalidRed,
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: Colors.colorPrimary,
              borderWidth: '1px',
            },
            '& fieldset': {
              borderColor: Colors.white,
              borderWidth: '1px',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '1px',
            },
            fontFamily: 'Poppins',
          },
          '& label': {
            '&.Mui-disabled': {
              color: alpha(Colors.placeholderColor, 0.5),
            },
            '&.Mui-error': {
              color: Colors.invalidRed,
            },
            color: Colors.placeholderColor,
            fontFamily: 'Poppins',
          },
          '& .MuiFormHelperText-root.Mui-error': {
            color: Colors.invalidRed,
            fontFamily: 'Poppins',
            fontSize: '10px',
            marginLeft: 0,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          '&.MuiAutocomplete-paper': {
            '& .MuiAutocomplete-listbox': {
              ...ScrollBarStylesGenerator('', '250px'),
            },
          },
          '&.MuiMenu-paper': {
            marginTop: '4px',
            ...ScrollBarStylesGenerator('', '250px'),
          },
          backgroundColor: Colors.mainBackgroundColor,
          fontFamily: 'Poppins',
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        root: {
          '& .MuiBadge-badge': {
            border: `1px solid ${Colors.mainBackgroundColor}`,
            fontFamily: 'Poppins',
            color: Colors.white,
            minWidth: 0,
            fontSize: 9,
            height: 14,
            width: 14,
            right: 8,
            top: 12,
          },
          fontFamily: 'Poppins',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: Colors.rootBackgroundColor,
            border: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            ...ScrollBarStylesGenerator('', '350px', true),
          },
          fontFamily: 'Poppins',
          border: 'none',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.MuiCheckbox-root': {
            fontFamily: 'Poppins',
            padding: '0 8px 0 0',
            width: '26px',
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: Colors.mainBackgroundColor,
          fontFamily: 'Poppins',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Poppins',
          color: Colors.white,
        },
      },
    },
  },
  palette: {
    secondary: {
      main: Colors.colorSecondary,
    },
    primary: { main: Colors.colorPrimary },
  },
};
