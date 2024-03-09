export interface User {
    _id: string;
    name: string;
    phone: string;
    email: string;
    __v: number;
}

export interface Friends {
    friendName: string;
    friendUserName: string;
    isFriend: boolean;
    chatId: string;
    _id: string;
}

export interface Message {
    user: string;
    message: string;
    time: string;
    read: boolean;
    type: string;
    _id: string;
}

export interface MessageGroup {
    date: string;
    messages: Message[];
}

export interface MessageList {
    messages: MessageGroup[];
}
export interface Friend {
    friendName: string;
    friendUserName: string;
    isFriend: boolean;
    chatId: string;
    _id: string;
}