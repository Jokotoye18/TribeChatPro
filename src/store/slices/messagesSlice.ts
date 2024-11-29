import { StateCreator } from "zustand";

export type TMessagesSlice = {
  messages: TMessage[] | null;
  addMessages: (messages: TMessage[]) => void;
  resetMessages: () => void;
};

export type TMessageState = Pick<TMessagesSlice, "messages">;

const initialState: TMessageState = {
  messages: null,
};

export const createMessagesSlice: StateCreator<
  TMessageState,
  [],
  [],
  TMessagesSlice
> = (set) => ({
  ...initialState,
  addMessages: (messages) => {
    set({ messages });
  },
  resetMessages: () => {},
});
