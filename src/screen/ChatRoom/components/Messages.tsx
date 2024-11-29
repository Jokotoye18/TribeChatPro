import React, { memo } from "react";
import { FlashList } from "@shopify/flash-list";
import MessageItem from "./MessageItem";
import { globalStyles } from "@/src/constants/globalStyles";

type TMessages = {
  messages: TConsecutiveMessage[];
  handleSetReaction: (reaction: TReaction[]) => void;
  handleSetParticipant: (reaction: TParticipant) => void;
};

const Messages = memo(
  ({ messages, handleSetParticipant, handleSetReaction }: TMessages) => {
    return (
      <FlashList
        data={messages}
        keyExtractor={(item) => item.messages[0].uuid}
        estimatedItemSize={300}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        renderItem={({ item }) => {
          return (
            <MessageItem
              message={item}
              handleSetReaction={handleSetReaction}
              handleSetParticipant={handleSetParticipant}
            />
          );
        }}
        contentContainerStyle={{
          ...globalStyles.containerPadding,
          paddingVertical: 16,
        }}
      />
    );
  }
);

Messages.displayName = "Messages";

export default Messages;
