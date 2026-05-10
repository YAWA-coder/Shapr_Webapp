import { useState, useEffect } from "react";
import {
  View, Text, TextInput, Pressable, Alert,
  KeyboardAvoidingView, Platform, ScrollView, Modal,
} from "react-native";
import { apiFetch } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import GlassCard from "@/components/ui/GlassCard";
import { useTheme } from "@/context/ThemeContext";

export default function Session() {
  const { colors } = useTheme();

  const [subject, setSubject]               = useState("");
  const [running, setRunning]               = useState(false);
  const [seconds, setSeconds]               = useState(0);
  const [rating, setRating]                 = useState("");
  const [showRatingModal, setShowRatingModal] = useState(false);

  useEffect(() => {
    let interval: any;
    if (running) interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [running]);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const startSession = async () => {
    if (!subject.trim()) return Alert.alert("Enter subject");
    const res = await apiFetch("/study_session/start/", {
      method: "POST",
      body: JSON.stringify({ subject }),
    });
    if (!res.ok) return Alert.alert("Error", "Start failed");
    setRunning(true);
  };

  const stopSession = () => {
    setRunning(false);
    setShowRatingModal(true);
  };

  const finishSession = async () => {
    if (!rating) return Alert.alert("Enter rating");
    const res = await apiFetch("/study_session/end/", {
      method: "POST",
      body: JSON.stringify({ productivity_rating: Number(rating) }),
    });
    if (!res.ok) return Alert.alert("Error", "Save failed");
    setShowRatingModal(false);
    setSeconds(0);
    setSubject("");
    setRating("");
    Alert.alert("Session saved!");
  };

  const inputBg = colors.card4 ?? (colors.background === "#f0edf8" ? "#f3f4f6" : "#16162a");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, justifyContent: "center" }}>

        {/* TITLE */}
        <Text style={{
          fontSize: 28, fontWeight: "900", color: colors.text,
          textAlign: "center", letterSpacing: -0.5, marginBottom: 4,
        }}>
          Focus Session
        </Text>
        <Text style={{ color: colors.textMuted, textAlign: "center", marginBottom: 24, fontSize: 14 }}>
          Track your study time
        </Text>

        {/* TIMER CARD */}
        <GlassCard style={{ alignItems: "center", paddingVertical: 36 }}>
          <View style={{
            width: 64, height: 64, borderRadius: 32,
            backgroundColor: colors.primaryLight,
            alignItems: "center", justifyContent: "center", marginBottom: 16,
          }}>
            <Ionicons name="time-outline" size={32} color={colors.primary} />
          </View>

          <Text style={{
            fontSize: 56, fontWeight: "800",
            color: colors.text, letterSpacing: -2,
          }}>
            {fmt(seconds)}
          </Text>

          <Text style={{ color: colors.textMuted, marginTop: 8, fontSize: 13 }}>
            {running ? "Focus mode active" : "Ready to start"}
          </Text>
        </GlassCard>

        {/* START FORM */}
        {!running ? (
          <GlassCard style={{ marginTop: 16 }}>
            <Text style={{ color: colors.text, fontWeight: "600", marginBottom: 8, fontSize: 13 }}>
              Subject
            </Text>
            <View style={{
              flexDirection: "row", alignItems: "center",
              backgroundColor: inputBg, borderRadius: 12,
              borderWidth: 1.5, borderColor: colors.borderInput,
              paddingHorizontal: 14, marginBottom: 20,
            }}>
              <Ionicons name="book-outline" size={18} color={colors.textMuted} />
              <TextInput
                value={subject}
                onChangeText={setSubject}
                placeholder="e.g. Mathematics"
                placeholderTextColor={colors.textMuted}
                style={{
                  flex: 1, paddingVertical: 14, paddingLeft: 10,
                  color: colors.text, fontSize: 15,
                }}
              />
            </View>

            <Pressable
              onPress={startSession}
              style={{
                backgroundColor: colors.primary,
                padding: 16, borderRadius: 12,
                alignItems: "center", flexDirection: "row",
                justifyContent: "center", gap: 8,
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.30, shadowRadius: 14, elevation: 6,
              }}
            >
              <Ionicons name="play" size={18} color="#fff" />
              <Text style={{ fontWeight: "700", color: "#fff", fontSize: 16 }}>
                Start Session
              </Text>
            </Pressable>
          </GlassCard>
        ) : (
          <Pressable
            onPress={stopSession}
            style={{
              marginTop: 20,
              backgroundColor: colors.danger,
              padding: 16, borderRadius: 12,
              alignItems: "center", flexDirection: "row",
              justifyContent: "center", gap: 8,
              shadowColor: colors.danger,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.30, shadowRadius: 14, elevation: 6,
            }}
          >
            <Ionicons name="stop" size={18} color="#fff" />
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
              Stop Session
            </Text>
          </Pressable>
        )}

        {/* RATING MODAL */}
        <Modal visible={showRatingModal} transparent animationType="fade">
          <View style={{
            flex: 1, backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center", alignItems: "center",
          }}>
            <View style={{
              width: "85%", backgroundColor: colors.card,
              borderRadius: 20, padding: 28,
              alignItems: "center",
              borderWidth: 1, borderColor: colors.borderCard,
            }}>
              <View style={{
                width: 56, height: 56, borderRadius: 28,
                backgroundColor: colors.primaryLight,
                alignItems: "center", justifyContent: "center", marginBottom: 16,
              }}>
                <Ionicons name="star" size={28} color={colors.primary} />
              </View>

              <Text style={{
                fontSize: 18, fontWeight: "700",
                color: colors.text, marginBottom: 4,
              }}>
                Rate Your Session
              </Text>
              <Text style={{ color: colors.textMuted, fontSize: 13, marginBottom: 20 }}>
                How productive were you? (1–10)
              </Text>

              <View style={{
                flexDirection: "row", alignItems: "center",
                backgroundColor: inputBg, borderRadius: 12,
                borderWidth: 1.5, borderColor: colors.borderInput,
                paddingHorizontal: 14, width: "100%", marginBottom: 20,
              }}>
                <TextInput
                  value={rating}
                  onChangeText={setRating}
                  keyboardType="numeric"
                  placeholder="1 - 10"
                  placeholderTextColor={colors.textMuted}
                  style={{
                    flex: 1, paddingVertical: 14,
                    color: colors.text, fontSize: 18,
                    textAlign: "center",
                  }}
                />
              </View>

              <Pressable
                onPress={finishSession}
                style={{
                  backgroundColor: colors.primary,
                  padding: 14, borderRadius: 12,
                  width: "100%", alignItems: "center",
                  shadowColor: colors.primary,
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.30, shadowRadius: 14, elevation: 6,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
                  Finish Session
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}