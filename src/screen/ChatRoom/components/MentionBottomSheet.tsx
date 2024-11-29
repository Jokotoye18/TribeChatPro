import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { globalStyles } from "@/src/constants/globalStyles";
import Avatar from "./Avatar";

type TMentionBottomSheet = {
  mentionList: TParticipant[];
  handleSelect: (particpant: TParticipant) => void;
};
const MentionBottomSheet = memo(
  ({ mentionList, handleSelect }: TMentionBottomSheet) => {
    return (
      <BottomSheetScrollView contentContainerStyle={styles.container}>
        {mentionList.map((mention, index) => {
          return (
            <TouchableOpacity
              key={`${mention.uuid} ${index}`}
              style={[globalStyles.rowStart, styles.mentionContainer]}
              activeOpacity={0.7}
              onPress={() => handleSelect(mention)}
            >
              <Avatar uri={mention.avatarUrl} name={mention.name} />
              <Text style={styles.mentionText}>{mention.name}</Text>
            </TouchableOpacity>
          );
        })}
      </BottomSheetScrollView>
    );
  }
);

MentionBottomSheet.displayName = "MentionBottomSheet";

export default MentionBottomSheet;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  mentionContainer: {
    marginBottom: 8,
  },
  mentionText: {
    fontSize: 16,
    fontFamily: "Nunito-Regular",
    textTransform: "capitalize",
    paddingLeft: 16,
  },
});
