import { Platform, useWindowDimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "@/src/constants/globalStyles";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

const ImageModal = () => {
  const params = useLocalSearchParams();
  const { width, height } = useWindowDimensions();

  return (
    <SafeAreaView style={globalStyles.fullFlex}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "dark"} />
      <Animated.View
        entering={FadeIn.duration(1000)}
        style={[globalStyles.rowCenter, globalStyles.fullFlex]}
      >
        <Image
          contentFit="cover"
          style={{ width, height: height / 2 }}
          source={{ uri: params.uri }}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default ImageModal;
