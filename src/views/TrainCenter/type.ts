export type TrainItemType = {
  conversationId: string | null;
  userMessage: string;
  campaignId: string;
  createdAt: string;
  boundedTo: string;
  aiMessage: string;
  id: string;
};

export type TrainDataType = {
  data: TrainItemType[];
  totalResults: number;
  currentPage: number;
  totalPages: number;
};

export type UploadFileModalDataType = {
  step1: {
    isFileUploaded: boolean;
    importId: string | null;
    file: null;
  };
  step3: {
    reflectionType: string;
    campaignId: string;
  };
  defaultFieldsOptions: { label: string; value: string }[] | [];
  step2: {
    columnMappings: null | [];
  };
  step: number;
};
