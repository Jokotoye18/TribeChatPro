import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createSessionSlice, TSessionSlice } from "./sessionSlice";
import { createMessagesSlice, TMessagesSlice } from "./messagesSlice";
import { createParticipantSlice, TParticipantSlice } from "./participantsSlice";
import { storage } from "@/src/utils/storage";

type TGlobalStore = TSessionSlice & TMessagesSlice & TParticipantSlice;

export const useGlobalStore = create<
  TGlobalStore,
  [["zustand/persist", TGlobalStore]]
>(
  persist(
    (...a) => ({
      ...createSessionSlice(...a),
      ...createMessagesSlice(...a),
      ...createParticipantSlice(...a),
    }),
    {
      name: "global-store",
      storage: createJSONStorage(() => storage),
      onRehydrateStorage: (state) => {},
    }
  )
);
