export const groupConsecutiveMessages = (
  messages: TMessageJSON[]
): TConsecutiveMessage[] => {
  const groupedMessages = [];
  let currentGroup = null;

  for (const message of messages) {
    if (currentGroup && currentGroup.authorUuid === message.authorUuid) {
      currentGroup.messages.push(message);
    } else {
      if (currentGroup) {
        groupedMessages.push(currentGroup);
      }
      currentGroup = {
        authorUuid: message.authorUuid,
        messages: [message],
      };
    }
  }

  // Push the last group
  if (currentGroup) {
    groupedMessages.push(currentGroup);
  }

  return groupedMessages;
};
