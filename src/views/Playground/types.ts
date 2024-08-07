// export enum CampaignSteps {
//   'Configurations',
//   'Contacts',
//   'Objectives',
//   'Overview',
//   'Message',
// }

export type CampaignDataType = {
  status: CampaignStatusEnum;
  completedLeads: string;
  createdAt: string;
  isActive: boolean;
  sender: string;
  name: string;
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

export type OptionsType = { value: number | string; label: string };

export type ConfigurationTabOptionsType = {
  messageLength: OptionsType[];
  llmModel: OptionsType[];
  channel: OptionsType[];
  aiRole: OptionsType[];
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
