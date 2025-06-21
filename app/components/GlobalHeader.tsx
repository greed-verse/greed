import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDeposit } from "../utils/DepositContext";

const theme = {
  dark: "#1F1A20",
  surface: "#2A2329",
  accent: "#FF5D73",
  accentLight: "#FF5D7333",
  accentBright: "#FF7A8C",
  text: "#FFFFFF",
  textSecondary: "#C5BBC0",
  cardBackground: "#2E272B",
  success: "#7ECFB3",
  warning: "#FFC15E",
  error: "#FF5D73",
  info: "#86BBD8",
  purple: "#9D8CA1",
};

export default function GlobalHeader() {
  const { showDepositModal } = useDeposit();
  const wins = 42; // This should come from global state
  const gems = 17; // This should come from global state
  const balance = 0; // This should come from global state
  const userInitials = "PO"; // This should come from user data

  return (
    <View style={styles.headerContainer}>
      {/* Profile Picture */}
      <TouchableOpacity style={styles.profileContainer}>
        <View style={styles.profilePic}>
          <Text style={styles.profileInitials}>{userInitials}</Text>
        </View>
      </TouchableOpacity>

      {/* Stats Container */}
      <View style={styles.statsContainer}>
        {/* Wins */}
        <View style={styles.statItem}>
          <MaterialCommunityIcons
            name="crown"
            size={20}
            color={theme.warning}
          />
          <Text style={styles.statValue}>{wins}</Text>
        </View>

        {/* Gems */}
        <View style={styles.statItem}>
          <MaterialCommunityIcons
            name="diamond"
            size={20}
            color={theme.purple}
          />
          <Text style={styles.statValue}>{gems}</Text>
        </View>

        {/* Money (clickable for deposit) */}
        <TouchableOpacity style={styles.statItem} onPress={showDepositModal}>
          <MaterialCommunityIcons name="cash" size={20} color={theme.success} />
          <Text style={styles.statValue}>${balance}</Text>
          <MaterialCommunityIcons name="plus" size={16} color={theme.success} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 45,
    left: 24,
    right: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 999,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.accentLight,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: theme.accent,
  },
  profileInitials: {
    color: theme.accent,
    fontSize: 16,
    fontWeight: "700",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statValue: {
    color: theme.text,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
