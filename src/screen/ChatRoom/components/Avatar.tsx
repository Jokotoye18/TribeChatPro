import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Image } from "expo-image";
import React from "react";
import { acronym } from "@/src/utils/acronym";
import { globalStyles } from "@/src/constants/globalStyles";

type TAvatar = {
  name: string;
  uri?: string;
  onPress?: () => void;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

const Avatar = ({ name, uri, size = 40, style, onPress }: TAvatar) => {
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          contentFit="cover"
          transition={1000}
          style={[
            styles.image,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}
          placeholder={blurhash}
        />
      ) : (
        <View style={[globalStyles.rowCenter, globalStyles.fullFlex]}>
          <Text style={styles.acronym}>{acronym(name)}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: "grey",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  acronym: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 16,
  },
});
