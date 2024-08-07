import { createTheme, PaletteMode } from '@mui/material';

import { lightThemeObject } from './lightTheme';
import { darkThemeObject } from './darkTheme';

const themeObject = {
  light: lightThemeObject,
  dark: darkThemeObject,
};

function getThemeObjectByMode(mode: PaletteMode) {
  return createTheme({
    palette: {
      mode,
      ...themeObject[mode].palette,
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    components: { ...themeObject[mode].components },
    typography: {},
    error: {},
  });
}

export { getThemeObjectByMode };
