import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../..";
import { routes } from "../../routes";
import { queryKeys } from "../../queryKeys";

export const useSessionQuery = () => {
  return useQuery<TSession, unknown>({
    queryKey: [queryKeys.session],
    queryFn: () =>
      axiosInstance.get(`${routes.session}`).then((res) => res.data),
  });
};
