import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';

import {
  LazyLoadedIntegrationSalesForcePage,
  LazyLoadedIntegrationLinkedinPage,
  LazyLoadedIntegrationGmailPage,
  LazyLoadedCampaignAnalytics,
  LazyLoadedSinglePlayground,
  LazyLoadedFollowUpBuilder,
  LazyLoadedForgotPassword,
  LazyLoadedSingleCampaign,
  LazyLoadedResetPassword,
  LazyLoadedRegistration,
  LazyLoadedConfirmEmail,
  LazyLoadedKBmanagement,
  LazyLoadedOrganization,
  LazyLoadedIntegration,
  LazyLoadedTrainCenter,
  LazyLoadedPlayground,
  LazyLoadedDashboard,
  LazyLoadedCampaigns,
  LazyLoadedNotFound,
  LazyLoadedContacts,
  LazyLoadedSettings,
  LazyLoadedSegments,
  LazyLoadedPayment,
  LazyLoadedLogin,
  LazyLoadedTask,
} from './views';
import { KBManagementContextProvider } from './views/KBmanagement/KBManagementContext';
import { OrganizationContextProvider } from './globalContexts/OrganizationContext';
import { CampaignsContextProvider } from './views/Campaigns/CampaignsContext';
import { ErrorBoundaryModal } from './common/components/ErrorBoundaryModal';
import { SegmentsContextProvider } from './views/Segments/SegmentsContext';
import SuspenseWrapper from './common/components/SuspenseWrapper';
import { PrivateRoute } from './common/components/PrivateRoute';
import { getThemeObjectByMode } from './globalStyles/theme';
import { AuthRoute } from './common/components/AuthRoute';
import DynamicStyles from './globalStyles/DynamicStyles';
import { Layout } from './common/Layouts/main/Layout';
import { toastConfigs } from './constants';
import './index.scss';
// import { App as CollectorApp } from 'collector/CollectorApp';
// import { ClientChat } from 'commutator/ClientChat';

const themeMode = 'light';

