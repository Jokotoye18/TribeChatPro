import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
  Pressable,
  useWindowDimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useCallback, useRef, useState } from "react";
import { globalStyles } from "../../constants/globalStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { FOOTER_HEIGHT, FOOTER_MARGIN_TOP, styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSendMessageMutation } from "@/src/api/mutations/useSendMessageMutation";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheetWrapper from "@/src/components/BottomSheetWrapper";
import ReactionBottomSheet from "./components/ReactionBottomSheet";
import Header from "./components/Header";
import ParticipantBottomSheet from "./components/ParticipantBottomSheet";
import Loader from "@/src/components/Loader";
import { useMessages } from "@/src/hooks/useMessages";
import { useGlobalStore } from "@/src/store/slices";
import { useParticipants } from "@/src/hooks/useParticipants";
import { groupConsecutiveMessages } from "./utils/groupConsecutiveMessages";
import MentionBottomSheet from "./components/MentionBottomSheet";
import { Image } from "expo-image";
import { getChatBackgroundImage } from "./utils/getChatBackgroundImage";
import Messages from "./components/Messages";

const ChatRoom = () => {
  const { width, height } = useWindowDimensions();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { isLoading: isLoadingMessages } = useMessages();
  const { isLoading: isLoadingParticipant } = useParticipants();
  const isLoading = isLoadingMessages || isLoadingParticipant;

  const messages = useGlobalStore((state) => state.messages);
  const participants = useGlobalStore((state) => state.participants);

  const { mutate, isPending } = useSendMessageMutation({ filter: "all" });

  const backgroundImage = getChatBackgroundImage();

  const [message, setMessage] = useState("");
  const [uri, setUri] = useState(backgroundImage);
  const [reactions, setReactions] = useState<TReaction[] | null>(null);
  const [participant, setParticipant] = useState<TParticipant | null>(null);
  const [mentions, setMentions] = useState<TParticipant[] | null>(null);
  const [bottomSheetType, setBottomSheetType] = useState<
    "reaction" | "participant" | "mention" | null
  >(null);

  const consecutiveMessages = groupConsecutiveMessages(messages || []);

  const handleSwitchBackground = () => {
    const backgroundImage = getChatBackgroundImage();
    setUri(backgroundImage);
  };

  const handleChangeText = (text: string) => {
    setMessage(text);
    setBottomSheetType("mention");

    const lastWord = text.split(" ").pop();
    if (lastWord && lastWord.startsWith("@")) {
      const query = lastWord.slice(1).toLowerCase();
      const filtered = (participants || []).filter((p) =>
        p.name.toLowerCase().includes(query)
      );
      setMentions(filtered);
      setBottomSheetType("mention");
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.close();
    }
  };

  const handleMentionSelect = (participant: TParticipant) => {
    const mentionText = `@${participant.name}`;
    const newText = message.replace(/@\w*$/, mentionText);
    setMessage(newText);
    setMentions([...(mentions || []), participant]);
    bottomSheetModalRef.current?.close();
  };

  const handleSetReaction = useCallback(
    (reactions: TReaction[]) => {
      setBottomSheetType("reaction");
      setReactions(reactions);
      bottomSheetModalRef.current?.present();
    },
    [setReactions]
  );

  const handleSetParticipant = useCallback((participant: TParticipant) => {
    setBottomSheetType("participant");
    setParticipant(participant);
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSendMessage = () => {
    mutate(
      { text: message },
      {
        onSuccess: () => {
          setMessage("");
        },
      }
    );
  };

  const snapPoints = useCallback(() => {
    switch (bottomSheetType) {
      case "reaction":
        return undefined;

      case "mention":
        return ["40%", "60%"];

      case "participant":
        return ["60%", "70%"];

      default:
        return undefined;
    }
  }, [bottomSheetType]);

  const BottomSheet = () => {
    switch (bottomSheetType) {
      case "participant":
        return <ParticipantBottomSheet participant={participant} />;
      case "reaction":
        return <ReactionBottomSheet reactions={reactions || []} />;
      case "mention":
        return (
          <MentionBottomSheet
            mentionList={mentions || []}
            handleSelect={handleMentionSelect}
          />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "height" : "padding"}
      style={globalStyles.fullFlex}
    >
      <SafeAreaView
        style={[globalStyles.fullFlex, { backgroundColor: "#efedf2" }]}
        edges={["left", "right"]}
      >
        <StatusBar style="dark" />
        <Image
          source={uri}
          style={{
            ...StyleSheet.absoluteFillObject,
            width,
            height: height - FOOTER_HEIGHT - FOOTER_MARGIN_TOP,
          }}
        />
        <Header handleSwitchBackground={handleSwitchBackground} />
        <Messages
          messages={consecutiveMessages}
          handleSetParticipant={handleSetParticipant}
          handleSetReaction={handleSetReaction}
        />
        <View style={styles.wrapper}>
          <View style={[styles.inputContainer, globalStyles.rowBetween]}>
            <TextInput
              value={message}
              onChangeText={handleChangeText}
              style={styles.input}
              onSubmitEditing={() => {
                bottomSheetModalRef.current?.close();
              }}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              scrollEnabled={false}
            />
            <Pressable
              disabled={message.trim() ? false : true}
              onPress={handleSendMessage}
              style={{ opacity: message.trim() ? 1 : 0.5 }}
            >
              {isPending ? (
                <ActivityIndicator size="small" color="black" />
              ) : (
                <Ionicons name="send" size={24} color="black" />
              )}
            </Pressable>
          </View>
        </View>
        <BottomSheetWrapper ref={bottomSheetModalRef} snapPoints={snapPoints()}>
          <BottomSheet />
        </BottomSheetWrapper>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;
