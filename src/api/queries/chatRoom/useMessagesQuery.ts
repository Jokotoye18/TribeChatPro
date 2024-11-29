import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../..";
import { routes } from "../../routes";
import { queryKeys } from "../../queryKeys";

export type TUseMessagesQuery = {
  filter?: "all" | "latest" | "older" | "new" | "updates";
  extra?: string;
};

export const useMessagesQuery = ({
  filter = "all",
  extra,
}: TUseMessagesQuery) => {
  return useQuery<TMessage[], unknown>({
    queryKey: [queryKeys.messages, filter, extra],
    queryFn: () =>
      axiosInstance
        .get(`${routes.messages}/${filter}${extra ? `/${extra}` : ""}`)
        .then((res) => res.data),
  });
};
