import { WALLE_BASE_URL } from '../constants/envVarables';
import { ISubUrl } from '../views/KBmanagement/types';
import createAxiosInstance from '../api/axios';

export const getAllDocuments = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(`${WALLE_BASE_URL}/api/v1/ai-knowledge/documents`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDocument = (documentId: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(
      `${WALLE_BASE_URL}/api/v1/ai-knowledge/${documentId}/document-text`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteDocument = (documentId: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().delete(
      `${WALLE_BASE_URL}/api/v1/ai-knowledge/document/${documentId}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const createDocument = async (data: FormData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await createAxiosInstance().post(
      `${WALLE_BASE_URL}/api/v1/ai-knowledge/document-content`,
      data,
      axiosConfig,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateFolder = async ({ groupId, data }: { groupId: string; data: FormData }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await createAxiosInstance().put(
      `${WALLE_BASE_URL}/api/v1/ai-knowledge/document-content?groupId=${groupId}`,
      data,
      axiosConfig,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSubUrls = (mainUrl: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(
      `${WALLE_BASE_URL}/api/v1/ai-knowledge/sub-urls?mainUrl=${mainUrl}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const createScrapDocuments = async (data: { groupName: string; subUrls: ISubUrl }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await createAxiosInstance().post(
      `${WALLE_BASE_URL}/api/v1/ai-knowledge/url-content`,
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateScrapDocuments = async (data: { subUrls: ISubUrl; groupId: string }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await createAxiosInstance().put(
      `${WALLE_BASE_URL}/api/v1/ai-knowledge/url-content`,
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getHasKb = (widgetKey: string) => {
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${widgetKey}`,
    },
  };
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(
      `${WALLE_BASE_URL}/api/v1/ai-knowledge/health-check`,
      axiosConfig,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const createChat = async (widgetKey: string) => {
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${widgetKey}`,
    },
  };
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await createAxiosInstance().post(
      `${WALLE_BASE_URL}/api/v1/ai-chat/create`,
      null,
      axiosConfig,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const createKB = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await createAxiosInstance().post(`${WALLE_BASE_URL}/api/v1/ai-knowledge/commit`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async ({
  widgetKey,
  message,
  chatId,
}: {
  widgetKey: string;
  message: string;
  chatId: string;
}) => {
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${widgetKey}`,
    },
  };
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await createAxiosInstance().post(
      `${WALLE_BASE_URL}/api/v1/ai-chat/message`,
      {
        chat_id: chatId,
        message,
      },
      axiosConfig,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getFileChunks = ({
  content = '',
  documentId,
  page = 1,
}: {
  documentId: string;
  content: string;
  page: number;
}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(
      `${WALLE_BASE_URL}/api/v1/ai-knowledge/document/${documentId}?page=${page}&content=${content}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteChunk = (chunkId: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().delete(
      `${WALLE_BASE_URL}/api/v1/ai-knowledge/document/chunks/${chunkId}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const editChunk = ({
  documentId,
  content,
  id,
}: {
  documentId: string;
  content: string;
  id: string;
}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().patch(
      `${WALLE_BASE_URL}/api/v1/ai-knowledge/document/${documentId}`,
      {
        content,
        id,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getTrainData = ({
  content = '',
  filterBy,
  page = 1,
}: {
  filterBy: 'organization' | 'campaign' | 'all';
  content: string;
  page: number;
}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(
      `${WALLE_BASE_URL}/api/v1/ai-train/train-data?content=${content}&page=${page}&filterBy=${filterBy}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCampaignsOptions = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(`${WALLE_BASE_URL}/api/v1/ai-campaign/campaigns-by-channels`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createTrain = (data: {
  conversationId: string | null;
  campaignId: string | null;
  userMessage: string;
  aiMessage: string;
}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().post(`${WALLE_BASE_URL}/api/v1/ai-train/train-data`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const editTrain = (
  data: {
    conversationId: string | null;
    campaignId: string | null;
    userMessage: string;
    aiMessage: string;
  },
  trainId: string,
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().patch(
      `${WALLE_BASE_URL}/api/v1/ai-train/train-data/${trainId}`,
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteTrain = (id: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().delete(`${WALLE_BASE_URL}/api/v1/ai-train/train-data/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addFieldPost = async (data: {
  columnMappings: { simulacrumType: string; originalName: string }[];
  campaignId: string | null;
  importId: string;
}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await createAxiosInstance().post(`${WALLE_BASE_URL}/api/v1/ai-train/train-file`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteFile = async (id: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await createAxiosInstance().delete(`${WALLE_BASE_URL}/api/v1/ai-train/train-file/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPlayGroundData = (campaignId: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(
      `${WALLE_BASE_URL}/api/v1/ai-campaign/${campaignId}/conversations?channels=4`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const sendPlaygroundMessage = async (data: { conversationId: string; message: string }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await createAxiosInstance().post(
      `${WALLE_BASE_URL}/api/v1/ai-campaign/playground/send`,
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
