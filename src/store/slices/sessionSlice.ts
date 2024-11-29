import { StateCreator } from "zustand";

type TSession = {
  sessionUuid: string;
  apiVersion: number;
};

export type TSessionSlice = {
  session: TSession | null;
  addSession: (session: { sessionUuid: string; apiVersion: number }) => void;
  resetSession: () => void;
};

export type TSessionState = Pick<TSessionSlice, "session">;

// define the initial state
const initialState: TSessionState = {
  session: null,
};

export const createSessionSlice: StateCreator<
  TSessionState,
  [],
  [],
  TSessionSlice
> = (set, get) => ({
  ...initialState,
  addSession: (session) => {
    set({
      session,
    });
  },
  resetSession: () => {
    set(initialState);
  },
});
