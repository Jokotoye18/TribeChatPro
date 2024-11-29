import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Avatar from "./Avatar";
import { globalStyles } from "@/src/constants/globalStyles";
import { DateTime } from "luxon";

type TMessageHeader = {
  participant: TParticipant;
  isCurrentUser: boolean;
  sentTimestamp: number;
  handleSetParticipant: (participant: TParticipant) => void;
};
const MessageHeader = ({
  participant,
  isCurrentUser,
  sentTimestamp,
  handleSetParticipant,
}: TMessageHeader) => {
  return (
    <View style={[globalStyles.rowBetween, { marginBottom: 8 }]}>
      <Avatar
        name={participant.name}
        uri={participant.avatarUrl}
        onPress={() => handleSetParticipant(participant)}
      />
      <View style={[{ alignSelf: "flex-start" }]}>
        <Text
          style={[styles.name, { color: isCurrentUser ? "white" : "black" }]}
        >
          {participant.name}
        </Text>
        {sentTimestamp ? (
          <Text
            style={[
              styles.time,
              {
                color: isCurrentUser ? "white" : "black",
              },
            ]}
          >
            {DateTime.fromMillis(sentTimestamp).toFormat("hh:mm a")}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 14,
    textAlign: "right",
    fontWeight: "600",
    fontFamily: "Nunito-SemiBold",
  },
  time: {
    fontSize: 12,
    fontFamily: "Nunito-Italic",
    textAlign: "right",
  },
});

export default MessageHeader;
