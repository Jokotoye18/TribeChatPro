import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "..";
import { routes } from "../routes";
import { queryKeys } from "../queryKeys";
import { TUseMessagesQuery } from "../queries/chatRoom/useMessagesQuery";

export const useSendMessageMutation = ({
  filter,
  extra,
}: TUseMessagesQuery) => {
  const queryClient = useQueryClient();
  return useMutation<{ text: string }, unknown, { text: string }, unknown>({
    mutationFn: (payload) =>
      axiosInstance.post(`${routes.sendMessage}`, payload).then((res) => {
        return res.data;
      }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [queryKeys.messages, filter, extra],
        }),

        queryClient.invalidateQueries({
          queryKey: [queryKeys.participants, filter, extra],
        }),
      ]);
    },
  });
};
