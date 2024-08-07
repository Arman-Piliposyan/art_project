import createAxiosInstance from '../api/axios';

export const checkLinkedinStatus = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get('/channel/checkIntegrationStatusLikedIn');
    return response;
  } catch (error) {
    throw error;
  }
};

export const getLinkedinSignInUrl = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get('/channel/linkedin/url');
    return response;
  } catch (error) {
    throw error;
  }
};

export const revokeLinkedin = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().post('/channel/revoke');
    return response;
  } catch (error) {
    throw error;
  }
};

export const postLinkedinToken = (token: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().post('/channel/linkedin-token', { token });
    return response;
  } catch (error) {
    throw error;
  }
};
