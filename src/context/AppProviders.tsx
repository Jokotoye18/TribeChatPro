import { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
interface IAppProvidersProps {
  children: ReactNode;
}

// Create a client
const queryClient = new QueryClient();

const AppProviders = ({ children }: IAppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default AppProviders;
