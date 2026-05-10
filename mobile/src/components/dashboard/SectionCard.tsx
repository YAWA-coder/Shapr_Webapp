// SectionCard.tsx
import { View } from "react-native";
import { useTheme } from "@/context/ThemeContext";

export default function SectionCard({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();

  return (
    <View style={{
      backgroundColor: colors.card,
      padding: 18, borderRadius: 16, marginTop: 16,
      borderWidth: 1, borderColor: colors.primary + "22",
      shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 10, elevation: 3,
    }}>
      {children}
    </View>
  );
}
