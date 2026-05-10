import { useEffect, useState } from "react";
import {
  View, Text, TextInput, Pressable,
  ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView,
} from "react-native";
import { apiFetch } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import GlassCard from "@/components/ui/GlassCard";
import GlassToast from "@/components/ui/GlassToast";
import { useTheme } from "@/context/ThemeContext";

export default function Profile() {
  const [profile, setProfile]   = useState<any>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [editing, setEditing]     = useState(false);
  const [toast, setToast]         = useState("");

  const { colors, theme, toggleTheme } = useTheme();

  const load = async () => {
    const res = await apiFetch("/user/profile/");
    const data = await res.json();
    setProfile(data);
    setFirstName(data.first_name || "");
    setLastName(data.last_name || "");
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    const res = await apiFetch("/user/update/", {
      method: "PUT",
      body: JSON.stringify({ first_name: firstName, last_name: lastName }),
    });
    if (res.ok) {
      const updated = await res.json();
      setProfile(updated);
      setEditing(false);
      setToast("Profile updated");
      setTimeout(() => setToast(""), 2000);
    }
  };

  const fullName = `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim() || "No name set";

  const inputBg = colors.card4 ?? (colors.background === "#f0edf8" ? "#f3f4f6" : "#16162a");

  if (!profile) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1 }}>

        {/* TITLE */}
        <Text style={{
          fontSize: 26, fontWeight: "900", color: colors.text,
          textAlign: "center", marginBottom: 20, letterSpacing: -0.5,
        }}>
          Profile
        </Text>

        {/* PROFILE CARD */}
        <GlassCard style={{ alignItems: "center" }}>
          {/* AVATAR */}
          <View style={{
            width: 80, height: 80, borderRadius: 40,
            backgroundColor: colors.primaryLight,
            alignItems: "center", justifyContent: "center",
            borderWidth: 3, borderColor: colors.primaryMid,
          }}>
            <Ionicons name="person" size={40} color={colors.primary} />
          </View>

          <Text style={{ color: colors.text, fontSize: 20, fontWeight: "700", marginTop: 14 }}>
            {fullName}
          </Text>
          <Text style={{ color: colors.textMuted, marginTop: 4, fontSize: 14 }}>
            @{profile.username}
          </Text>
          <Text style={{ color: colors.textMuted, marginTop: 4, fontSize: 13 }}>
            {profile.email}
          </Text>

          {/* EDIT / SAVE FORM */}
          {!editing ? (
            <Pressable
              onPress={() => setEditing(true)}
              style={{
                marginTop: 20,
                backgroundColor: colors.primary,
                padding: 14, borderRadius: 12,
                width: "100%", alignItems: "center",
                flexDirection: "row", justifyContent: "center", gap: 8,
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.28, shadowRadius: 14, elevation: 6,
              }}
            >
              <Ionicons name="pencil-outline" size={16} color="#fff" />
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>Edit Profile</Text>
            </Pressable>
          ) : (
            <View style={{ width: "100%", marginTop: 16 }}>
              <Text style={{ fontSize: 12, fontWeight: "600", color: colors.textMuted, marginBottom: 6 }}>
                First Name
              </Text>
              <View style={{
                flexDirection: "row", alignItems: "center", backgroundColor: inputBg,
                borderRadius: 12, borderWidth: 1.5, borderColor: colors.borderInput,
                paddingHorizontal: 14, marginBottom: 14,
              }}>
                <TextInput
                  placeholder="First Name" placeholderTextColor={colors.textMuted}
                  value={firstName} onChangeText={setFirstName}
                  style={{ flex: 1, paddingVertical: 12, color: colors.text, fontSize: 15 }}
                />
              </View>

              <Text style={{ fontSize: 12, fontWeight: "600", color: colors.textMuted, marginBottom: 6 }}>
                Last Name
              </Text>
              <View style={{
                flexDirection: "row", alignItems: "center", backgroundColor: inputBg,
                borderRadius: 12, borderWidth: 1.5, borderColor: colors.borderInput,
                paddingHorizontal: 14, marginBottom: 20,
              }}>
                <TextInput
                  placeholder="Last Name" placeholderTextColor={colors.textMuted}
                  value={lastName} onChangeText={setLastName}
                  style={{ flex: 1, paddingVertical: 12, color: colors.text, fontSize: 15 }}
                />
              </View>

              <View style={{ flexDirection: "row", gap: 10 }}>
                <Pressable
                  onPress={() => setEditing(false)}
                  style={{
                    flex: 1, padding: 14, borderRadius: 12,
                    alignItems: "center", borderWidth: 1.5,
                    borderColor: colors.borderInput,
                    backgroundColor: colors.card,
                  }}
                >
                  <Text style={{ color: colors.textMuted, fontWeight: "600" }}>Cancel</Text>
                </Pressable>

                <Pressable
                  onPress={save}
                  style={{
                    flex: 1, padding: 14, borderRadius: 12,
                    alignItems: "center", backgroundColor: colors.primary,
                    shadowColor: colors.primary,
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.28, shadowRadius: 14, elevation: 6,
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "700" }}>Save</Text>
                </Pressable>
              </View>
            </View>
          )}
        </GlassCard>

        {/* SETTINGS CARD */}
        <GlassCard style={{ marginTop: 16 }}>
          <Text style={{ color: colors.text, fontWeight: "700", fontSize: 16, marginBottom: 16 }}>
            Settings
          </Text>

          <View style={{
            flexDirection: "row", justifyContent: "space-between", alignItems: "center",
          }}>
            <View>
              <Text style={{ color: colors.text, fontWeight: "600", fontSize: 14 }}>Dark Mode</Text>
              <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 2 }}>
                Switch app appearance
              </Text>
            </View>

            {/* TOGGLE — matches web style */}
            <Pressable
              onPress={toggleTheme}
              style={{
                width: 52, height: 30, borderRadius: 999,
                backgroundColor: theme === "dark" ? colors.primary : colors.border,
                padding: 3, justifyContent: "center",
              }}
            >
              <View style={{
                width: 24, height: 24, borderRadius: 999,
                backgroundColor: "#ffffff",
                transform: [{ translateX: theme === "dark" ? 22 : 0 }],
                elevation: 3,
                shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 3,
              }} />
            </Pressable>
          </View>
        </GlassCard>

        {toast !== "" && <GlassToast message={toast} />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}