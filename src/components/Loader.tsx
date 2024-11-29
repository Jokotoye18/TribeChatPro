import { ActivityIndicator, Text, View } from "react-native";
import { globalStyles } from "../constants/globalStyles";

type TLoader = {
  isHydrating?: boolean;
};
const Loader = ({ isHydrating }: TLoader) => {
  return (
    <View
      style={[
        globalStyles.fullFlex,
        {
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      <ActivityIndicator size="large" color="black" />
      {isHydrating ? (
        <Text
          style={{ paddingTop: 8, fontSize: 24, fontFamily: "Nunito-SemiBold" }}
        >
          Offline mode
        </Text>
      ) : null}
    </View>
  );
};

export default Loader;
