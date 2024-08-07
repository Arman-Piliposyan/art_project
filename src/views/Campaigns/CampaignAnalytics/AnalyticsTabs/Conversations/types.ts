export type ConversationType = {
  userData: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  date: string;
  id: string;
};

export type ConversationsDataType = { conversations: ConversationType[]; groupDate: string }[] | null | [];

export interface IMessage {
  created?: string;
  message: string;
  source: string;
}
