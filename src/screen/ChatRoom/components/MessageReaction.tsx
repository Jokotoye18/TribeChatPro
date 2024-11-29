import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { globalStyles } from "@/src/constants/globalStyles";

type TMessageReaction = {
  reactions: TReaction[];
  isCurrentUser: boolean;
  handleSetReaction: (reactions: TReaction[]) => void;
};
const MessageReaction = ({
  reactions,
  isCurrentUser,
  handleSetReaction,
}: TMessageReaction) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => handleSetReaction(reactions)}
      style={[
        globalStyles.rowStart,
        styles.reactions,
        {
          backgroundColor: isCurrentUser ? "#759CFF" : "#e4e4e4",
        },
      ]}
    >
      {reactions.slice(0, 5).map((reaction, index) => {
        return (
          <View key={index} style={[globalStyles.rowStart, { marginRight: 4 }]}>
            <Text>{reaction.value}</Text>
          </View>
        );
      })}
      {reactions.length > 5 ? (
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Nunito-SemiBold",
          }}
        >
          {reactions.length}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default MessageReaction;

const styles = StyleSheet.create({
  reactions: {
    borderRadius: 16,
    position: "absolute",
    bottom: -10,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
