import { SafeAreaView, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/globalStyles";
import { StatusBar } from "expo-status-bar";

const ChatRoom = () => {
  return (
    <SafeAreaView style={globalStyles.fullFlex}>
      <StatusBar style="dark" />
      <View style={[globalStyles.rowCenter]}>
        <Text>ChatRoom</Text>
      </View>
    </SafeAreaView>
  );
};

export default ChatRoom;
