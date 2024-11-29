import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { globalStyles } from "@/src/constants/globalStyles";
import Ionicons from "@expo/vector-icons/Ionicons";

export const FOOTER_HEIGHT = 50;
export const FOOTER_MARGIN_TOP = 16;

const MessageInput = () => {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.inputContainer, globalStyles.rowBetween]}>
        <TextInput
          value={message}
          onChangeText={handleChangeText}
          style={styles.input}
          onSubmitEditing={() => {
            bottomSheetModalRef.current?.close();
          }}
        />
        <Pressable
          disabled={message ? false : true}
          onPress={handleSendMessage}
          style={{ opacity: message ? 1 : 0.5 }}
        >
          {isPending ? (
            <Ionicons name="send" size={24} color="black" />
          ) : (
            <Ionicons name="send" size={24} color="black" />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
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
    height: FOOTER_HEIGHT,
    paddingHorizontal: 16,
    flex: 1,
  },
  send: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 20,
  },
});
