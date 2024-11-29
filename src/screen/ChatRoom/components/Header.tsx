import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { globalStyles } from "@/src/constants/globalStyles";
import { useNetInfo } from "@react-native-community/netinfo";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

const PADDING_BOTTOM = 12;

type THeader = {
  handleSwitchBackground: () => void;
};
const Header = ({ handleSwitchBackground }: THeader) => {
  const { top } = useSafeAreaInsets();
  const { isConnected, isInternetReachable } = useNetInfo();
  const hasNetwork = isConnected && isInternetReachable;
  return (
    <View
      style={[
        styles.wrapper,
        { paddingBottom: hasNetwork ? PADDING_BOTTOM * 2 : PADDING_BOTTOM },
      ]}
    >
      <View style={[globalStyles.rowBetween, { paddingTop: top }]}>
        {hasNetwork ? (
          <Text style={[styles.title]}>Chat room</Text>
        ) : (
          <Animated.View
            entering={FadeInDown.duration(500)}
            exiting={FadeOutDown.duration(500)}
            style={[globalStyles.rowCenter, { marginTop: 8 }]}
          >
            <ActivityIndicator size="small" color="black" />
            <Text style={styles.network}>Waiting for network</Text>
          </Animated.View>
        )}
        <TouchableOpacity activeOpacity={0.7} onPress={handleSwitchBackground}>
          <Ionicons name="chatbubble-ellipses" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    paddingTop: 4,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 20,
    color: "black",
  },
  network: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 14,
    color: "black",
    paddingLeft: 8,
  },
});
