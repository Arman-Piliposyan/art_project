import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';

import SuspenseWrapper from './common/components/SuspenseWrapper';
import { getThemeObjectByMode } from './globalStyles/theme';
import { ConfigurationContextProvider } from './Contexts';
import DynamicStyles from './globalStyles/DynamicStyles';
import { LazyLoadedConfigurationPage } from './views';
import './index.scss';

const themeMode = 'light';

const App = () => {
  const themeOverrides = useMemo(() => getThemeObjectByMode(themeMode), []);

  return (
    <>
      <CssBaseline />
      <DynamicStyles />
      <ThemeProvider theme={themeOverrides}>
        <Router>
          <Routes>
            <Route
              element={
                <ConfigurationContextProvider>
                  <SuspenseWrapper>
                    <LazyLoadedConfigurationPage />
                  </SuspenseWrapper>
                </ConfigurationContextProvider>
              }
              path="/"
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};
ReactDOM.render(<App />, document.getElementById('app'));
