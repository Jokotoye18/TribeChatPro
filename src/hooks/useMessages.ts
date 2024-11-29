import { useEffect } from "react";
import { useMessagesQuery } from "../api/queries/chatRoom/useMessagesQuery";
import { useGlobalStore } from "../store/slices";

export const useMessages = () => {
  const { data: messages, isLoading } = useMessagesQuery({ filter: "all" });
  const setMessages = useGlobalStore((state) => state.addMessages);

  useEffect(() => {
    if (messages) {
      setMessages(messages);
    }
  }, [messages, setMessages]);

  return { messages, isLoading };
};
