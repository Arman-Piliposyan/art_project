import { WALLE_BASE_URL } from '../constants/envVarables';
import createAxiosInstance from '../api/axios';

export const getIsOpenAiIntegrated = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(`${WALLE_BASE_URL}/api/v1/ai-integration/integration`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const connectOpenAi = (secretKey: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().post(`${WALLE_BASE_URL}/api/v1/ai-integration/integration`, {
      secretKey,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const revokeOpenAiConnection = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().delete(`${WALLE_BASE_URL}/api/v1/ai-integration/integration`);
    return response;
  } catch (error) {
    throw error;
  }
};
