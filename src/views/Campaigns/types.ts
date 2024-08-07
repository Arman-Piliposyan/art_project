export type CampaignDataType = {
  status: CampaignStatusEnum;
  completedLeads: string;
  createdAt: string;
  isActive: boolean;
  sender: string;
  name: string;
  type: string;
  id: string;
};

export type SelectedCampaignDataType = {
  completedLeads: string;
  createdAt: string;
  isActive: boolean;
  sender: string;
  status: number;
  name: string;
  type: number;
  id: string;
};

export type SingleCampaignDataType = {
  step2: {
    conversationMessageTone: number;
    dynamicVariables: string[];
    aiCompanyIndustry: string;
    fallbackMessage: string;
    useChatHistory: boolean;
    creativityLevel: number;
    kbDocumentIds: string[];
    aiCompanyEmail: string;
    aiCompanyPhone: string;
    aiCompanyName: string;
    globalContext: string;
    messageLength: number;
    fallbackType: number;
    aiPosition: string;
    useEmoji: boolean;
    channel: number;
    aiName: string;
    goal: string;
  };
  step1: {
    segmentId: string;
  };
  isPlaygroundStarted: boolean;
  createdAt: string;
  name: string;
  id: string;
};

export type OptionsType = { value: number | string; label: string };

export type ConfigurationOptionsType = {
  conversationMessageTone: OptionsType[];
  messageLength: OptionsType[];
  fallbackType: OptionsType[];
  channel: OptionsType[];
};

export type MessageTabOptionsType = {
  documentsOptions: OptionsType[];
  fieldsOptions: string[];
};

export type PreviewSectionDataType = {
  messagePreview: string;
  contactId: number;
};

export type ContactTabDataType = {
  criteria: {
    conditionNum: number;
    fieldName: string;
    value: string;
  }[];
  segmentsOptions: OptionsType[];
  segmentContacts: OptionsType[];
};

export enum CampaignStatusEnum {
  Completed = 5,
  Scheduled = 2,
  Running = 4,
  OnHold = 3,
  Draft = 1,
}

export enum CampaignTypeEnum {
  singleConversation = 1,
  multiConversation = 2,
  singleChannel = 3,
  multiChannel = 4,
}
