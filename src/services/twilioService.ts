import createAxiosInstance from '../api/axios';

export const getIsTwilioIntegrated = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get('channel/checkIntegrationStatus');
    return response;
  } catch (error) {
    throw error;
  }
};

export const connectTwilio = (data: {
  organizationName: string;
  phoneNumber: string;
  accountSid: string;
  authToken: string;
}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().post('channel/validate-credentials', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const revokeTwilioConnection = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().delete('/channel/revoke-integration');
    return response;
  } catch (error) {
    throw error;
  }
};

export const getTwilioPhoneNumber = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get('channel/organizationPhoneNumber');
    return response;
  } catch (error) {
    throw error;
  }
};

export const checkTwilioStatus = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get('channel/checkIntegrationStatus');
    return response;
  } catch (error) {
    throw error;
  }
};
