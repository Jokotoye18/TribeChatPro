import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import Avatar from "./Avatar";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

type TParticipantBottomSheet = {
  participant: TParticipant | null;
};
const ParticipantBottomSheet = memo(
  ({ participant }: TParticipantBottomSheet) => {
    if (!participant) {
      return null;
    }
    return (
      <BottomSheetScrollView style={styles.container}>
        <View style={styles.container}>
          <Avatar
            size={100}
            name={participant.name}
            uri={participant.avatarUrl}
            style={{ alignSelf: "center" }}
          />
          <Text style={styles.name}>{participant.name}</Text>

          <Text style={styles.jobTitle}>{participant.jobTitle}</Text>

          <Text style={styles.bio}>{participant.bio}</Text>

          <Text style={styles.label}>Email</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{participant.email}</Text>
          </View>

          <Text style={styles.label}>Created At</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{participant.createdAt}</Text>
          </View>

          <Text style={styles.label}>Updated At</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{participant.updatedAt}</Text>
          </View>
        </View>
      </BottomSheetScrollView>
    );
  }
);

ParticipantBottomSheet.displayName = "ParticipantBottomSheet";

export default ParticipantBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Nunito-SemiBold",
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    fontFamily: "Nunito-Regular",
    marginBottom: 10,
    textTransform: "capitalize",
  },
  bio: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5,
    fontFamily: "Nunito-Regular",
    textTransform: "capitalize",
  },
  label: {
    fontSize: 14,
    color: "gray",
    fontFamily: "Nunito-SemiBold",
    marginTop: 5,
    paddingLeft: 10,
    paddingBottom: 4,
  },
  valueContainer: {
    backgroundColor: "#efedf2",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  value: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: "Nunito-Regular",
    top: 4,
  },
});
