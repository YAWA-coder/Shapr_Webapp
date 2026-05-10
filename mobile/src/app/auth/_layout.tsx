import { Stack } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

export default function Layout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.backgroundAuth,  // #f9fafb light / #0f0f1a dark
        },
        animation: "fade",
      }}
    />
  );
}