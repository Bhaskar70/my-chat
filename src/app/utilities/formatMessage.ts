interface Message {
    user: string;
    message: string;
    time: string;
    read: boolean;
    type: string;
    _id: string;
}

 export function messagesGroupedByDate(message : Message[]) {
    const groupedMessages = groupMessagesByDate(message);
    const today = new Date().toDateString()
    return Object.keys(groupedMessages).map((date) => ({
      date: date == today ? 'Today' : date,
      messages: groupedMessages[date],
    }));
  }
export function groupMessagesByDate(messages: Message[]): { [date: string]: Message[] } {
    const groupedMessages: { [date: string]: Message[] } = {};

    messages.forEach(message => {
        // Get the date from the message
        const messageDate = new Date(message.time);
        const dateString = messageDate.toDateString(); // Get date string

        // Check if this date already exists in groupedMessages
        if (!groupedMessages[dateString]) {
            groupedMessages[dateString] = []; // Initialize if it doesn't exist
        }

        // Add the message to the corresponding date
        groupedMessages[dateString].push(message);
    });

    return groupedMessages;
}
