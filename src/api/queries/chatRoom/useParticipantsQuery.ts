import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../..";
import { routes } from "../../routes";
import { queryKeys } from "../../queryKeys";

type TUseParticipantQuery = {
  filter?: "all" | "updates";
  extra?: string;
};

export const useParticipantQuery = ({
  filter = "all",
  extra,
}: TUseParticipantQuery) => {
  return useQuery<TParticipant[], unknown>({
    queryKey: [queryKeys.participants, filter, extra],
    queryFn: () =>
      axiosInstance
        .get(`${routes.participants}/${filter}${extra ? `/${extra}` : ""}`)
        .then((res) => res.data),
  });
};
