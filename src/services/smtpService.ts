import createAxiosInstance from '../api/axios';

export const getIsSmtpIntegrated = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get('channel/checkIntegrationStatusForSMTP');
    return response;
  } catch (error) {
    throw error;
  }
};

export const connectSmtp = (data: {
  smtpEnable: boolean;
  imapEnable: boolean;
  smtpHost: string;
  smtpUser: string;
  smtpPass: string;
  imapHost: string;
  imapUser: string;
  imapPass: string;
  smtpPort: number;
  imapPort: number;
}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().post('channel/login', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const revokeSmtpConnection = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().delete('channel/revoke');
    return response;
  } catch (error) {
    throw error;
  }
};
