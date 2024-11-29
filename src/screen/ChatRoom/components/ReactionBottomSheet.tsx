import { StyleSheet, Text, View } from "react-native";

import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { globalStyles } from "@/src/constants/globalStyles";
import { useGlobalStore } from "@/src/store/slices";
import { memo } from "react";

type TReactionBottomSheet = {
  reactions: TReaction[];
};
const ReactionBottomSheet = memo(({ reactions }: TReactionBottomSheet) => {
  const participants = useGlobalStore((state) => state.participants);

  return (
    <BottomSheetScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title]}>{reactions.length} reactions</Text>
      {reactions.map((reaction, index) => {
        const isLastItem = index + 1 === reactions.length;
        const participantInfo = participants?.find(
          (participant) => participant.uuid === reaction.participantUuid
        );
        return (
          <View
            key={reaction.uuid}
            style={[
              globalStyles.rowBetween,
              styles.reactionView,
              { borderBottomWidth: isLastItem ? 0 : StyleSheet.hairlineWidth },
            ]}
          >
            <Text style={[styles.participantName]}>
              {participantInfo?.name}
            </Text>
            <Text style={{ fontSize: 20 }}>{reaction.value}</Text>
          </View>
        );
      })}
    </BottomSheetScrollView>
  );
});

ReactionBottomSheet.displayName = "ReactionBottomSheet";

export default ReactionBottomSheet;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingBottom: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Nunito-SemiBold",
  },
  reactionView: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingBottom: 8,
    borderColor: "#e1e7ea",
  },
  participantName: {
    paddingRight: 16,
    fontSize: 14,
    fontFamily: "Nunito-SemiBold",
  },
});
