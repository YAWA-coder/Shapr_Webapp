// StatCard.tsx
import { View, Text } from "react-native";
import { useTheme } from "@/context/ThemeContext";

export default function StatCard({ title, value }: { title: string; value: any }) {
  const { colors } = useTheme();

  return (
    <View style={{
      backgroundColor: colors.card,
      padding: 18, borderRadius: 16, marginBottom: 12,
      borderWidth: 1, borderColor: colors.primary + "22",
      shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 10, elevation: 3,
    }}>
      <Text style={{ color: colors.textMuted, fontSize: 12, fontWeight: "600", letterSpacing: 0.5 }}>
        {title}
      </Text>
      <Text style={{ color: colors.primary, fontSize: 28, fontWeight: "800", marginTop: 6 }}>
        {value}
      </Text>
    </View>
  );
}