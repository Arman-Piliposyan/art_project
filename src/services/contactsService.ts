import createAxiosInstance from '../api/axios';

export const getAllContacts = (page: number) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(`organization/api/contacts?Page=${page}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSingleContact = (id: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(
      `organization/api/Integration/sales-force/contacts/${id}/fields`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getContactDefaultFields = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get('organization/api/simulacrum-fields/default-fields');
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCustomFieldsTypes = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get('organization/api/simulacrum-fields/fields-data-types');
    return response;
  } catch (error) {
    throw error;
  }
};

export const createCustomFieldsType = (data: {
  defaultValue: boolean | null;
  length: number | string;
  label: string;
  type: string;
}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().post('organization/api/custom-fields', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const uploadFieldPost = async (data: {
  mappings: { simulacrumType: string; originalName: string }[];
  importId: string;
}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await createAxiosInstance().post('organization/api/contact-import/map', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUploadedFile = async (importId: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await createAxiosInstance().delete(`organization/api/contact-import/${importId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPreviewContacts = (data: { searchValue?: string; importId: string; page: number }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(
      `/organization/api/contact-import/search?term=${data.searchValue || ''}&Page=${
        data.page
      }&Results=5&importId=${data.importId}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const confirmImportCSV = async (importId: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await createAxiosInstance().post('organization/api/contact-import/confirm', {
      importId,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
