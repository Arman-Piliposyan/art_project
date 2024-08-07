import createAxiosInstance from '../api/axios';

export const getWidgetTypes = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get('/organization/organizations/widget-types');
    return response;
  } catch (error) {
    throw error;
  }
};

export const widgetBehavior = async (widgetKey: string) => {
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${widgetKey}`,
    },
  };
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await createAxiosInstance().get(
      `/organization/organizations/widget-configuration`,
      axiosConfig,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
