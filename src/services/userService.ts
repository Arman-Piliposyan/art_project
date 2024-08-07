import createAxiosInstance from '../api/axios';

export const getUserData = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get('/identity/me');
    return response;
  } catch (error) {
    throw error;
  }
};
