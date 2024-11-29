import { useEffect } from "react";
import { useGlobalStore } from "../store/slices";
import { useParticipantQuery } from "../api/queries/chatRoom/useParticipantsQuery";

export const useParticipants = () => {
  const { data: participants, isLoading } = useParticipantQuery({
    filter: "all",
  });
  const setParticipants = useGlobalStore((state) => state.addParticipant);

  useEffect(() => {
    if (participants) {
      setParticipants(participants);
    }
  }, [participants, setParticipants]);

  return { participants, isLoading };
};
