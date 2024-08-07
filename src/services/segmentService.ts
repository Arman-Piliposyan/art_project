import { SegmentDataType } from '../views/Segments/types';
import createAxiosInstance from '../api/axios';

export const getAllFields = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(`organization/api/contact-schemas/fields`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getConditions = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(`organization/api/Integration/sales-force/segment/conditions`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getFieldValues = (data: { fieldName: string; criterias: string }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(
      `organization/api/contacts/field-values?FieldName=${data.fieldName}&conditionsString=${data.criterias}`,
    );
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

export const getAllSegments = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get('organization/api/segmentsv2');
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSegment = (segmentId: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(`organization/api/segmentsv2/${segmentId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const saveSegmentPost = (data: SegmentDataType) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().post('organization/api/segmentsv2', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteSegment = (segmentId: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().delete(`organization/api/segmentsv2/${segmentId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
