import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/auth/login");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f0edf8",      // web: .app-shell bg
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      {/* BRAND CARD */}
      <View style={{
        alignItems: "center",
        paddingVertical: 40,
        paddingHorizontal: 48,
        backgroundColor: "#ffffff",
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#f3f0fb",
        shadowColor: "#7C5BD6",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 24,
        elevation: 8,
      }}>
        <View style={{
          width: 72,
          height: 72,
          borderRadius: 20,
          backgroundColor: "#ede9fe",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        }}>
          <Ionicons name="flash" size={38} color="#7C5BD6" />
        </View>

        <Text style={{
          fontSize: 36,
          fontWeight: "900",
          color: "#7C5BD6",
          letterSpacing: -1,
        }}>
          ShapR
        </Text>

        <Text style={{
          color: "#6b7280",
          marginTop: 6,
          fontSize: 14,
          fontWeight: "500",
        }}>
          Focus. Learn. Improve.
        </Text>
      </View>

      {/* LOADING */}
      <View style={{ marginTop: 36, alignItems: "center" }}>
        <ActivityIndicator size="large" color="#7C5BD6" />
        <Text style={{
          marginTop: 12,
          color: "#6b7280",
          fontSize: 13,
        }}>
          Initializing experience...
        </Text>
      </View>
    </View>
  );
}