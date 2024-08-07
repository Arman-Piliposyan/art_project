import createAxiosInstance from '../api/axios';

export const checkGmailStatus = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get('/channel/auth/checkIntegrationStatus');
    return response;
  } catch (error) {
    throw error;
  }
};

export const getGmailSignInUrl = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get('/channel/auth/google-url');
    return response;
  } catch (error) {
    throw error;
  }
};

export const revokeGmail = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().post('/channel/auth/logout');
    return response;
  } catch (error) {
    throw error;
  }
};

export const postGmailToken = (token: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().post('/channel/auth/google-token', { token });
    return response;
  } catch (error) {
    throw error;
  }
};
