import { globalStyles } from "@/src/constants/globalStyles";
import { StyleSheet } from "react-native";

export const FOOTER_HEIGHT = 50;
export const FOOTER_MARGIN_TOP = 16;

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
  },
  inputContainer: {
    backgroundColor: "#e1e7ea",
    paddingHorizontal: globalStyles.containerPadding.paddingHorizontal,
    marginHorizontal: globalStyles.containerPadding.paddingHorizontal,
    borderRadius: 50,
    height: FOOTER_HEIGHT,
    marginTop: FOOTER_MARGIN_TOP,
    marginBottom: 24,
  },
  input: {
    paddingHorizontal: 16,
    flex: 1,
    fontSize: 16,
    fontFamily: "Nunito-Regular",
    top: -3,
  },
  send: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 20,
  },
});
