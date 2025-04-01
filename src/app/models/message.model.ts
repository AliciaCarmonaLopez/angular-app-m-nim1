export interface Message {
  _id?: string;
  content: string;
  sender: string;
  receiver: string;
  read: boolean;
  createdAt: Date;
}
export class Message implements Message {
  constructor() {
  }
}
