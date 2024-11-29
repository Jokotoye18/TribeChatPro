import { StyleSheet, useWindowDimensions, View } from "react-native";
import React, { memo } from "react";
import { Link } from "expo-router";
import { Image } from "expo-image";

type TMessageAttachment = {
  message: TMessageJSON;
  padding: number;
};
const MessageAttachment = memo(({ message, padding }: TMessageAttachment) => {
  const { width } = useWindowDimensions();
  return (
    <View style={{ marginBottom: 8 }}>
      <Link
        href={{
          pathname: "/image-modal",
          params: {
            uri: message.attachments[0].url,
          },
        }}
      >
        <Image
          source={{ uri: message.attachments[0].url }}
          contentFit="cover"
          transition={500}
          style={[
            styles.messageImage,
            {
              width: message.attachments[0].width,
              height: message.attachments[0].height,
              maxWidth: width / 1.5 - padding * 2,
            },
          ]}
        />
      </Link>
    </View>
  );
});

MessageAttachment.displayName = "MessageAttachment";

export default MessageAttachment;

const styles = StyleSheet.create({
  messageImage: {
    borderRadius: 8,
  },
});
