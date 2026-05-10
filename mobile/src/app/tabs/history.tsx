import { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { apiFetch } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";

import GlassCard from "@/components/ui/GlassCard";
import { useTheme } from "@/context/ThemeContext";

export default function History() {
  const [sessions, setSessions] = useState<any[]>([]);
  const { colors } = useTheme();

  const load = async () => {
    try {
      const res = await apiFetch("/study_session/history/");
      const data = await res.json();
      setSessions(Array.isArray(data) ? data : []);
    } catch (e) {
      console.log("History load error", e);
    }
  };

  useFocusEffect(useCallback(() => { load(); }, []));

  useEffect(() => {
    const interval = setInterval(() => { load(); }, 10000);
    return () => clearInterval(interval);
  }, []);

  const deleteSession = async (id: number) => {
    const res = await apiFetch(`/study_session/delete/${id}/`, { method: "DELETE" });
    if (res.ok) { Alert.alert("Deleted"); load(); }
    else Alert.alert("Error deleting");
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}>

      {/* HEADER */}
      <Text style={{ fontSize: 26, fontWeight: "900", color: colors.text, letterSpacing: -0.5 }}>
        Session History
      </Text>
      <Text style={{ color: colors.textMuted, marginBottom: 20, marginTop: 4, fontSize: 14 }}>
        Your study activity timeline
      </Text>

      {/* LIST */}
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <GlassCard>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Ionicons name="book-outline" size={18} color={colors.primary} />
                <Text style={{ color: colors.text, fontSize: 16, fontWeight: "700" }}>
                  {item.subject}
                </Text>
              </View>

              <Pressable
                onPress={() => deleteSession(item.id)}
                style={{
                  padding: 6, borderRadius: 10,
                  backgroundColor: colors.primaryLight,
                  borderWidth: 1,
                  borderColor: colors.primary + "33",
                }}
              >
                <Ionicons name="trash-outline" size={18} color={colors.danger} />
              </Pressable>
            </View>

            <View style={{ marginTop: 12, gap: 4 }}>
              <Text style={{ color: colors.textMuted, fontSize: 13 }}>
                ⏱ Duration: <Text style={{ color: colors.text, fontWeight: "600" }}>{item.duration} mins</Text>
              </Text>
              <Text style={{ color: colors.textMuted, fontSize: 13 }}>
                ⭐ Productivity: <Text style={{ color: colors.text, fontWeight: "600" }}>{item.productivity_rating}</Text>
              </Text>
            </View>

            <View style={{ marginTop: 12, flexDirection: "row", alignItems: "center", gap: 6 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.productive }} />
              <Text style={{ color: colors.textMuted, fontSize: 12 }}>Session logged</Text>
            </View>
          </GlassCard>
        )}
      />
    </View>
  );
}