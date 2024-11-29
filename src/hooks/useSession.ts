import { useEffect } from "react";
import { useGlobalStore } from "../store/slices";
import { useSessionQuery } from "../api/queries/session/useSessionQuery";
import { useQueryClient } from "@tanstack/react-query";

export const useSession = () => {
  const { data: session, isLoading } = useSessionQuery();
  const quryClient = useQueryClient();
  const setSession = useGlobalStore((state) => state.addSession);
  const prevSession = useGlobalStore((state) => state.session);

  useEffect(() => {
    if (session && !prevSession) {
      setSession(session);
      return;
    }
    if (
      session &&
      prevSession &&
      session.sessionUuid !== prevSession.sessionUuid
    ) {
      useGlobalStore.persist.clearStorage();
      quryClient.clear();
    }
  }, [prevSession, quryClient, session, setSession]);

  return { session, isLoading };
};
