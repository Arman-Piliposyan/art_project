import { WALLE_BASE_URL } from '../constants/envVarables';
import createAxiosInstance from '../api/axios';

export const getAllCampaigns = (chanel?: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(
      `${WALLE_BASE_URL}/api/v1/ai-campaign/campaigns${chanel ? `?channels=${chanel}` : ''}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const createCampaignPost = ({ name, type }: { name: string; type: number }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().post(`${WALLE_BASE_URL}/api/v1/ai-campaign/campaign`, {
      name,
      type,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCampaignData = (id: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(`${WALLE_BASE_URL}/api/v1/ai-campaign/campaigns/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAiConfigurationOptions = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(`${WALLE_BASE_URL}/api/v1/ai-campaign/configuration-options`);
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

export const getAiPricing = (llmModelValue: number, id: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(
      `${WALLE_BASE_URL}/api/v1/ai-campaign/${llmModelValue}/llm-pricing?campaignId=${id}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveCampaignPatch = (data: any) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().patch(`${WALLE_BASE_URL}/api/v1/ai-campaign/campaign`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getConversations = (campaignId: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(
      `${WALLE_BASE_URL}/api/v1/ai-campaign/${campaignId}/conversations`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSingleConversation = ({
  conversationId,
  campaignId,
}: {
  conversationId: string;
  campaignId: string;
}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(
      `${WALLE_BASE_URL}/api/v1/ai-campaign/${campaignId}/conversations/${conversationId}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const generateMessagePreview = (data: { campaignId: string; contactId: string }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().post(
      `${WALLE_BASE_URL}/api/v1/ai-campaign/campaign/preview-message`,
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const saveAndPublish = (campaignId: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().post(
      `${WALLE_BASE_URL}/api/v1/ai-campaign/${campaignId}/run-campaign`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
