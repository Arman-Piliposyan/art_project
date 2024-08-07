import { ButtonProps, Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { Colors } from '../colors';

import { ScrollBarStylesGenerator } from '/src/utils';

export const lightThemeObject = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }: { ownerState: ButtonProps; theme: Theme }) => ({
          textTransform: 'none',
          fontFamily: 'Poppins',
          color: Colors.white,
          padding: '4px 20px',
          boxShadow: 'none',
          ...(ownerState.color === 'primary' && {
            '&.Mui-disabled': {
              backgroundColor: alpha(theme.palette.primary.main, 0.5),
              borderColor: alpha(theme.palette.primary.main, 0.1),
              color: Colors.white + 60,
            },
            '&:hover': {
              color: theme.palette.primary.main,
              backgroundColor: Colors.white,
              boxShadow: 'none',
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
            '&:hover fieldset': {
              borderColor: Colors.simulacrumPrimary,
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
            '&.Mui-focused fieldset': {
              borderWidth: '1px',
            },
            backgroundColor: Colors.white,
          },
          '& label': {
            '&.Mui-disabled': {
              color: alpha(Colors.placeholderColor, 0.5),
            },
            '&.Mui-error': {
              color: Colors.invalidRed,
            },
          },
          '& .MuiFormHelperText-root.Mui-error': {
            color: Colors.invalidRed,
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
          backgroundColor: Colors.white,
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
          border: 'none',
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        root: {
          '& .MuiBadge-badge': {
            border: `1px solid ${Colors.mainBackgroundColor}`,
            color: Colors.white,
            minWidth: 0,
            fontSize: 9,
            height: 14,
            width: 14,
            right: 8,
            top: 12,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.MuiCheckbox-root': {
            padding: '0 8px 0 0',
            width: '26px',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Poppins',
          color: Colors.black,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: Colors.mainBackgroundColor,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
  palette: {
    secondary: {
      main: Colors.simulacrumSecondary,
    },
    primary: { main: Colors.simulacrumPrimary },
  },
};
