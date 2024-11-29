import { Stack } from "expo-router";
import { useNetInfo } from "@react-native-community/netinfo";
import Loader from "@/src/components/Loader";
import "react-native-reanimated";
import { useGlobalStore } from "@/src/store/slices";
import { useSession } from "@/src/hooks/useSession";

export default function NaivgatorLayout() {
  const { isLoading } = useSession();
  const { isConnected, isInternetReachable } = useNetInfo();
  const hasNetwork = isConnected && isInternetReachable;
  const hasHydrated = useGlobalStore.persist.hasHydrated();

  if ((hasNetwork && isLoading) || !hasHydrated) {
    return <Loader isHydrating={!hasHydrated} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="image-modal"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Image preview",
        }}
      />
    </Stack>
  );
}
