import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

import React, { memo } from "react";
import { DateTime } from "luxon";

import { useGlobalStore } from "@/src/store/slices";
import MessageHeader from "./MessageHeader";
import MessageAttachment from "./MessageAttachment";
import MessageReaction from "./MessageReaction";
import ReplyTo from "./ReplyTo";

type TMessageItem = {
  message: TConsecutiveMessage;
  handleSetReaction: (reaction: TReaction[]) => void;
  handleSetParticipant: (reaction: TParticipant) => void;
};

export const MESSAGE_CARD_PADDING_HORIZONTAL = 8;

const MessageItem = memo(
  ({ message, handleSetReaction, handleSetParticipant }: TMessageItem) => {
    const { width } = useWindowDimensions();

    const isCurrentUser = message.authorUuid === "you";

    const participants = useGlobalStore((state) => state.participants);

    const getParticipant = (key: string) => {
      return participants?.find((participant) => participant.uuid === key);
    };

    const participantInfo = getParticipant(message.authorUuid);

    const hasGroup = message?.messages?.length > 1;
    const hasReaction = message?.messages?.[-1]?.reactions?.length > 0;

    return (
      <View
        style={[
          hasGroup && {
            marginBottom: 24,
            borderLeftWidth: isCurrentUser ? 0 : 4,
            borderRightWidth: isCurrentUser ? 4 : 0,
            paddingLeft: isCurrentUser ? 0 : 2,
            paddingRight: isCurrentUser ? 2 : 0,
            borderColor: isCurrentUser ? "#345EC2" : "#D9D9D9",
            borderRadius: 16,
            borderBottomLeftRadius: isCurrentUser ? 0 : hasReaction ? 24 : 0,
            borderBottomRightRadius: isCurrentUser ? (hasReaction ? 36 : 0) : 0,
          },
        ]}
      >
        {message.messages.map((chat) => {
          const isReplyTo = Boolean(chat.replyToMessage);
          const hasAttachement = chat.attachments.length > 0;
          const replyToParticipant = chat.replyToMessage
            ? getParticipant(chat.replyToMessage?.authorUuid)
            : null;
          const sentTimestamp = chat?.sentAt;
          const updatedTimestamp = chat?.updatedAt;
          const updatedTime = DateTime.fromMillis(updatedTimestamp);
          const sentTime = DateTime.fromMillis(sentTimestamp);
          const isEditted = updatedTime > sentTime;
          return (
            <View
              key={chat.uuid}
              style={[
                styles.wrapper,
                {
                  justifyContent: isCurrentUser ? "flex-end" : "flex-start",
                  marginBottom: hasGroup ? 12 : 24,
                },
              ]}
            >
              <View>
                <View
                  style={[
                    styles.container,
                    {
                      width: width / 1.5,
                      backgroundColor: isCurrentUser ? "#4A7FEB" : "white",
                      borderBottomLeftRadius: isCurrentUser ? 0 : 16,
                      borderBottomRightRadius: isCurrentUser ? 16 : 0,
                    },
                  ]}
                >
                  {isReplyTo ? (
                    <ReplyTo
                      replyToMessage={chat.replyToMessage}
                      replyToParticipant={replyToParticipant}
                      isCurrentUser={isCurrentUser}
                    />
                  ) : null}
                  <View
                    style={{
                      paddingBottom: 16,
                      paddingTop: isReplyTo ? 4 : 16,
                      paddingHorizontal: MESSAGE_CARD_PADDING_HORIZONTAL,
                    }}
                  >
                    <View>
                      {participantInfo ? (
                        <MessageHeader
                          participant={participantInfo}
                          handleSetParticipant={handleSetParticipant}
                          sentTimestamp={sentTimestamp}
                          isCurrentUser={isCurrentUser}
                        />
                      ) : null}
                      {hasAttachement &&
                      chat?.attachments?.[0]?.type === "image" ? (
                        <MessageAttachment
                          message={chat}
                          padding={MESSAGE_CARD_PADDING_HORIZONTAL}
                        />
                      ) : null}

                      <Text
                        style={[
                          styles.message,
                          { color: isCurrentUser ? "white" : "black" },
                        ]}
                      >
                        {chat.text}
                      </Text>
                    </View>

                    {isEditted ? (
                      <Text
                        style={[
                          styles.edited,
                          { color: isCurrentUser ? "#F5F5F5" : "#888888" },
                        ]}
                      >
                        {`Edited ${DateTime.fromMillis(updatedTimestamp).toFormat("hh:mm a")}`}
                      </Text>
                    ) : null}
                  </View>
                  {chat?.reactions?.length > 0 ? (
                    <MessageReaction
                      reactions={chat.reactions}
                      isCurrentUser={isCurrentUser}
                      handleSetReaction={handleSetReaction}
                    />
                  ) : null}
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
);

MessageItem.displayName = "MessageItem";

export default MessageItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    marginBottom: 10,
  },
  container: {
    borderRadius: 16,
  },
  message: {
    fontSize: 14,
    fontFamily: "Nunito-Regular",
  },
  edited: {
    fontSize: 11,
    fontFamily: "Nunito-Regular",
    textAlign: "right",
  },
});
