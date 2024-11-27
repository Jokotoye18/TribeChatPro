import AppProviders from "@/src/context/AppProviders";

interface IRootProps {
  children: JSX.Element;
}

export const SharedRoot = ({ children }: IRootProps) => {
  return <AppProviders>{children}</AppProviders>;
};
