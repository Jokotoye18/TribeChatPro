import { DateTime } from "luxon";

export const mockGroupMessages = [
  {
    authorUuid: "cd8d9e73-2b25-4e48-9ec8-d9505a8c9ccf",
    messages: [
      {
        attachments: [],
        authorUuid: "cd8d9e73-2b25-4e48-9ec8-d9505a8c9ccf",
        reactions: [],
        sentAt: 1732677965511,
        text: "Deporto itaque cohaero crapula temeritas vereor.",
        updatedAt: 1732701986318,
        uuid: "9eaf2ebe-5b3d-4ed9-bf66-eb03ad9d4ac2",
      },
      {
        attachments: [],
        authorUuid: "cd8d9e73-2b25-4e48-9ec8-d9505a8c9ccf",
        reactions: [],
        sentAt: 1732678965511,
        text: "Another message from the same participant.",
        updatedAt: 1732701986318,
        uuid: "8eaf3ebe-6b3d-4ed9-bf66-eb03ad9d4ac3",
      },
    ],
  },
  {
    authorUuid: "e3d95e73-3a25-4b48-8ec8-d9505a8c9cdd",
    messages: [
      {
        attachments: [],
        authorUuid: "e3d95e73-3a25-4b48-8ec8-d9505a8c9cdd",
        reactions: [],
        sentAt: 1732777965511,
        text: "A message from a different participant.",
        updatedAt: 1732801986318,
        uuid: "7faf2ebe-3c3d-4ed9-bf66-eb03ad9d4ac4",
      },
    ],
  },
];

export const groupMessagesByDate = (
  messages: TConsecutiveMessage[]
): TDateGroupMessage[] => {
  const dateGroups: Record<
    string,
    { authorUuid: string; messages: TMessageJSON[] }[]
  > = {};
  messages.forEach((authorGroup) => {
    authorGroup.messages.forEach((message) => {
      // Format the sentAt timestamp into a date string (YYYY-MM-DD)
      const date = DateTime.fromMillis(message.sentAt).toISODate() as string;

      if (!dateGroups[date]) {
        dateGroups[date] = [];
      }

      // Check if the author already has messages grouped for this date
      const authorMessages = dateGroups[date].find(
        (group) => group.authorUuid === authorGroup.authorUuid
      );

      if (authorMessages) {
        authorMessages.messages.push(message);
      } else {
        dateGroups[date].push({
          authorUuid: authorGroup.authorUuid,
          messages: [message],
        });
      }
    });
  });
  // Transform the grouped data into the desired structure
  return Object.entries(dateGroups).map(([date, messages]) => ({
    date,
    messages,
  }));
};
