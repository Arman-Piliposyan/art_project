import createAxiosInstance from '../api/axios';

export const getIsIntegrations = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get('organization/api/integrations');
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSalesForceSignInUrl = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get('organization/api/Integration/sales-force');
    return response;
  } catch (error) {
    throw error;
  }
};

export const postSalesForceToken = (code: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().post(
      `organization/api/Integration/sales-force/token?Code=${code}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const syncSalesForce = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().post('organization/api/Integration/sales-force/sync');
    return response;
  } catch (error) {
    throw error;
  }
};

//Global calls
export const revokeIntegration = (integrationType: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().post('organization/api/integrations/revoke', {
      integrationType,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const initImportingSource = (source: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().post('organization/api/contact-import/init', { source });
    return response;
  } catch (error) {
    throw error;
  }
};

export const chooseImportingViewType = (data: { importId: string; viewType: number }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().post('organization/api/contact-import/load', data);
    return response;
  } catch (error) {
    throw error;
  }
};
