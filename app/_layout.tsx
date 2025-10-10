import { UserProvider } from "@/context/user-context";
import SentraFAB from "@/features/sentra-ai/components/sentra-fab";
import { VoiceProvider } from "@/features/sentra-ai/context/voice-transaction-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const pathname = usePathname();

  const isIndex = pathname === "/" || pathname === "/index";
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    AtkisonBold: require("../assets/fonts/AtkinsonHyperlegible-Bold.ttf"),
    AtkisonRegular: require("../assets/fonts/AtkinsonHyperlegible-Regular.ttf"),
    AtkisonItalic: require("../assets/fonts/AtkinsonHyperlegible-Italic.ttf"),
    AtkisonBoldItalic: require("../assets/fonts/AtkinsonHyperlegible-BoldItalic.ttf"),
    OpenSansRegular: require("../assets/fonts/OpenSans-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <UserProvider>
            <VoiceProvider>
              {/* <VoiceCommandProvider> */}
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(main)" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(e-kyc)" />
                <Stack.Screen name="+not-found" />
              </Stack>
              {!isIndex && <SentraFAB />}
              <StatusBar
                style="inverted"
                backgroundColor="#00027d"
                translucent={false}
              />
              {/* </VoiceCommandProvider> */}
            </VoiceProvider>
          </UserProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
