import { StateCreator } from "zustand";

export type TParticipantSlice = {
  participants: TParticipant[] | null;
  addParticipant: (participants: TParticipant[]) => void;
  resetParticipant: () => void;
};

export type TParticipantState = Pick<TParticipantSlice, "participants">;

const initialState: TParticipantState = {
  participants: null,
};

export const createParticipantSlice: StateCreator<
  TParticipantState,
  [],
  [],
  TParticipantSlice
> = (set) => ({
  ...initialState,
  addParticipant: (participants) => {
    set({ participants });
  },
  resetParticipant: () => {},
});
