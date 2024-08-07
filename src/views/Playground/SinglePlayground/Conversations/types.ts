export type ConversationType = {
  userData: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  hasUnseenMessage: boolean;
  groupIndex?: number;
  date: string;
  id: string;
};

export type ConversationsDataType = { conversations: ConversationType[]; groupDate: string }[] | null | [];

export interface IMessage {
  created?: string;
  message: string;
  source: string;
}

export type OptionsType = { value: string; label: string };
