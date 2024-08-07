import { lazy } from 'react';

// AuthPages
export const LazyLoadedLogin = lazy(() => import('./Login'));
export const LazyLoadedRegistration = lazy(() => import('./Registration'));
export const LazyLoadedConfirmEmail = lazy(() => import('./ConfirmEmail'));
export const LazyLoadedResetPassword = lazy(() => import('./ResetPassword'));
export const LazyLoadedForgotPassword = lazy(() => import('./ForgotPassword'));

// PrivatePages
export const LazyLoadedIntegrationLinkedinPage = lazy(
  () => import('./Integration/Linkedin/IntegrationLinkedinPage'),
);
export const LazyLoadedIntegrationGmailPage = lazy(() => import('./Integration/Gmail/IntegrationGmailPage'));
export const LazyLoadedCampaignAnalytics = lazy(() => import('./Campaigns/CampaignAnalytics'));
export const LazyLoadedSinglePlayground = lazy(() => import('./Playground/SinglePlayground'));
export const LazyLoadedSingleCampaign = lazy(() => import('./Campaigns/SingleCampaign'));
export const LazyLoadedFollowUpBuilder = lazy(() => import('./FollowUpBuilder'));
export const LazyLoadedOrganization = lazy(() => import('./Organization'));
export const LazyLoadedKBmanagement = lazy(() => import('./KBmanagement'));
export const LazyLoadedIntegration = lazy(() => import('./Integration'));
export const LazyLoadedTrainCenter = lazy(() => import('./TrainCenter'));
export const LazyLoadedPlayground = lazy(() => import('./Playground'));
export const LazyLoadedDashboard = lazy(() => import('./Dashboard'));
export const LazyLoadedCampaigns = lazy(() => import('./Campaigns'));
export const LazyLoadedSegments = lazy(() => import('./Segments'));
export const LazyLoadedContacts = lazy(() => import('./Contacts'));
export const LazyLoadedSettings = lazy(() => import('./Settings'));
export const LazyLoadedPayment = lazy(() => import('./Payment'));
export const LazyLoadedTask = lazy(() => import('./Task'));
export const LazyLoadedIntegrationSalesForcePage = lazy(
  () => import('./Integration/SalesForce/IntegrationSalesForcePage'),
);

export const LazyLoadedNotFound = lazy(() => import('./NotFound'));
