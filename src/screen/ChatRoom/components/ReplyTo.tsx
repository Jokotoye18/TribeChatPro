import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { globalStyles } from "@/src/constants/globalStyles";

type TReplyTo = {
  replyToMessage?: Omit<TMessage, "replyToMessageUuid">;
  replyToParticipant?: TParticipant | null;
  isCurrentUser: boolean;
};
const ReplyTo = ({
  replyToMessage,
  replyToParticipant,
  isCurrentUser,
}: TReplyTo) => {
  return (
    <View
      style={[
        styles.reply,
        {
          backgroundColor: isCurrentUser ? "#759CFF" : "#e4e4e4",
        },
      ]}
    >
      <View style={globalStyles.rowBetween}>
        <Text style={styles.replyName}>{replyToParticipant?.name}</Text>
        <FontAwesome name="reply" size={20} color="black" />
      </View>
      <Text
        style={[
          styles.replyText,
          { color: isCurrentUser ? "white" : undefined },
        ]}
      >
        {replyToMessage?.text}
      </Text>
    </View>
  );
};

export default ReplyTo;

const styles = StyleSheet.create({
  replyText: {
    fontFamily: "Nunito-Regular",
    fontSize: 12,
  },
  replyName: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 14,
  },
  reply: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 8,
    marginHorizontal: 4,
    marginTop: 4,
  },
});
