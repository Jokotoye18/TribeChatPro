import { StyleSheet } from "react-native";

const HORIZONTAL_PADDING = 16;

export const globalStyles = StyleSheet.create({
  fullFlex: {
    flex: 1,
  },
  containerPadding: {
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowAround: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  rowStart: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  rowEnd: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
