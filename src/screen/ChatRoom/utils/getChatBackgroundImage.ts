import { uri } from "../constants/chatBackgroundUri";

let lastIndex: number | null = null;

export const getChatBackgroundImage = (): {
  backgroundImage: number;
  randomIndex: number;
} => {
  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * uri.length);
  } while (randomIndex === lastIndex); // Ensure it doesn't repeat the last index

  lastIndex = randomIndex; // Update the lastIndex to the current one
  return uri[randomIndex];
};