const App = () => {
  const themeOverrides = useMemo(() => getThemeObjectByMode(themeMode), []);
  return (
    <>
      <ToastContainer {...toastConfigs} />
      <CssBaseline />
      <DynamicStyles />
      <ThemeProvider theme={themeOverrides}>
        <ErrorBoundary fallback={<ErrorBoundaryModal />}>
          <OrganizationContextProvider>
            <CampaignsContextProvider>
              <Router>
                <Routes>
                  <Route
                    element={
                      <PrivateRoute>
                        <Layout />
                      </PrivateRoute>
                    }
                    path="/"
                  >
                    <Route
                      element={
                        <SuspenseWrapper wrapperForLayout>
                          <LazyLoadedOrganization />
                        </SuspenseWrapper>
                      }
                      path="/organization"
                    />
                    <Route
                      element={
                        <SuspenseWrapper wrapperForLayout>
                          <LazyLoadedDashboard />
                        </SuspenseWrapper>
                      }
                      path="/dashboard"
                    />
                    <Route
                      element={
                        <SuspenseWrapper wrapperForLayout>
                          <LazyLoadedContacts />
                        </SuspenseWrapper>
                      }
                      path="/contacts"
                    />
                    <Route
                      element={
                        <SuspenseWrapper wrapperForLayout>
                          <SegmentsContextProvider>
                            <LazyLoadedSegments />
                          </SegmentsContextProvider>
                        </SuspenseWrapper>
                      }
                      path="/segments"
                    />
                    <Route path="/campaigns">
                      <Route
                        element={
                          <SuspenseWrapper wrapperForLayout>
                            <LazyLoadedCampaigns />
                          </SuspenseWrapper>
                        }
                        path=""
                      />
                      <Route
                        element={
                          <SuspenseWrapper wrapperForLayout>
                            <LazyLoadedSingleCampaign />
                          </SuspenseWrapper>
                        }
                        path="campaign/:id"
                      />
                      <Route
                        element={
                          <SuspenseWrapper wrapperForLayout>
                            <LazyLoadedCampaignAnalytics />
                          </SuspenseWrapper>
                        }
                        path="analytics/:id"
                      />
                    </Route>
                    <Route path="/playground">
                      <Route
                        element={
                          <SuspenseWrapper wrapperForLayout>
                            <LazyLoadedPlayground />
                          </SuspenseWrapper>
                        }
                        path=""
                      />
                      <Route
                        element={
                          <SuspenseWrapper wrapperForLayout>
                            <LazyLoadedSinglePlayground />
                          </SuspenseWrapper>
                        }
                        path="conversation/:id"
                      />
                    </Route>
                    <Route
                      element={
                        <SuspenseWrapper wrapperForLayout>
                          <LazyLoadedFollowUpBuilder />
                        </SuspenseWrapper>
                      }
                      path="/follow-up builder"
                    />
                    <Route
                      element={
                        <SuspenseWrapper wrapperForLayout>
                          <LazyLoadedTrainCenter />
                        </SuspenseWrapper>
                      }
                      path="/train"
                    />
                    <Route
                      element={
                        <SuspenseWrapper wrapperForLayout>
                          <LazyLoadedTask />
                        </SuspenseWrapper>
                      }
                      path="/task"
                    />
                    <Route
                      element={
                        <KBManagementContextProvider>
                          <SuspenseWrapper wrapperForLayout>
                            <LazyLoadedKBmanagement />
                          </SuspenseWrapper>
                        </KBManagementContextProvider>
                      }
                      path="/kb-management"
                    />
                    <Route path="/integration">
                      <Route
                        element={
                          <SuspenseWrapper wrapperForLayout>
                            <LazyLoadedIntegration />
                          </SuspenseWrapper>
                        }
                        path=""
                      />
                      <Route
                        element={
                          <SuspenseWrapper wrapperForLayout>
                            <LazyLoadedIntegrationSalesForcePage />
                          </SuspenseWrapper>
                        }
                        path="salesforce"
                      />
                      <Route
                        element={
                          <SuspenseWrapper wrapperForLayout>
                            <LazyLoadedIntegrationGmailPage />
                          </SuspenseWrapper>
                        }
                        path="google"
                      />
                      <Route
                        element={
                          <SuspenseWrapper wrapperForLayout>
                            <LazyLoadedIntegrationLinkedinPage />
                          </SuspenseWrapper>
                        }
                        path="linkedin"
                      />
                    </Route>
                    <Route
                      element={
                        <SuspenseWrapper wrapperForLayout>
                          <LazyLoadedPayment />
                        </SuspenseWrapper>
                      }
                      path="/payment"
                    />
                    <Route
                      element={
                        <SuspenseWrapper wrapperForLayout>
                          <LazyLoadedSettings />
                        </SuspenseWrapper>
                      }
                      path="/settings"
                    />
                  </Route>

                  <Route element={<AuthRoute />} path="/">
                    <Route
                      element={
                        <SuspenseWrapper>
                          <LazyLoadedLogin />
                        </SuspenseWrapper>
                      }
                      path="/login"
                    />
                    <Route
                      element={
                        <SuspenseWrapper>
                          <LazyLoadedConfirmEmail />
                        </SuspenseWrapper>
                      }
                      path="/confirm-email"
                    />
                    <Route
                      element={
                        <SuspenseWrapper>
                          <LazyLoadedForgotPassword />
                        </SuspenseWrapper>
                      }
                      path="/forgot-password"
                    />
                    <Route
                      element={
                        <SuspenseWrapper>
                          <LazyLoadedResetPassword />
                        </SuspenseWrapper>
                      }
                      path="/reset-password"
                    />
                    <Route
                      element={
                        <SuspenseWrapper>
                          <LazyLoadedRegistration />
                        </SuspenseWrapper>
                      }
                      path="/registration"
                    />
                  </Route>
                  <Route
                    element={
                      <SuspenseWrapper>
                        <LazyLoadedNotFound />
                      </SuspenseWrapper>
                    }
                    path="*"
                  />
                </Routes>
              </Router>
            </CampaignsContextProvider>
          </OrganizationContextProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </>
  );
};
ReactDOM.render(<App />, document.getElementById('app'));
